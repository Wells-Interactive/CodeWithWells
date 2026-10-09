let timerId = null;
let remaining = 60;

const secondsInput = document.querySelector("#seconds");
const display = document.querySelector("#display");
const message = document.querySelector("#message");

function updateDisplay() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (timerId) return;
  remaining = Number(secondsInput.value);
  if (remaining <= 0) return;

  updateDisplay();
  message.textContent = "";

  timerId = setInterval(() => {
    remaining--;
    updateDisplay();

    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      message.textContent = "Time is up!";
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  remaining = Number(secondsInput.value) || 60;
  message.textContent = "";
  updateDisplay();
}

document.querySelector("#start").onclick = startTimer;
document.querySelector("#reset").onclick = resetTimer;
secondsInput.onchange = resetTimer;
updateDisplay();
