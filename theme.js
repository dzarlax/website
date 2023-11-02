  // Функция добавления класса 'dark_theme' к элементам
function applyDarkTheme() {
    document.body.classList.add('dark_theme');
    document.querySelectorAll('h2, .skill-tag').forEach(function(tag) {
        tag.classList.add('dark_theme');
    });
}

// Функция удаления класса 'dark_theme' с элементов
function removeDarkTheme() {
    document.body.classList.remove('dark_theme');
    document.querySelectorAll('h2, .skill-tag').forEach(function(tag) {
        tag.classList.remove('dark_theme');
    });
}

