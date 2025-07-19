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

    const img = document.createElement("img");
    img.src = card.image.replace("art_crop", "normal"); // optional optimization
    img.alt = card.name;
    img.width = 300;
    img.height = 420;

    const h3 = document.createElement("h3");
    h3.textContent = card.name;

    const type = document.createElement("p");
    type.textContent = `${card.type} — ${card.color}`;

    const cost = document.createElement("p");
    cost.textContent = `Mana Cost: ${card.cost}`;

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", () => confirmRemove(card.name));

    cardEl.append(img, h3, type, cost, btn);
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
