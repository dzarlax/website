class RSSFeed {
  constructor(url, containerId) {
    this.rssUrl = url;
    this.container = document.getElementById(containerId);
    this.currentPage = 1;
    this.itemsPerPage = 10; // Задайте количество элементов на странице
    this.totalItems = 0;
  }

  async fetchRSSFeed() {
    try {
      const response = await fetch(this.rssUrl);
      const str = await response.text();
      const data = new window.DOMParser().parseFromString(str, "text/xml");
      let items = Array.from(data.querySelectorAll("item")).reverse();
      this.totalItems = items.length;
      const paginatedItems = this.paginateItems(items);
      this.displayItems(paginatedItems);
    } catch (error) {
      console.error('Ошибка при получении RSS ленты:', error);
      this.container.innerHTML = 'Не удалось загрузить ленту.';
    }
  }

  paginateItems(items) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }

  goToPage(pageNumber) {
    this.currentPage = pageNumber;
    this.fetchRSSFeed().then(() => {
      // После обновления содержимого, возвращаем пользователя к началу страницы
      window.scrollTo(0, 0);
    });
  }

  createPagination() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    let paginationHTML = '<div class="pagination">';

    for (let i = 1; i <= pageCount; i++) {
      const activeClass = this.currentPage === i ? 'active' : '';
      paginationHTML += `<button class="${activeClass}" onclick="rssFeed.goToPage(${i})">${i}</button>`;
    }

    paginationHTML += '</div>';
    return paginationHTML;
  }

  displayItems(items) {
    let html = '<ul>';
    items.forEach(el => {
      let description = el.querySelector("description").textContent;
      let div = document.createElement('div');
      div.innerHTML = description;

      div.querySelectorAll('img').forEach(img => {
        if (img.src === "https://yastatic.net/s3/distribution/stardust/browser-summary-web/1.9.0/_app/immutable/assets/link.97114a7f.svg") {
          img.remove();
        } else {
          img.classList.add('rss-image');
        }
      });

      description = div.innerHTML;

      html += `<li><h2>${el.querySelector("title").textContent}</h2><p>${description}</p></li>`;
    });
    html += '</ul>';

    // Переносим вызов метода displayPagination() сюда, чтобы он выполнялся один раз после отображения элементов
    this.container.innerHTML = html;
    this.displayPagination();
  }

  displayPagination() {
    this.container.innerHTML += this.createPagination();
  }
}

// Объявляем глобальную переменную для хранения экземпляра класса RSSFeed
let rssFeed;

// Функция для запуска после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  rssFeed = new RSSFeed('https://s3.dzarlax.dev/feed_300.xml', 'rss-feed');
  rssFeed.fetchRSSFeed();
});
