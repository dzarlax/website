export function displayItems(items) {
  // Convert NodeList to array for easier sorting
  items = Array.from(items);

  // Sort items by publication date (newest first)
  items.sort((a, b) => {
    let dateA = new Date(a.querySelector("pubDate").textContent);
    let dateB = new Date(b.querySelector("pubDate").textContent);
    return dateB - dateA;
  });
  
  // Remove loading state
  this.container.classList.remove('loading');
  
  // If no items found
  if (items.length === 0) {
    this.container.innerHTML = `
      <div class="no-items">
        <i class="fas fa-newspaper"></i>
        <p>Нет доступных новостей</p>
      </div>
    `;
    return;
  }
  
  let html = '<ul class="news-list">';
  
  items.forEach(el => {
    // Extract data from RSS item
    const title = el.querySelector("title").textContent;
    const link = el.querySelector("link").textContent;
    const description = el.querySelector("description").textContent;
    const pubDate = new Date(el.querySelector("pubDate").textContent);
    
    // Format the date in Russian locale
    const formattedDate = formatDate(pubDate);
    
    // Process description to extract first image and clean text
    const { firstImage, cleanDescription, hasImages } = processDescription(description);
    
    // Create excerpt (first 150 characters)
    const excerpt = createExcerpt(cleanDescription, 150);
    
    // Build the HTML for this item
    html += `
      <li class="news-item ${hasImages ? 'has-image' : ''}">
        <div class="news-content">
          <h2 class="news-title">
            <a href="./rss/articles/article.html?link=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}" class="news-link">
              ${title}
            </a>
          </h2>
          <div class="news-meta">
            <span class="news-date">${formattedDate}</span>
          </div>
          ${firstImage ? `<div class="news-image-container"><img src="${firstImage}" alt="${title}" class="rss-image" loading="lazy"></div>` : ''}
          <div class="news-excerpt">${excerpt}</div>
          <a href="./rss/articles/article.html?link=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}" class="read-more">
            Читать полностью <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </li>
    `;
  });
  
  html += '</ul>';
  this.container.innerHTML = html;
  this.displayPagination();
  
  // Add event listeners for image error handling
  document.querySelectorAll('.rss-image').forEach(img => {
    img.onerror = function() {
      this.style.display = 'none';
      this.parentElement.classList.add('image-error');
    };
  });
}

export function displayPagination() {
  const paginationHTML = this.createPagination();
  
  // Create a container for pagination if it doesn't exist
  let paginationContainer = document.querySelector('.pagination-container');
  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    this.container.parentNode.insertBefore(paginationContainer, this.container.nextSibling);
  }
  
  paginationContainer.innerHTML = paginationHTML;
  
  // Scroll to top when pagination is used
  document.querySelectorAll('.pagination button').forEach(button => {
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
}

// Helper function to format date
function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleDateString('ru-RU', options);
}

// Helper function to process description
function processDescription(htmlContent) {
  // Create a temporary div to manipulate the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find and remove unwanted images
  tempDiv.querySelectorAll('img').forEach(img => {
    if (img.src === "https://yastatic.net/s3/distribution/stardust/browser-summary-web/1.9.0/_app/immutable/assets/link.97114a7f.svg") {
      img.remove();
    } else {
      img.classList.add('rss-image');
    }
  });
  
  // Get the first image if it exists
  const images = tempDiv.querySelectorAll('img');
  const firstImage = images.length > 0 ? images[0].src : null;
  
  // If we're using the first image in the card, remove it from the description
  if (firstImage && images[0].parentNode) {
    images[0].parentNode.removeChild(images[0]);
  }
  
  // Clean up the description
  const cleanDescription = tempDiv.innerHTML;
  
  return {
    firstImage,
    cleanDescription,
    hasImages: images.length > 0
  };
}

// Helper function to create excerpt
function createExcerpt(html, maxLength) {
  // Create a temporary div to extract text
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // Trim and limit to maxLength
  text = text.trim();
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  
  return text;
}
