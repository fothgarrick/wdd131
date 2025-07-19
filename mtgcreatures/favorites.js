const favoritesGrid = document.querySelector("#favoritesGrid");
const clearBtn = document.querySelector("#clearFavoritesBtn");

// Load and display favorites from sessionStorage
function loadFavorites() {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  favoritesGrid.innerHTML = "";

  if (!favorites.length) {
    favoritesGrid.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p>${card.type} — ${card.color}</p>
      <p>Mana Cost: ${card.cost}</p>
      <button>Remove</button>
    `;

    const btn = cardEl.querySelector("button");
    btn.addEventListener("click", () => confirmRemove(card.name));

    favoritesGrid.appendChild(cardEl);
  });
}

// Prompt before removing a card
function confirmRemove(name) {
  if (confirm(`Remove "${name}" from your favorites?`)) {
    removeFavorite(name);
  }
}

// Remove single card
function removeFavorite(name) {
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  favorites = favorites.filter(card => card.name !== name);
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

// Clear all favorites with confirmation
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to remove ALL favorites?")) {
    sessionStorage.removeItem("favorites");
    loadFavorites();
  }
});

loadFavorites();