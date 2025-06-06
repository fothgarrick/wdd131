const themeSelector = document.querySelector('#theme');

function changeTheme() {
    if (themeSelector.value === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('.logo').src = 'logo-white.webp';
    } else {
        document.body.classList.remove('dark');
        document.querySelector('.logo').src = 'logo.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
