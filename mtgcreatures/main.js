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

  cardEl.innerHTML = `
    <img src="${card.image}" alt="${card.name}" />
    <h3>${card.name}</h3>
    <p>${card.type} — ${card.color}</p>
    <p>Mana Cost: ${card.cost}</p>
    <button data-name="${card.name}">Add to Favorites</button>
  `;

  const button = cardEl.querySelector("button");
  button.addEventListener("click", () => addToFavorites(card));

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
