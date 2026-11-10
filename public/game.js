
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const roundText = document.getElementById("round");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const mistakeText = document.getElementById("mistakes");
const message = document.getElementById("message");
const button = document.getElementById("actionBtn");

const arrows = ["←", "↓", "↑", "→"];
const colors = ["#00ccff", "#ff66aa", "#66ff99", "#ffcc00"];

const keyMap = {
  ArrowLeft: 0, a: 0,
  ArrowDown: 1, s: 1,
  ArrowUp: 2, w: 2,
  ArrowRight: 3, d: 3
};

const ROUND_LENGTH = 30;
const TARGET_Y = 470;
const NOTE_COUNT = 24;

let round = 1;
let score = 0;
let combo = 0;
let bads = 0;
let misses = 0;
let state = "start";
let notes = [];
let elapsed = 0;
let lastFrame = 0;
let audio = null;

// Each round has the same duration and number of notes.
// Only the scrolling speed increases.
function getSpeed() {
  return 170 + (round - 1) * 30;
}

// Create a small sound when the player presses a key.
function playSound() {
  try {
    if (!audio) {
      audio = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 440;

    gain.gain.setValueAtTime(0.08, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001, audio.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.08);
  } catch (error) {
    console.log("Audio unavailable:", error);
  }
}

// Generate a consistent 30-second note pattern.
function createNotes() {
  notes = [];

  for (let i = 0; i < NOTE_COUNT; i++) {
    notes.push({
      col: (i * 3 + Math.floor(i / 4)) % 4,
      time: 2 + i * 1.1,
      hit: false
    });
  }
}

// Start or restart the current round.
function startRound() {
  score = 0;
  combo = 0;
  bads = 0;
  misses = 0;
  elapsed = 0;
  state = "playing";

  createNotes();
  message.textContent = "Round " + round + " - GO!";
  button.hidden = true;
  updateStats();
}

function updateStats() {
  roundText.textContent = `Round: ${round}/7`;
  timerText.textContent =
    `Time: ${Math.max(0, Math.ceil(ROUND_LENGTH - elapsed))}`;
  scoreText.textContent = `Score: ${score}`;
  mistakeText.textContent =
    `Bads: ${bads}/3 | Misses: ${misses}/5`;
}

function failRound() {
  state = "failed";
  message.textContent = "Round Failed! Try Again!";
  button.textContent = "Restart Round";
  button.hidden = false;
}

function finishRound() {
  if (state !== "playing") return;

  state = "complete";

  if (round === 7) {
    state = "won";
    message.textContent = "Congratulations! You beat all 7 rounds!";
    button.textContent = "Play Again";
  } else {
    message.textContent =
      `Round ${round} Complete! Score: ${score}`;
    button.textContent = "Next Round";
  }

  button.hidden = false;
}

// Judge the timing of a matching arrow key.
function hitNote(col) {
  if (state !== "playing") return;

  let best = null;
  let smallestDifference = Infinity;

  for (const note of notes) {
    if (note.hit || note.col !== col) continue;

    const difference = Math.abs(note.time - elapsed);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      best = note;
    }
  }

  if (!best || smallestDifference > 0.35) return;

  best.hit = true;

  if (smallestDifference <= 0.12) {
    score += 100;
    combo++;
    message.textContent = "PERFECT!";
  } else if (smallestDifference <= 0.23) {
    score += 50;
    combo++;
    message.textContent = "GOOD!";
  } else {
    score += 10;
    bads++;
    combo = 0;
    message.textContent = "BAD!";
  }

  if (bads >= 3) failRound();
  updateStats();
}

// Handle keyboard controls.
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {
    event.preventDefault();
  }

  if (event.key === "Escape") {
    if (state === "playing") {
      state = "paused";
      message.textContent = "PAUSED";
      button.textContent = "Resume";
      button.hidden = false;
    } else if (state === "paused") {
      state = "playing";
      message.textContent = "GO!";
      button.hidden = true;
    }
    return;
  }

  if (event.repeat) return;

  const col = keyMap[event.key];

  if (col !== undefined) {
    hitNote(col);
    if (state === "playing") playSound();
  }
});

// Handle the button for different game states.
button.addEventListener("click", () => {
  if (state === "complete") {
    round++;
    startRound();
  } else if (state === "won") {
    round = 1;
    startRound();
  } else if (state === "paused") {
    state = "playing";
    button.hidden = true;
    message.textContent = "GO!";
  } else {
    startRound();
  }
});

// Draw arrows and lanes using the Canvas 2D API.
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#252535" : "#303045";
    ctx.fillRect(i * 100, 0, 100, 560);

    ctx.fillStyle = "#555";
    ctx.fillRect(i * 100 + 2, TARGET_Y, 96, 65);

    ctx.fillStyle = colors[i];
    ctx.font = "bold 42px Arial";
    ctx.textAlign = "center";
    ctx.fillText(arrows[i], i * 100 + 50, TARGET_Y + 46);
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, TARGET_Y - 4, 400, 4);

  for (const note of notes) {
    if (note.hit) continue;

    const y = TARGET_Y - (note.time - elapsed) * getSpeed();

    if (y < -70 || y > 560) continue;

    ctx.fillStyle = colors[note.col];
    ctx.fillRect(note.col * 100 + 10, y, 80, 60);

    ctx.fillStyle = "#111";
    ctx.font = "bold 38px Arial";
    ctx.fillText(arrows[note.col], note.col * 100 + 50, y + 43);
  }

  if (state !== "playing") {
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, 0, 400, 560);
  }
}

// Main animation loop.
function gameLoop(timestamp) {
  if (!lastFrame) lastFrame = timestamp;

  const delta = Math.min((timestamp - lastFrame) / 1000, 0.05);
  lastFrame = timestamp;

  if (state === "playing") {
    elapsed += delta;

    for (const note of notes) {
      if (!note.hit && elapsed > note.time + 0.35) {
        note.hit = true;
        misses++;
        combo = 0;
        message.textContent = "MISS!";
      }
    }

    if (misses >= 5) {
      failRound();
    } else if (elapsed >= ROUND_LENGTH) {
      finishRound();
    }

    updateStats();
  }

  drawGame();
  requestAnimationFrame(gameLoop);
}

createNotes();
updateStats();
requestAnimationFrame(gameLoop);
