const contacts = [];
const form = document.querySelector("#contactForm");
const contactsBox = document.querySelector("#contacts");
const search = document.querySelector("#search");

function render() {
  const term = search.value.toLowerCase();
  contactsBox.innerHTML = "";

  contacts
    .filter(c => c.name.toLowerCase().includes(term) || c.phone.includes(term))
    .forEach((contact, index) => {
      const card = document.createElement("article");
      card.innerHTML = `
        <strong>${escapeHtml(contact.name)}</strong>
        <span>${escapeHtml(contact.phone)}</span>
        <button data-index="${index}">Delete</button>
      `;
      contactsBox.appendChild(card);
    });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  contacts.push({
    name: document.querySelector("#name").value.trim(),
    phone: document.querySelector("#phone").value.trim()
  });
  form.reset();
  render();
});

search.addEventListener("input", render);

contactsBox.addEventListener("click", event => {
  if (event.target.matches("button")) {
    contacts.splice(Number(event.target.dataset.index), 1);
    render();
  }
});
