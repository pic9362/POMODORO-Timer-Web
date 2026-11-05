const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const STORAGE_KEY = "pomodoroMinutes";

const input = document.querySelector(".input-time");
const doneBtn = document.querySelector(".btn-done");

function isValid(value) {
  if (value.trim() === "") return false;
  const n = Number(value);
  return Number.isInteger(n) && n >= MIN_MINUTES && n <= MAX_MINUTES;
}

function updateButton() {
  doneBtn.disabled = !isValid(input.value);
}

const saved = localStorage.getItem(STORAGE_KEY);
if (saved !== null) input.value = saved;

input.oninput = updateButton;

doneBtn.onclick = () => {
  if (!isValid(input.value)) return;
  localStorage.setItem(STORAGE_KEY, String(Number(input.value)));
  location.href = "index.html";
};

updateButton();
