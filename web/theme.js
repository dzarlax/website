// Функция добавления класса 'dark_theme' к элементам
function applyDarkTheme() {
    document.querySelector('html').toggleAttribute('dark-mode', true);
}

// Функция удаления класса 'dark_theme' с элементов
function removeDarkTheme() {
    document.querySelector('html').toggleAttribute('dark-mode', false)
}

