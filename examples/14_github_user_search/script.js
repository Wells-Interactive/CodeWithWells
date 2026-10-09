const form = document.querySelector("#form");
const input = document.querySelector("#username");
const result = document.querySelector("#result");

async function searchUser(username) {
  result.textContent = "Searching...";

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

    if (response.status === 404) {
      result.textContent = "User not found.";
      return;
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const user = await response.json();

    result.innerHTML = `
      <img src="${user.avatar_url}" alt="" width="100">
      <h2>${escapeHtml(user.name || user.login)}</h2>
      <p>${escapeHtml(user.bio || "No public bio.")}</p>
      <p>Public repositories: ${user.public_repos}</p>
      <p>Followers: ${user.followers}</p>
      <a href="${user.html_url}" target="_blank" rel="noopener">Open GitHub Profile</a>
    `;
  } catch (error) {
    console.error(error);
    result.textContent = "Could not complete the search.";
  }
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  searchUser(input.value.trim());
});
