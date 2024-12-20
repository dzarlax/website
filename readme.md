# Репозиторий сайта

## Обзор
Этот репозиторий содержит исходный код веб-сайта, управляемого Алексеем Панфиловым (dzarlax). Кодовая база включает файлы HTML, CSS и JavaScript.

## Последние обновления
Последнее обновление с названием "Оптимизация под мобильные" включает улучшения для более корректной мобильной адаптивности.

## Особенности
- Поддержка локализации для возможности многоязычности.
- Функция изменения цвета и кнопка новостной ленты для динамического взаимодействия с пользователем.
- RSS-ридер для обновления ленты новостей в реальном времени.
- Оптимизация тёмной темы в соответствии с предпочтениями пользователя.

## Структура файлов
- `index.html`: Основной HTML-файл сайта.
- `style.css`: Таблица стилей, содержащая элементы визуального дизайна.
В папке `web` содержатся следующие файлы:
- `theme.js`: Управление темной/светлой темами сайта
- `localization.js`: Динамические тексты и локализация.
- `contacts.js`: Описание кнопок внизу старницы
- `щзешьшяфешщт.js`: Оптимизации скорости
- `feed.css`: Дополнительные CSS-стили для оформления новостной ленты.
- `header.jpg`: Изображение заголовка, используемое на сайте.

# RSS reader
## Структура файлов
В папке `rss` содержатся следующие файлы:
- `RSSFeed.js`: Основной класс, управляющий функциональностью RSS-ленты.
- `fetchRSSFeed.js`: Функция для загрузки и обработки данных RSS-ленты.
- `pagination.js`: Функции для пагинации ленты.
- `display.js`: Функции для отображения элементов ленты.
- `init.js`: Инициализационный скрипт, который запускает функционал ленты.

## Использование
Чтобы использовать функционал RSS-ленты на вашем сайте, вам необходимо включить следующий тег скрипта в ваш HTML-файл:
```html
<script type="module" src="rss/init.js"></script>
```
Это подключит и инициализирует класс RSSFeed, который автоматически загрузит и отобразит RSS-ленту в элементе с ID rss-feed.

## Инициализация

После загрузки DOM, скрипт создает экземпляр RSSFeed и запускает процесс загрузки ленты:

```
document.addEventListener('DOMContentLoaded', () => {
  const rssFeed = new RSSFeed('URL_вашей_RSS_ленты', 'ID_контейнера_для_ленты');
  rssFeed.fetchRSSFeed();
});
```
Замените URL_вашей_RSS_ленты на URL вашей RSS-ленты и ID_контейнера_для_ленты на ID элемента, где должна отображаться лента.
