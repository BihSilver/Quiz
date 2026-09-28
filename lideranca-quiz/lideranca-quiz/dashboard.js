const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const profileCardsEl = document.getElementById('profile-cards');
const feedEl = document.getElementById('feed');
const totalCountEl = document.getElementById('total-count');
const btnReset = document.getElementById('btn-reset');

const profileOrder = ['direcionador', 'desenvolvedor', 'colaborativo', 'executor'];
let allResponses = []; // mais recentes primeiro

buildProfileCards();
loadInitial();
subscribeRealtime();

btnReset.addEventListener('click', resetResponses);

function buildProfileCards() {
  profileCardsEl.innerHTML = '';
  profileOrder.forEach((key) => {
    const p = PROFILES[key];
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.style.setProperty('--profile-color', p.color);
    card.id = `card-${key}`;
    card.innerHTML = `
      <div class="profile-card-top">
        <span class="profile-card-name">${p.name}</span>
        <span class="profile-card-count" id="count-${key}">0</span>
      </div>
      <div class="profile-bar-track"><div class="profile-bar-fill" id="bar-${key}"></div></div>
    `;
    profileCardsEl.appendChild(card);
  });
}

async function loadInitial() {
  const { data, error } = await supabaseClient
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }
  allResponses = data || [];
  renderAll();
}

function subscribeRealtime() {
  supabaseClient
    .channel('responses-live')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'responses' },
      (payload) => {
        allResponses.unshift(payload.new);
        renderAll();
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'responses' },
      () => {
        // após um reset em massa, recarrega do zero
        loadInitial();
      }
    )
    .subscribe();
}

function renderAll() {
  renderCounts();
  renderFeed();
}

function renderCounts() {
  const total = allResponses.length;
  totalCountEl.textContent = total;

  const counts = { direcionador: 0, desenvolvedor: 0, colaborativo: 0, executor: 0 };
  allResponses.forEach((r) => {
    if (counts[r.profile] !== undefined) counts[r.profile]++;
  });

  profileOrder.forEach((key) => {
    const count = counts[key];
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    document.getElementById(`count-${key}`).textContent = count;
    document.getElementById(`bar-${key}`).style.width = `${pct}%`;
  });
}

function renderFeed() {
  if (allResponses.length === 0) {
    feedEl.innerHTML = '<div class="feed-empty">Aguardando as primeiras respostas…</div>';
    return;
  }

  feedEl.innerHTML = '';
  allResponses.slice(0, 100).forEach((r) => {
    const p = PROFILES[r.profile];
    const row = document.createElement('div');
    row.className = 'feed-row';
    const time = new Date(r.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    row.innerHTML = `
      <div>
        <div class="feed-name">${escapeHtml(r.respondent_name || 'Anônimo')}</div>
        <div class="feed-time">${time}</div>
      </div>
      <span class="feed-tag" style="background:${p ? p.color : '#666'}">${p ? p.name : r.profile}</span>
    `;
    feedEl.appendChild(row);
  });
}

async function resetResponses() {
  const ok = confirm('Isso vai apagar todas as respostas recebidas até agora. Confirmar?');
  if (!ok) return;
  const { error } = await supabaseClient
    .from('responses')
    .delete()
    .not('id', 'is', null); // condição que sempre é verdadeira, exigida pelo Supabase para delete em massa
  if (error) {
    alert('Não foi possível limpar as respostas: ' + error.message);
    return;
  }
  allResponses = [];
  renderAll();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
