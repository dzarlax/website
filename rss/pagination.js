export function paginateItems(items) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }
  
  export function goToPage(pageNumber) {
    this.currentPage = pageNumber;
    this.fetchRSSFeed().then(() => {
      window.scrollTo(0, 0);
    });
  }
  
  export function createPagination() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    let paginationHTML = '<div class="pagination">';
    
    for (let i = 1; i <= pageCount; i++) {
      const activeClass = this.currentPage === i ? 'active' : '';
      paginationHTML += `<button class="${activeClass}" onclick="rssFeed.goToPage(${i})">${i}</button>`;
    }
    
    paginationHTML += '</div>';
    return paginationHTML;
  }
  