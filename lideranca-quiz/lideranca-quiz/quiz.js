const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const stepName = document.getElementById('step-name');
const stepQuiz = document.getElementById('step-quiz');
const stepResult = document.getElementById('step-result');
const statusMsg = document.getElementById('status-msg');

const inputName = document.getElementById('input-name');
const btnStart = document.getElementById('btn-start');

const progressTrack = document.getElementById('progress-track');
const questionLabel = document.getElementById('question-label');
const questionText = document.getElementById('question-text');
const optionsEl = document.getElementById('options');

let respondentName = '';
let currentIndex = 0;
const answers = []; // { letter, profile }

// ---- Etapa 0: nome ----
inputName.addEventListener('input', () => {
  btnStart.disabled = inputName.value.trim().length === 0;
});

inputName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !btnStart.disabled) startQuiz();
});

btnStart.addEventListener('click', startQuiz);

function startQuiz() {
  respondentName = inputName.value.trim();
  if (!respondentName) return;
  stepName.classList.add('hidden');
  stepQuiz.classList.remove('hidden');
  buildProgress();
  renderQuestion();
}

// ---- Etapa 1: perguntas ----
function buildProgress() {
  progressTrack.innerHTML = '';
  QUESTIONS.forEach(() => {
    const seg = document.createElement('div');
    seg.className = 'progress-seg';
    seg.innerHTML = '<span></span>';
    progressTrack.appendChild(seg);
  });
}

function updateProgress() {
  const segs = progressTrack.querySelectorAll('.progress-seg');
  segs.forEach((seg, i) => {
    const fill = seg.querySelector('span');
    if (i < currentIndex) {
      fill.style.width = '100%';
    } else if (i === currentIndex) {
      fill.style.width = '0%';
    } else {
      fill.style.width = '0%';
    }
  });
}

function renderQuestion() {
  updateProgress();
  const q = QUESTIONS[currentIndex];
  questionLabel.textContent = `Pergunta ${currentIndex + 1} de ${QUESTIONS.length}`;
  questionText.textContent = q.text;
  optionsEl.innerHTML = '';

  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="letter">${opt.letter}</span><span>${opt.text}</span>`;
    btn.addEventListener('click', () => selectOption(btn, opt));
    optionsEl.appendChild(btn);
  });
}

function selectOption(btn, opt) {
  // trava novos cliques durante a transição
  optionsEl.querySelectorAll('.option').forEach((b) => (b.disabled = true));
  btn.classList.add('selected');

  answers.push({ letter: opt.letter, profile: opt.profile });

  // marca o segmento atual como concluído
  const segs = progressTrack.querySelectorAll('.progress-seg');
  segs[currentIndex].querySelector('span').style.width = '100%';

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < QUESTIONS.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 350);
}

// ---- Etapa 2: resultado ----
function computeProfile() {
  const counts = {};
  answers.forEach((a) => {
    counts[a.profile] = (counts[a.profile] || 0) + 1;
  });
  let best = null;
  let bestCount = -1;
  // percorre na ordem em que os perfis apareceram nas respostas (desempate = primeira aparição)
  answers.forEach((a) => {
    const c = counts[a.profile];
    if (c > bestCount) {
      bestCount = c;
      best = a.profile;
    }
  });
  return best;
}

async function finishQuiz() {
  const profileKey = computeProfile();
  const profile = PROFILES[profileKey];

  stepQuiz.classList.add('hidden');
  stepResult.classList.remove('hidden');

  document.getElementById('result-dot').style.background = profile.color;
  document.getElementById('result-tagline').textContent = profile.tagline;
  document.getElementById('result-badge').style.borderColor = profile.color;
  document.getElementById('result-title').textContent = profile.name;
  document.getElementById('result-description').textContent = profile.description;

  try {
    const { error } = await supabaseClient.from('responses').insert({
      respondent_name: respondentName,
      answers: answers,
      profile: profileKey,
    });
    if (error) throw error;
    statusMsg.textContent = 'Resultado enviado. Obrigado por participar!';
  } catch (err) {
    console.error(err);
    statusMsg.textContent = 'Não foi possível enviar seu resultado ao servidor. Verifique sua conexão.';
  }
}
