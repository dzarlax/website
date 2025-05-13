document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link'); // Получение ссылки из URL

    if (link) {
        fetchNews(link);
    } else {
        showError('Ссылка на новость не найдена.');
    }
    
    // Set page title based on URL parameters
    const title = params.get('title');
    if (title) {
        document.title = `${title} - Dzarlax News`;
    }
});

function fetchNews(link) {
    const rssUrl = 'https://s3.dzarlax.dev/articles/feed_300.xml';
    
    fetch(rssUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            let found = false;

            items.forEach(item => {
                const itemLink = item.querySelector("link").textContent;

                if (itemLink === link) {
                    const title = item.querySelector("title").textContent;
                    const description = item.querySelector("description").textContent;
                    const pubDate = new Date(item.querySelector("pubDate").textContent);
                    
                    // Format the date
                    const formattedDate = formatDate(pubDate);
                    
                    // Update document title
                    document.title = `${title} - Dzarlax News`;
                    
                    // Process the description to enhance images and formatting
                    const enhancedDescription = enhanceContent(description);
                    
                    const newsContent = document.getElementById('news-content');
                    newsContent.innerHTML = `
                        <h2>${title}</h2>
                        <div class="article-meta">
                            <span class="article-date">${formattedDate}</span>
                        </div>
                        <div class="article-content">${enhancedDescription}</div>
                    `;
                    newsContent.classList.remove('loading');
                    found = true;
                }
            });

            if (!found) {
                showError('Новость не найдена в ленте.');
            }
        })
        .catch(err => {
            console.error('Ошибка при загрузке новостей:', err);
            showError('Ошибка при загрузке новостей. Пожалуйста, попробуйте позже.');
        });
}

function enhanceContent(htmlContent) {
    // Create a temporary div to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Enhance images
    tempDiv.querySelectorAll('img').forEach(img => {
        // Remove unwanted images
        if (img.src === "https://yastatic.net/s3/distribution/stardust/browser-summary-web/1.9.0/_app/immutable/assets/link.97114a7f.svg") {
            img.remove();
        } else {
            // Add loading="lazy" for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add click to enlarge functionality
            img.onclick = function() {
                this.classList.toggle('enlarged');
            };
            
            // Wrap image in a figure with caption if alt text exists
            if (img.alt && !img.closest('figure')) {
                const figure = document.createElement('figure');
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = img.alt;
                
                img.parentNode.insertBefore(figure, img);
                figure.appendChild(img);
                figure.appendChild(figcaption);
            }
        }
    });
    
    // Enhance links to open in new tab
    tempDiv.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    return tempDiv.innerHTML;
}

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

function showError(message) {
    const newsContent = document.getElementById('news-content');
    newsContent.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button onclick="goToFeed()">Вернуться к ленте новостей</button>
        </div>
    `;
    newsContent.classList.remove('loading');
}
