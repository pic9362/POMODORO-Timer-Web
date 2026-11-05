function loadMinutes() {
  const n = Number(localStorage.getItem("pomodoroMinutes"));
  return Number.isInteger(n) && n >= 1 && n <= 60 ? n : 25;
}

const INITIAL_SECONDS = loadMinutes() * 60;

const timerEl = document.querySelector(".timer");
const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");
const resetBtn = document.querySelector(".btn-reset");

let remaining = INITIAL_SECONDS;
let intervalId = null;

function render() {
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = `${m}:${s}`;
}

function startTimer() {
  if (intervalId !== null || remaining <= 0) return;
  intervalId = setInterval(() => {
    remaining--;
    render();
    if (remaining <= 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = INITIAL_SECONDS;
  render();
}

startBtn.onclick = startTimer;
stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;
document.querySelector(".btn-settings").onclick = () => {
  location.href = "setting.html";
};

render();

const clockEl = document.querySelector(".clock");

function renderClock() {
  clockEl.textContent = new Date().toLocaleTimeString("en-US", { hour12: true });
}

renderClock();
setInterval(renderClock, 1000);
