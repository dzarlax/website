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
- `theme.js`, `localization.js`, `feed.js`: JavaScript-файлы, добавляющие интерактивность и динамическое содержание на сайт.
- `feed.css`: Дополнительные CSS-стили для оформления новостной ленты.
- `header.jpg`: Изображение заголовка, используемое на сайте.

# Feed.js
## RSSFeed JavaScript Class

### Описание
`RSSFeed` - это класс JavaScript, предназначенный для загрузки, анализа и отображения данных RSS-ленты на веб-странице. Этот класс обеспечивает динамическое взаимодействие с RSS-лентой и позволяет пагинацию содержимого ленты.

### Конструктор
- `constructor(url, containerId)`: Инициализирует новый экземпляр класса `RSSFeed` с указанным URL-адресом RSS-ленты и ID контейнера для отображения элементов ленты.
  - `url`: URL RSS-ленты для загрузки.
  - `containerId`: ID DOM-элемента, куда будут выводиться данные ленты.
  - `currentPage`: Текущая страница пагинации (начинается с 1).
  - `itemsPerPage`: Количество элементов RSS-ленты, отображаемых на одной странице.
  - `totalItems`: Общее количество элементов в RSS-ленте.

### Методы
- `async fetchRSSFeed()`: Асинхронный метод для загрузки и обработки RSS-ленты. Использует `fetch` API для получения данных и `DOMParser` для их анализа.
- `paginateItems(items)`: Возвращает срез элементов для текущей страницы, учитывая количество элементов на странице.
- `goToPage(pageNumber)`: Меняет текущую страницу на указанную и перезагружает содержимое ленты.
- `createPagination()`: Создает HTML-разметку для пагинации, основываясь на общем количестве элементов и элементах на странице.
- `displayItems(items)`: Отображает элементы RSS-ленты в указанном контейнере и добавляет пагинацию.
- `displayPagination()`: Добавляет созданную пагинацию к контейнеру.

### Инициализация
Класс `RSSFeed` инициализируется и используется в следующем коде:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  rssFeed = new RSSFeed('https://s3.dzarlax.dev/feed_300.xml', 'rss-feed');
  rssFeed.fetchRSSFeed();
});
```

Этот код создает экземпляр класса RSSFeed после полной загрузки DOM-документа и начинает процесс загрузки и отображения данных RSS-ленты.

Использование
Для использования класса RSSFeed в вашем проекте, вам необходимо включить файл feed.js в ваш HTML-документ и создать контейнер с соответствующим id, который будет использоваться для отображения элементов ленты.
