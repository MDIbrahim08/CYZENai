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

// ── SHA-1 hash for HIBP ──
async function checkBreach(password) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);
    
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();
    const lines = text.split('\n');
    for (let line of lines) {
      if (line.startsWith(suffix)) {
        return parseInt(line.split(':')[1].trim());
      }
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

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
    // Client-side analysis using zxcvbn
    const zx = zxcvbn(password);
    
    // Check breach status
    const breachCount = await checkBreach(password);

    // Format data to match expected structure
    const entropy = Math.round(zx.guesses_log10 * 3.32); // log2
    let scoreLabel = 'Very Weak';
    if (zx.score === 1) scoreLabel = 'Weak';
    else if (zx.score === 2) scoreLabel = 'Fair';
    else if (zx.score === 3) scoreLabel = 'Strong';
    else if (zx.score === 4) scoreLabel = 'Very Strong';
    
    if (breachCount > 0) scoreLabel = 'Critical (Breached)';

    const data = {
      entropy: Math.min(entropy, 120),
      breach: {
        breached: breachCount > 0,
        count: breachCount
      },
      crack_time: {
        score_label: scoreLabel,
        online_throttled: zx.crack_times_display.online_throttled_100_per_hour,
        online_unthrottled: zx.crack_times_display.online_no_throttling_10_per_second,
        offline_slow: zx.crack_times_display.offline_slow_hashing_1e4_per_second,
        offline_fast: zx.crack_times_display.offline_fast_hashing_1e10_per_second
      },
      patterns: {
        pattern_count: zx.sequence.length,
        patterns_found: zx.sequence.map(s => s.pattern === 'dictionary' ? `Dictionary word: ${s.token}` : s.pattern)
      },
      feedback: {
        summary: `Your password is ${scoreLabel}.`,
        feedback: zx.feedback.warning ? [zx.feedback.warning] : (zx.score > 2 ? ['Password looks good.'] : ['Password is too predictable.']),
        suggestions: zx.feedback.suggestions
      }
    };

    renderResults(data);

  } catch (err) {
    showError('An error occurred during analysis.');
    console.error(err);
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

  // Remove duplicates and limit
  const uniquePatterns = [...new Set(patterns.patterns_found)].filter(p => p !== 'bruteforce');
  
  if (uniquePatterns.length === 0) {
    list.innerHTML = '<li class="no-issues">No common patterns detected.</li>';
    return;
  }

  uniquePatterns.forEach(p => {
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