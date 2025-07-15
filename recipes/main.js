import recipes from './recipes.mjs';

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  return list[random(list.length)];
}

function tagsTemplate(tags) {
  return tags.map(tag => `<span>${tag}</span>`).join('');
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.floor(rating)
      ? `<span aria-hidden="true">⭐</span>`
      : `<span aria-hidden="true">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <section class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" width="300" height="200" />
      <div class="text-content">
        <div class="tags">${tagsTemplate(recipe.tags)}</div>
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p class="description">${recipe.description}</p>
      </div>
    </section>
  `;
}

function renderRecipes(recipeList) {
  const container = document.querySelector('.recipe-wrapper');
  container.innerHTML = document.querySelector('.search-bar').outerHTML;
  recipeList.forEach(recipe => {
    container.insertAdjacentHTML('beforeend', recipeTemplate(recipe));
  });
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(query)) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const query = document.querySelector('#search').value.toLowerCase();
  const results = filterRecipes(query);
  renderRecipes(results);
}

document.querySelector('.search-bar').addEventListener('submit', searchHandler);

init();
