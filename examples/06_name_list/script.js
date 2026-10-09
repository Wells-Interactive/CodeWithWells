const form = document.querySelector("#nameForm");
const input = document.querySelector("#nameInput");
const list = document.querySelector("#nameList");
const message = document.querySelector("#message");

const names = [];

function renderNames() {
  list.innerHTML = "";

  names.forEach((name, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${escapeHtml(name)}</span><button data-index="${index}">Remove</button>`;
    list.appendChild(li);
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = input.value.trim();
  if (!name) return;

  names.push(name);
  input.value = "";
  message.textContent = `${name} was added.`;
  renderNames();
});

list.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;

  const index = Number(event.target.dataset.index);
  const removed = names.splice(index, 1);
  message.textContent = `${removed[0]} was removed.`;
  renderNames();
});
