import { paginateItems, goToPage, createPagination } from './pagination.js';
import { displayItems, displayPagination } from './display.js';
import { fetchRSSFeed } from './fetchRSSFeed.js';

class RSSFeed {
  constructor(url, containerId) {
    this.rssUrl = url;
    this.container = document.getElementById(containerId);
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalItems = 0;

    this.fetchRSSFeed = fetchRSSFeed.bind(this);
    this.paginateItems = paginateItems.bind(this);
    this.goToPage = goToPage.bind(this);
    this.createPagination = createPagination.bind(this);
    this.displayItems = displayItems.bind(this);
    this.displayPagination = displayPagination.bind(this);
  }
}

export default RSSFeed;
