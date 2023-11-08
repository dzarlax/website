export async function fetchRSSFeed() {
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
  