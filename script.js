const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

const scenarios = [
  {
    tag: "Trend",
    stage: 1,
    stageTitle: "Trend Basics",
    mission: "Trend Read",
    title: "上昇トレンドの押し目",
    answer: "buy",
    explanation: "高値と安値を切り上げ、MA5がMA25より上にあります。押し目から反発しているので買い候補です。",
    checklist: ["高値・安値が切り上がっている", "株価がMA25より上", "反発時に出来高が少し増えている"],
    prices: [100, 101, 103, 102, 105, 107, 106, 109, 111, 110, 113, 116, 114, 117, 120, 118, 121, 124, 122, 125, 128, 126, 129, 132, 135, 137, 136, 140],
    volumes: [52, 56, 60, 54, 65, 72, 58, 80, 76, 64, 88, 94, 72, 90, 102, 82, 98, 110, 84, 104, 118, 96, 112, 124, 138, 146, 120, 152],
    overlay: "trend"
  },
  {
    tag: "Reversal",
    stage: 1,
    stageTitle: "Trend Basics",
    mission: "Exit Check",
    title: "ダブルトップ後の支持線割れ",
    answer: "sell",
    explanation: "同じ高値を2回試して失敗し、ネックラインを割っています。反発を期待するより撤退を優先する場面です。",
    checklist: ["高値更新に失敗している", "ネックラインを下抜けた", "下落日に出来高が増えている"],
    prices: [120, 123, 126, 128, 130, 132, 131, 134, 136, 135, 137, 136, 133, 130, 128, 131, 134, 136, 135, 132, 129, 127, 124, 121, 118, 116, 113, 110],
    volumes: [58, 60, 66, 70, 72, 80, 64, 78, 82, 68, 76, 74, 86, 92, 88, 72, 76, 84, 80, 96, 110, 118, 132, 146, 152, 164, 170, 188],
    overlay: "support"
  },
  {
    tag: "Range",
    stage: 2,
    stageTitle: "Pattern Sense",
    mission: "No Trade Zone",
    title: "三角保ち合いの途中",
    answer: "wait",
    explanation: "値幅は収束していますが、まだ上下どちらにも抜けていません。方向が出るまで見送りが自然です。",
    checklist: ["高値は切り下がっている", "安値は切り上がっている", "出来高が減り気味で方向待ち"],
    prices: [120, 124, 122, 126, 123, 127, 124, 126, 123, 125, 124, 126, 123, 125, 124, 125, 124, 125, 124, 125, 124, 125, 124, 126, 128, 131, 130, 134],
    volumes: [90, 86, 84, 82, 78, 75, 72, 70, 68, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 39, 58, 72, 92, 84, 108],
    overlay: "triangle"
  },
  {
    tag: "Momentum",
    stage: 2,
    stageTitle: "Pattern Sense",
    mission: "Overheat",
    title: "RSIが過熱している上昇",
    answer: "wait",
    explanation: "上昇は強いですが、短期的に伸びすぎています。新規で飛びつくより、押し目を待つ場面です。",
    checklist: ["連続陽線で急上昇している", "MAから大きく離れている", "過熱後の反落に注意する"],
    prices: [98, 99, 101, 100, 102, 104, 105, 107, 109, 112, 115, 118, 121, 125, 129, 133, 136, 139, 142, 146, 150, 153, 155, 154, 151, 149, 152, 150],
    volumes: [45, 46, 48, 44, 50, 54, 56, 62, 70, 88, 96, 108, 122, 140, 156, 168, 176, 182, 190, 204, 212, 220, 198, 180, 170, 162, 150, 144],
    overlay: "rsi"
  },
  {
    tag: "Volume",
    stage: 3,
    stageTitle: "Breakout Rush",
    mission: "Breakout",
    title: "出来高を伴う高値更新",
    answer: "buy",
    explanation: "抵抗線を上抜けるタイミングで出来高が増えています。参加者が増えたブレイクとして買い候補です。",
    checklist: ["過去の高値を上抜けた", "上抜け日に出来高が増えた", "ブレイクした価格帯が支持線になるか確認する"],
    prices: [110, 112, 111, 113, 114, 112, 115, 116, 114, 116, 117, 115, 117, 118, 116, 118, 119, 117, 119, 120, 118, 120, 123, 127, 130, 132, 131, 135],
    volumes: [50, 54, 48, 56, 60, 52, 62, 66, 58, 64, 68, 56, 66, 70, 60, 68, 72, 62, 70, 74, 66, 78, 112, 148, 166, 176, 138, 184],
    overlay: "volume"
  },
  {
    tag: "Bottom",
    stage: 3,
    stageTitle: "Breakout Rush",
    mission: "Neckline",
    title: "ダブルボトムのネックライン突破",
    answer: "buy",
    explanation: "2回目の安値で下げ止まり、ネックラインを上抜けています。戻り売りよりも、押し目を待った買い候補として見ます。",
    checklist: ["2番底が1番底を大きく割っていない", "ネックラインを上抜けた", "突破後に出来高が増えている"],
    prices: [134, 130, 126, 122, 119, 116, 113, 116, 120, 124, 127, 125, 122, 118, 115, 114, 117, 121, 125, 128, 130, 132, 136, 139, 142, 140, 144, 147],
    volumes: [84, 88, 92, 98, 106, 118, 130, 112, 96, 90, 86, 82, 88, 96, 104, 116, 108, 112, 120, 128, 134, 142, 166, 178, 190, 154, 172, 188],
    overlay: "support"
  },
  {
    tag: "RSI",
    stage: 4,
    stageTitle: "Master Mode",
    mission: "Rebound",
    title: "RSI売られすぎからの反発",
    answer: "buy",
    explanation: "下落が続いたあと、安値更新が鈍り、RSIの売られすぎ圏から反発しています。短期の戻りを狙うなら買い候補です。",
    checklist: ["下落の勢いが弱まっている", "RSIが30付近から反発", "直近高値を小さく上抜けている"],
    prices: [146, 143, 140, 138, 135, 132, 129, 126, 124, 121, 119, 116, 114, 112, 111, 110, 109, 111, 110, 112, 114, 116, 119, 121, 124, 123, 126, 128],
    volumes: [88, 92, 96, 102, 106, 112, 118, 124, 130, 138, 146, 152, 158, 162, 150, 142, 136, 128, 118, 112, 116, 124, 138, 148, 156, 132, 144, 152],
    overlay: "rsi"
  },
  {
    tag: "Daily",
    stage: 4,
    stageTitle: "Master Mode",
    mission: "Pause",
    title: "コマ足が続く方向待ち",
    answer: "wait",
    explanation: "大きなトレンド後に実体の小さい足が続き、上下どちらにも決め手がありません。次の強い足や節目抜けまで見送りです。",
    checklist: ["実体が小さく迷いが出ている", "MA付近で方向感が弱い", "支持線と抵抗線の間にいる"],
    prices: [122, 125, 128, 131, 133, 136, 138, 140, 139, 141, 140, 142, 141, 142, 141, 142, 141, 142, 141, 142, 141, 142, 141, 140, 138, 136, 134, 132],
    volumes: [76, 82, 88, 96, 104, 112, 118, 124, 100, 92, 86, 82, 78, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56, 78, 92, 108, 120, 132],
    overlay: "triangle"
  }
];

const canvas = document.querySelector("#priceChart");
const ctx = canvas.getContext("2d");
const choiceButtons = document.querySelectorAll(".choice-button");
const nextButton = document.querySelector("#nextRound");
const resetButton = document.querySelector("#resetGame");
const hiddenStart = 22;
const maxTime = 20;
const stageNames = ["Trend Basics", "Pattern Sense", "Breakout Rush", "Master Mode", "Chart Inferno"];

let roundIndex = 0;
let currentStage = 1;
let score = 0;
let streak = 0;
let lives = 3;
let revealed = false;
let timeLeft = maxTime;
let timerId = null;
const badges = new Set();

function movingAverage(values, span) {
  return values.map((_, index) => {
    const start = Math.max(0, index - span + 1);
    const slice = values.slice(start, index + 1);
    return slice.reduce((sum, value) => sum + value, 0) / slice.length;
  });
}

function drawLine(points, color, width = 2, dashed = false) {
  ctx.save();
  ctx.beginPath();
  if (dashed) ctx.setLineDash([8, 7]);
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

function drawGameChart() {
  const scenario = scenarios[roundIndex];
  const prices = scenario.prices;
  const volumes = scenario.volumes;
  const visibleCount = revealed ? prices.length : hiddenStart;
  const visiblePrices = prices.slice(0, visibleCount);
  const width = canvas.width;
  const height = canvas.height;
  const pad = 44;
  const min = Math.min(...prices) - 8;
  const max = Math.max(...prices) + 8;
  const xStep = (width - pad * 2) / (prices.length - 1);
  const toX = index => pad + index * xStep;
  const toY = value => height - pad - ((value - min) / (max - min)) * (height - pad * 2);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfdff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e3eaf0";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = pad + i * ((height - pad * 2) / 4);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  if (!revealed) {
    ctx.fillStyle = "rgba(23, 32, 42, 0.06)";
    ctx.fillRect(toX(hiddenStart - 0.5), pad, width - pad - toX(hiddenStart - 0.5), height - pad * 2);
    ctx.fillStyle = "rgba(23, 32, 42, 0.42)";
    ctx.font = "700 34px Segoe UI, sans-serif";
    ctx.fillText("?", toX(hiddenStart + 2), pad + 70);
  }

  visiblePrices.forEach((close, index) => {
    const prev = visiblePrices[Math.max(0, index - 1)];
    const open = prev + ((index % 4) - 1.5) * 0.9;
    const high = Math.max(open, close) + 1.8 + (index % 3) * 0.55;
    const low = Math.min(open, close) - 1.7 - (index % 2) * 0.45;
    const x = toX(index);
    const candleWidth = Math.max(8, xStep * 0.56);
    const rising = close >= open;

    ctx.strokeStyle = rising ? "#0f9f6e" : "#d95040";
    ctx.fillStyle = rising ? "#dff8ec" : "#ffe3df";
    ctx.beginPath();
    ctx.moveTo(x, toY(high));
    ctx.lineTo(x, toY(low));
    ctx.stroke();
    const bodyTop = toY(Math.max(open, close));
    const bodyHeight = Math.max(4, Math.abs(toY(open) - toY(close)));
    ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
  });

  const ma5 = movingAverage(prices, 5).slice(0, visibleCount);
  const ma25 = movingAverage(prices, 16).slice(0, visibleCount);
  drawLine(ma5.map((value, index) => ({ x: toX(index), y: toY(value) })), "#2563eb", 2.3);
  drawLine(ma25.map((value, index) => ({ x: toX(index), y: toY(value) })), "#c47a16", 2.3);

  if (scenario.overlay === "support") {
    drawLine([{ x: toX(0), y: toY(128) }, { x: toX(prices.length - 1), y: toY(128) }], "rgba(217, 80, 64, 0.72)", 2, true);
  }

  if (scenario.overlay === "triangle") {
    drawLine([{ x: toX(1), y: toY(126) }, { x: toX(hiddenStart - 1), y: toY(124.5) }], "rgba(217, 80, 64, 0.72)", 2, true);
    drawLine([{ x: toX(1), y: toY(120) }, { x: toX(hiddenStart - 1), y: toY(124) }], "rgba(15, 159, 110, 0.72)", 2, true);
  }

  if (scenario.overlay === "trend") {
    drawLine([{ x: toX(0), y: toY(99) }, { x: toX(hiddenStart - 1), y: toY(128) }], "rgba(15, 159, 110, 0.62)", 2, true);
  }

  if (scenario.overlay === "volume") {
    const maxVolume = Math.max(...volumes);
    volumes.slice(0, visibleCount).forEach((volume, index) => {
      const barHeight = (volume / maxVolume) * 88;
      ctx.fillStyle = "rgba(8, 145, 178, 0.24)";
      ctx.fillRect(toX(index) - 5, height - pad - barHeight, 10, barHeight);
    });
  }

  if (scenario.overlay === "rsi") {
    const y = height - 86;
    ctx.fillStyle = "rgba(37, 99, 235, 0.08)";
    ctx.fillRect(pad, y - 38, width - pad * 2, 76);
    ctx.strokeStyle = "rgba(37, 99, 235, 0.35)";
    ctx.strokeRect(pad, y - 38, width - pad * 2, 76);
    drawLine(visiblePrices.map((_, index) => ({
      x: toX(index),
      y: y - 18 + Math.sin(index / 2) * 13
    })), "#0891b2", 2);
  }
}

function rankName() {
  if (score >= 900) return "Chart Master";
  if (score >= 600) return "Swing Pro";
  if (score >= 300) return "Signal Hunter";
  return "Rookie";
}

function stageTitle() {
  return stageNames[Math.min(currentStage - 1, stageNames.length - 1)];
}

function stageTimeLimit() {
  return Math.max(10, maxTime - (currentStage - 1) * 2);
}

function stageMultiplier() {
  return 1 + (currentStage - 1) * 0.25;
}

function livesText() {
  return "♥".repeat(lives) + "♡".repeat(3 - lives);
}

function updatePips() {
  const pips = scenarios.map((_, index) => {
    const className = index < roundIndex ? "is-done" : index === roundIndex ? "is-current" : "";
    return `<span class="${className}"></span>`;
  }).join("");
  document.querySelector("#roundPips").innerHTML = pips;
}

function updateBadges() {
  const shelf = document.querySelector("#badgeShelf");
  shelf.innerHTML = [...badges].map(label => `<span class="badge">${label}</span>`).join("");
}

function updateHud() {
  document.querySelector("#scoreValue").textContent = score;
  document.querySelector("#streakValue").textContent = `x${streak}`;
  document.querySelector("#lifeValue").textContent = livesText();
  document.querySelector("#roundValue").textContent = `${roundIndex + 1}/${scenarios.length}`;
  document.querySelector("#heroScore").textContent = score;
  document.querySelector("#heroStage").textContent = currentStage;
  document.querySelector("#heroLives").textContent = livesText();
  document.querySelector("#rankValue").textContent = rankName();
  document.querySelector("#timerValue").textContent = timeLeft;
  const fill = document.querySelector("#timerFill");
  fill.style.width = `${Math.max(0, (timeLeft / stageTimeLimit()) * 100)}%`;
  fill.classList.toggle("is-low", timeLeft <= 6);
  updatePips();
  updateBadges();
}

function pulseScore() {
  ["#scoreValue", "#heroScore"].forEach(selector => {
    const node = document.querySelector(selector);
    node.classList.remove("score-pop");
    void node.offsetWidth;
    node.classList.add("score-pop");
  });
}

function playSuccessSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();
    const now = audio.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = "triangle";
      gain.gain.setValueAtTime(0.0001, now + index * 0.075);
      gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.075 + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.075 + 0.18);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(now + index * 0.075);
      oscillator.stop(now + index * 0.075 + 0.2);
    });
  } catch (error) {
    // Sound is a bonus; browsers can block it.
  }
}

function showCelebration(points) {
  const celebration = document.querySelector("#celebration");
  document.querySelector("#celebrationTitle").textContent = streak >= 2 ? "COMBO!" : "NICE!";
  document.querySelector("#celebrationPoints").textContent = `+${points} pts`;
  celebration.classList.remove("is-live");
  void celebration.offsetWidth;
  celebration.classList.add("is-live");

  document.querySelectorAll(".confetti").forEach(node => node.remove());
  const colors = ["#0f9f6e", "#0891b2", "#2563eb", "#c47a16", "#d95040"];
  const stage = document.querySelector(".chart-stage");
  for (let i = 0; i < 34; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--x", `${Math.cos(i * 0.72) * (110 + (i % 5) * 22)}px`);
    piece.style.setProperty("--y", `${Math.sin(i * 0.72) * (82 + (i % 7) * 18)}px`);
    piece.style.setProperty("--r", `${180 + i * 37}deg`);
    stage.appendChild(piece);
    setTimeout(() => piece.remove(), 1000);
  }
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

function startTimer() {
  stopTimer();
  timeLeft = stageTimeLimit();
  updateHud();
  timerId = setInterval(() => {
    if (revealed) {
      stopTimer();
      return;
    }
    timeLeft -= 1;
    updateHud();
    if (timeLeft <= 0) {
      chooseAnswer("timeout");
    }
  }, 1000);
}

function updateGamePanel() {
  const scenario = scenarios[roundIndex];
  document.querySelector("#game").classList.remove("is-answered");
  document.querySelector("#stageLabel").textContent = `Stage ${currentStage}`;
  document.querySelector("#stageTitle").textContent = stageTitle();
  document.querySelector("#missionName").textContent = scenario.mission;
  document.querySelector("#scenarioTag").textContent = scenario.tag;
  document.querySelector("#scenarioTitle").textContent = scenario.title;
  document.querySelector("#scenarioQuestion").textContent = "未来のローソク足は隠れています。次の一手を選んでください。";
  document.querySelector("#gameChecklist").innerHTML = scenario.checklist.map(item => `<li>${item}</li>`).join("");
  document.querySelector("#feedbackText").textContent = "移動平均線、支持線、出来高を順番に見てみましょう。";
  document.querySelector("#feedbackBox").className = "feedback-box";
  document.querySelector("#resultTitle").textContent = "未回答";
  document.querySelector("#resultMeta").textContent = "早く正確に答えるとタイムボーナスが入ります。";
  choiceButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove("is-correct", "is-wrong");
  });
  nextButton.disabled = true;
  revealed = false;
  drawGameChart();
  updateHud();
  startTimer();
}

function animatePanel(correct) {
  const panel = document.querySelector(".game-panel");
  panel.classList.remove("screen-flash", "screen-shake");
  void panel.offsetWidth;
  panel.classList.add(correct ? "screen-flash" : "screen-shake");
}

function chooseAnswer(choice) {
  if (revealed) return;
  const scenario = scenarios[roundIndex];
  const correct = choice === scenario.answer;
  revealed = true;
  stopTimer();

  let gained = 0;
  if (correct) {
    gained = Math.round((100 + streak * 25 + timeLeft * 5) * stageMultiplier());
    score += gained;
    streak += 1;
    if (!badges.has("First Win")) badges.add("First Win");
    if (streak >= 3) badges.add("3 Combo");
    if (timeLeft >= 12) badges.add("Quick Read");
    playSuccessSound();
    showCelebration(gained);
    pulseScore();
  } else {
    streak = 0;
    lives = Math.max(0, lives - 1);
    if (choice === "timeout") badges.add("Time Lesson");
  }

  choiceButtons.forEach(button => {
    button.disabled = true;
    if (button.dataset.choice === scenario.answer) button.classList.add("is-correct");
    if (button.dataset.choice === choice && !correct) button.classList.add("is-wrong");
  });

  const prefix = correct ? "正解。" : choice === "timeout" ? "時間切れ。" : "惜しい。";
  document.querySelector("#feedbackBox").className = `feedback-box ${correct ? "correct" : "wrong"}`;
  document.querySelector("#game").classList.add("is-answered");
  document.querySelector("#feedbackText").textContent = `${prefix} ${scenario.explanation}`;
  document.querySelector("#resultTitle").textContent = correct ? `+${gained} pts` : lives === 0 ? "Game Over" : "Life -1";
  document.querySelector("#resultMeta").textContent = correct
    ? `基本100点 + コンボ + 残り時間ボーナス。現在ランク: ${rankName()}`
    : lives === 0
      ? "リセットしてもう一度挑戦できます。"
      : "未来の足を確認して、次のチャートで取り返しましょう。";

  nextButton.disabled = lives === 0;
  animatePanel(correct);
  drawGameChart();
  updateHud();
}

function nextRound() {
  if (roundIndex === scenarios.length - 1) {
    currentStage += 1;
    roundIndex = 0;
    badges.add(`Stage ${currentStage}`);
  } else {
    roundIndex += 1;
  }
  updateGamePanel();
}

function resetGame() {
  score = 0;
  streak = 0;
  lives = 3;
  roundIndex = 0;
  currentStage = 1;
  badges.clear();
  updateGamePanel();
}

function updateRisk() {
  const entry = Number(document.querySelector("#entryPrice").value) || 0;
  const shares = Number(document.querySelector("#shares").value) || 0;
  const risk = Number(document.querySelector("#riskPercent").value) || 0;
  const stop = Math.max(0, entry * (1 - risk / 100));
  const position = entry * shares;
  const loss = Math.max(0, (entry - stop) * shares);

  document.querySelector("#stopPrice").textContent = yen.format(stop);
  document.querySelector("#lossAmount").textContent = yen.format(loss);
  document.querySelector("#positionValue").textContent = yen.format(position);
}

choiceButtons.forEach(button => {
  button.addEventListener("click", () => chooseAnswer(button.dataset.choice));
});
nextButton.addEventListener("click", nextRound);
resetButton.addEventListener("click", resetGame);
document.querySelectorAll("#riskForm input").forEach(input => input.addEventListener("input", updateRisk));

updateRisk();
updateGamePanel();
