let tasks = JSON.parse(localStorage.getItem("cww_tasks") || "[]");

const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#tasks");

function save() {
  localStorage.setItem("cww_tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <label><input type="checkbox" ${task.done ? "checked" : ""} data-complete="${index}">
      ${escapeHtml(task.text)}</label>
      <button data-delete="${index}">Delete</button>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  tasks.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
});

list.addEventListener("change", event => {
  if (event.target.dataset.complete !== undefined) {
    tasks[Number(event.target.dataset.complete)].done = event.target.checked;
    save();
    render();
  }
});

list.addEventListener("click", event => {
  if (event.target.dataset.delete !== undefined) {
    tasks.splice(Number(event.target.dataset.delete), 1);
    save();
    render();
  }
});

document.querySelector("#clear").addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  save();
  render();
});

render();
