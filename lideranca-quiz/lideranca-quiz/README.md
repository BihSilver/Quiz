# Diagnóstico de Estilo de Liderança — Quiz + Dashboard ao vivo

Site estático (sem build, sem Node) com duas páginas:

- `index.html` — o quiz que os participantes respondem no celular.
- `dashboard.html` — a tela que você deixa aberta durante a apresentação, com os resultados chegando ao vivo.

Os dois se comunicam por um banco de dados no Supabase (grátis), que também é quem entrega os dados em tempo real para o dashboard.

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (dá para logar com GitHub).
2. Clique em **New project**. Escolha um nome, uma senha de banco (guarde, mas não vai precisar usar agora) e a região mais próxima (ex: São Paulo/`sa-east-1`).
3. Aguarde ~2 minutos até o projeto ficar pronto.

## 2. Criar a tabela

1. No menu lateral, abra **SQL Editor** → **New query**.
2. Copie todo o conteúdo do arquivo `supabase-schema.sql` deste projeto, cole e clique em **Run**.
3. Isso cria a tabela `responses`, ativa a segurança (RLS) e liga o Realtime.

## 3. Pegar suas chaves

1. No menu lateral, vá em **Project Settings** → **API**.
2. Copie a **Project URL** e a chave **anon public**.
3. Abra o arquivo `config.js` deste projeto e cole os dois valores:

```js
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA-CHAVE-ANON-PUBLICA";
```

> A chave `anon` é pública por natureza (ela roda no navegador de quem responde o quiz) — quem protege os dados é a segurança (RLS) que o script SQL já configurou, permitindo só inserir, ler e limpar respostas, nada além disso.

## 4. Testar localmente (opcional)

Qualquer servidor estático simples funciona. Exemplo, dentro da pasta do projeto:

```bash
npx serve .
```

Abra a URL do quiz numa aba e `dashboard.html` em outra para ver a atualização em tempo real.

## 5. Publicar no Vercel

1. Suba esta pasta para um repositório no GitHub (ou use `vercel` CLI direto).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project**, importe o repositório.
3. Não é preciso configurar nada de build — é um site estático puro. Clique em **Deploy**.
4. Ao final, você terá uma URL do tipo `https://seu-projeto.vercel.app`.
   - Compartilhe `https://seu-projeto.vercel.app` (ou `/index.html`) com os participantes.
   - Abra `https://seu-projeto.vercel.app/dashboard.html` no telão durante a apresentação.

## Personalizar o conteúdo

Todo o texto do quiz (perguntas, alternativas e descrições dos perfis) está em `quiz-data.js`, separado da lógica — dá para editar livremente sem mexer no resto do código.

As cores de cada perfil também estão ali (`PROFILES.<perfil>.color`) e são usadas tanto no resultado do participante quanto nas barras e etiquetas do dashboard.

## Limpar as respostas entre apresentações

O botão **"Limpar todas as respostas"** no rodapé do dashboard apaga tudo na tabela. Use antes de uma nova sessão para começar do zero. Não tem confirmação por senha — qualquer pessoa com o link do dashboard pode limpar, então evite compartilhar esse link publicamente.
