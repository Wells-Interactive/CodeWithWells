const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+";
const password = document.querySelector("#password");

function randomChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function generatePassword() {
  const length = Number(document.querySelector("#length").value);
  let chars = letters;
  if (document.querySelector("#numbers").checked) chars += numbers;
  if (document.querySelector("#symbols").checked) chars += symbols;

  let result = "";
  for (let i = 0; i < length; i++) result += randomChar(chars);
  password.value = result;
}

document.querySelector("#generate").addEventListener("click", generatePassword);

document.querySelector("#copy").addEventListener("click", async () => {
  if (!password.value) return;
  await navigator.clipboard.writeText(password.value);
  document.querySelector("#message").textContent = "Copied!";
});

generatePassword();
