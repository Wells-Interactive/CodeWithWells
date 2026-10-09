let expenses = JSON.parse(localStorage.getItem("cww_expenses") || "[]");

const form = document.querySelector("#expenseForm");
const list = document.querySelector("#expenses");
const total = document.querySelector("#total");

function save() {
  localStorage.setItem("cww_expenses", JSON.stringify(expenses));
}

function render() {
  list.innerHTML = "";
  let sum = 0;

  expenses.forEach((expense, index) => {
    sum += expense.amount;
    const li = document.createElement("li");
    li.innerHTML = `<span>${escapeHtml(expense.description)}</span>
      <span>₦${expense.amount.toFixed(2)}</span>
      <button data-delete="${index}">Delete</button>`;
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const description = document.querySelector("#description").value.trim();
  const amount = Number(document.querySelector("#amount").value);

  if (amount <= 0) return;

  expenses.push({ description, amount });
  form.reset();
  save();
  render();
});

list.addEventListener("click", event => {
  if (event.target.dataset.delete !== undefined) {
    expenses.splice(Number(event.target.dataset.delete), 1);
    save();
    render();
  }
});

render();
