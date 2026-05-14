const API_URL = 'http://localhost:5000/analyze';

const passwordInput   = document.getElementById('passwordInput');
const analyzeBtn      = document.getElementById('analyzeBtn');
const toggleBtn       = document.getElementById('toggleVisibility');
const errorMsg        = document.getElementById('errorMsg');
const loader          = document.getElementById('loader');
const resultsEl       = document.getElementById('results');

// ── Toggle password visibility ──
toggleBtn.addEventListener('click', () => {
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

// ── Enter key triggers analysis ──
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') analyzeBtn.click();
});

// ── Main analyze button ──
analyzeBtn.addEventListener('click', async () => {
  const password = passwordInput.value;

  // Reset
  errorMsg.classList.add('hidden');
  resultsEl.classList.add('hidden');

  if (!password) {
    showError('Please enter a password.');
    return;
  }

  loader.classList.remove('hidden');
  analyzeBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.error || 'Something went wrong.');
      return;
    }

    renderResults(data);

  } catch (err) {
    showError('Cannot connect to backend. Make sure Flask is running on port 5000.');
  } finally {
    loader.classList.add('hidden');
    analyzeBtn.disabled = false;
  }
});

// ── Error helper ──
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  loader.classList.add('hidden');
  analyzeBtn.disabled = false;
}

// ── Render all results ──
function renderResults(data) {
  const { entropy, breach, patterns, crack_time, feedback } = data;

  renderSummary(feedback.summary);
  renderEntropy(entropy, crack_time.score_label);
  renderBreach(breach);
  renderCrackTime(crack_time);
  renderPatterns(patterns);
  renderFeedback(feedback.feedback);
  renderSuggestions(feedback.suggestions);

  resultsEl.classList.remove('hidden');
}

// ── 01 Summary ──
function renderSummary(summary) {
  document.getElementById('summaryText').textContent = summary;

  const card = document.getElementById('summaryCard');
  card.className = 'card';

  const s = summary.toLowerCase();
  if (s.includes('critical'))      card.classList.add('critical');
  else if (s.includes('very strong')) card.classList.add('very-strong');
  else if (s.includes('strong'))   card.classList.add('strong');
  else if (s.includes('fair'))     card.classList.add('fair');
  else if (s.includes('weak'))     card.classList.add('weak');
}

// ── 02 Entropy ──
function renderEntropy(entropy, label) {
  document.getElementById('entropyScore').textContent = `${entropy} bits`;

  let explanation = '';
  if (entropy < 35)       explanation = 'Extremely predictable — trivial to crack';
else if (entropy < 55)  explanation = 'Low complexity — weak against modern attacks';
else if (entropy < 70)  explanation = 'Moderate complexity — not strong enough on its own';
else if (entropy < 90)  explanation = 'Good complexity — reasonably hard to brute force';
else                    explanation = 'High complexity — very strong against brute force';

  document.getElementById('entropyLabel').textContent = `${label} — ${explanation}`;

  const pct = Math.min((entropy / 80) * 100, 100);
  document.getElementById('entropyBar').style.width = `${pct}%`;
}

// ── 03 Breach ──
function renderBreach(breach) {
  const status = document.getElementById('breachStatus');
  const text   = document.getElementById('breachText');

  if (breach.breached) {
    status.textContent = '⚠ FOUND IN BREACH DATABASE';
    status.className = 'breach-status pwned';
    text.textContent = `This password appeared in ${breach.count.toLocaleString()} known breach(es). Stop using it immediately.`;
  } else {
    status.textContent = '✓ NOT FOUND IN ANY BREACHES';
    status.className = 'breach-status safe';
    text.textContent = 'This password does not appear in known breach databases.';
  }
}

// ── 04 Crack Time ──
function renderCrackTime(crack_time) {
  const grid = document.getElementById('crackGrid');
  grid.innerHTML = '';

  const items = [
    { label: 'Online — throttled',    value: crack_time.online_throttled },
    { label: 'Online — no limit',     value: crack_time.online_unthrottled },
    { label: 'Offline — slow hash',   value: crack_time.offline_slow },
    { label: 'Offline — fast hash',   value: crack_time.offline_fast },
  ];

  items.forEach(({ label, value }) => {
    grid.innerHTML += `
      <div class="crack-item">
        <div class="crack-item-label">${label}</div>
        <div class="crack-item-value">${value}</div>
      </div>`;
  });
}

// ── 05 Patterns ──
function renderPatterns(patterns) {
  const list = document.getElementById('patternList');
  list.innerHTML = '';

  if (patterns.pattern_count === 0) {
    list.innerHTML = '<li class="no-issues">No common patterns detected.</li>';
    return;
  }

  patterns.patterns_found.forEach(p => {
    list.innerHTML += `<li>${p}</li>`;
  });
}

// ── 06 Feedback ──
function renderFeedback(feedbackItems) {
  const list = document.getElementById('feedbackList');
  list.innerHTML = '';

  feedbackItems.forEach(f => {
    list.innerHTML += `<li>${f}</li>`;
  });
}

// ── 07 Suggestions ──
function renderSuggestions(suggestions) {
  const card = document.getElementById('suggestionsCard');
  const list = document.getElementById('suggestionList');
  list.innerHTML = '';

  if (!suggestions || suggestions.length === 0) {
    card.classList.add('hidden');
    return;
  }

  card.classList.remove('hidden');
  suggestions.forEach(s => {
    list.innerHTML += `<li>${s}</li>`;
  });
}