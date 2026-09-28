-- Rode este script no SQL Editor do Supabase (Project > SQL Editor > New query)

create extension if not exists pgcrypto;

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  respondent_name text,
  answers jsonb not null,
  profile text not null
);

-- Segurança: mantém a tabela protegida, liberando apenas
-- inserir (participantes) e ler/apagar (dashboard) com a chave anon.
alter table responses enable row level security;

create policy "Permitir inserção pública"
  on responses for insert
  to anon
  with check (true);

create policy "Permitir leitura pública"
  on responses for select
  to anon
  using (true);

create policy "Permitir limpeza pública"
  on responses for delete
  to anon
  using (true);

-- Habilita o Realtime para esta tabela
alter publication supabase_realtime add table responses;
