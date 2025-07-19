import { cards } from './data.js';

// DOM elements
const cardGrid = document.querySelector("#cardGrid");
const searchInput = document.querySelector("#searchInput");
const colorFilter = document.querySelector("#colorFilter");
const typeFilter = document.querySelector("#typeFilter");

// Display all matching cards
function displayCards(cardList) {
  cardGrid.innerHTML = "";

  if (!cardList.length) {
    cardGrid.innerHTML = "<p>No cards match your search.</p>";
    return;
  }

  cardList.forEach(card => {
    const cardEl = createCardElement(card);
    cardGrid.appendChild(cardEl);
  });
}

// Create a single card element
function createCardElement(card) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");

  const img = document.createElement("img");
  img.src = card.image.includes("art_crop")
    ? card.image.replace("art_crop", "normal")
    : card.image;
  img.alt = card.name;
  img.width = 300;
  img.height = 420;

  const title = document.createElement("h3");
  title.textContent = card.name;

  const typeColor = document.createElement("p");
  typeColor.textContent = `${card.type} — ${card.color}`;

  const cost = document.createElement("p");
  cost.textContent = `Mana Cost: ${card.cost}`;

  const button = document.createElement("button");
  button.textContent = "Add to Favorites";
  button.dataset.name = card.name;
  button.addEventListener("click", () => addToFavorites(card));

  cardEl.append(img, title, typeColor, cost, button);
  return cardEl;
}

// Add card to favorites using sessionStorage
function addToFavorites(card) {
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  const alreadyAdded = favorites.some(fav => fav.name === card.name);
  if (alreadyAdded) {
    alert(`${card.name} is already in your favorites.`);
    return;
  }

  favorites.push(card);
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
  alert(`${card.name} added to favorites!`);
}

// Filter the card list based on search and dropdowns
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedColor = colorFilter.value;
  const selectedType = typeFilter.value;

  const filtered = cards.filter(card => {
    const matchName = card.name.toLowerCase().includes(searchTerm);
    const matchColor = selectedColor === "all" || card.color === selectedColor;
    const matchType = selectedType === "all" || card.type.includes(selectedType);

    return matchName && matchColor && matchType;
  });

  displayCards(filtered);
}

// Event listeners
searchInput.addEventListener("input", applyFilters);
colorFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

// Initial render
displayCards(cards);
