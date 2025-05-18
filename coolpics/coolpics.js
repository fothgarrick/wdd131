// Toggle the menu on small screens
const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

// Handle menu visibility on window resize
function handleResize() {
  const menu = document.querySelector(".menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

// Viewer template function - Required for rubric
function viewerTemplate(imageUrl, altText) {
  return `
    <img src="${imageUrl}" alt="${altText}">
    <button class="close-viewer">X</button>
  `;
}

// Image modal viewer logic
const gallery = document.querySelector('.gallery');
const viewer = document.getElementById('viewer');

gallery.addEventListener('click', (event) => {
  const img = event.target.closest('img');
  if (!img) return;

  const src = img.getAttribute('src');
  const alt = img.getAttribute('alt');
  const fullSrc = src.split('-')[0] + '-full.jpeg';

  viewer.innerHTML = viewerTemplate(fullSrc, alt);
  viewer.showModal();

  document.querySelector('.close-viewer').addEventListener('click', () => {
    viewer.close();
  });
});

// Close viewer if user clicks outside the image
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) {
    viewer.close();
  }
});
