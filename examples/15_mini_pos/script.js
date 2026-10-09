const menuItems = [
  { id: 1, name: "Jollof Rice", price: 2500 },
  { id: 2, name: "Fried Rice", price: 2800 },
  { id: 3, name: "Chicken", price: 3000 },
  { id: 4, name: "Soft Drink", price: 800 }
];

const cart = [];

const menu = document.querySelector("#menu");
const cartBox = document.querySelector("#cart");
const totalBox = document.querySelector("#total");

function money(value) {
  return value.toLocaleString("en-NG", { minimumFractionDigits: 2 });
}

function renderMenu() {
  menu.innerHTML = menuItems.map(item =>
    `<button class="menu-item" data-id="${item.id}">
      <strong>${item.name}</strong><span>₦${money(item.price)}</span>
    </button>`
  ).join("");
}

function renderCart() {
  cartBox.innerHTML = "";

  cart.forEach((line, index) => {
    const item = document.createElement("div");
    item.className = "line";
    item.innerHTML = `
      <span>${line.name} x ${line.quantity}</span>
      <strong>₦${money(line.price * line.quantity)}</strong>
      <button data-remove="${index}">−</button>
    `;
    cartBox.appendChild(item);
  });

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  totalBox.textContent = money(total);
}

menu.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (!button) return;

  const item = menuItems.find(item => item.id === Number(button.dataset.id));
  const existing = cart.find(line => line.id === item.id);

  if (existing) existing.quantity++;
  else cart.push({ ...item, quantity: 1 });

  renderCart();
});

cartBox.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const index = Number(button.dataset.remove);
  cart[index].quantity--;

  if (cart[index].quantity <= 0) cart.splice(index, 1);
  renderCart();
});

document.querySelector("#clear").onclick = () => {
  cart.length = 0;
  renderCart();
};

renderMenu();
renderCart();
