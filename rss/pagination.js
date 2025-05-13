export function paginateItems(items) {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return items.slice(start, end);
}

export function goToPage(pageNumber) {
  // Store the current page in URL parameters for better navigation
  const url = new URL(window.location.href);
  url.searchParams.set('page', pageNumber);
  window.history.pushState({page: pageNumber}, '', url);
  
  this.currentPage = pageNumber;
  this.fetchRSSFeed();
}

export function createPagination() {
  const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
  
  // If there's only one page, don't show pagination
  if (pageCount <= 1) {
    return '';
  }
  
  let paginationHTML = '<div class="pagination">';
  
  // Add previous page button
  const prevDisabled = this.currentPage === 1 ? 'disabled' : '';
  paginationHTML += `
    <button class="pagination-nav ${prevDisabled}" 
            onclick="rssFeed.goToPage(${this.currentPage - 1})" 
            ${prevDisabled}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  
  // Calculate range of pages to show
  let startPage = Math.max(1, this.currentPage - 2);
  let endPage = Math.min(pageCount, startPage + 4);
  
  // Adjust if we're near the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  // Add first page and ellipsis if needed
  if (startPage > 1) {
    paginationHTML += `<button onclick="rssFeed.goToPage(1)">1</button>`;
    if (startPage > 2) {
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
    }
  }
  
  // Add page buttons
  for (let i = startPage; i <= endPage; i++) {
    const activeClass = this.currentPage === i ? 'active' : '';
    paginationHTML += `<button class="${activeClass}" onclick="rssFeed.goToPage(${i})">${i}</button>`;
  }
  
  // Add last page and ellipsis if needed
  if (endPage < pageCount) {
    if (endPage < pageCount - 1) {
      paginationHTML += `<span class="pagination-ellipsis">...</span>`;
    }
    paginationHTML += `<button onclick="rssFeed.goToPage(${pageCount})">${pageCount}</button>`;
  }
  
  // Add next page button
  const nextDisabled = this.currentPage === pageCount ? 'disabled' : '';
  paginationHTML += `
    <button class="pagination-nav ${nextDisabled}" 
            onclick="rssFeed.goToPage(${this.currentPage + 1})" 
            ${nextDisabled}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  
  paginationHTML += '</div>';
  
  // Add page info
  paginationHTML += `
    <div class="pagination-info">
      Страница ${this.currentPage} из ${pageCount} (${this.totalItems} новостей)
    </div>
  `;
  
  return paginationHTML;
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    rssFeed.currentPage = event.state.page;
    rssFeed.fetchRSSFeed();
  }
});

// Check for page parameter in URL on load
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  
  if (pageParam && !isNaN(pageParam) && window.rssFeed) {
    const pageNumber = parseInt(pageParam);
    if (pageNumber > 0) {
      window.rssFeed.currentPage = pageNumber;
    }
  }
});
