// Function to fetch and display latest news
async function displayLatestNews() {
    const container = document.getElementById('news-preview-container');
    if (!container) return;

    const currentLang = localStorage.getItem('preferredLanguage') || 'en';

    try {
        // Use the correct global feed URL
        const feedUrl = 'https://s3.dzarlax.dev/articles/feed_300.xml';
        // Note: The feed is currently single-language (Russian/Mixed). 
        // In a real scenario, we would check for localized feeds or filter items.

        const response = await fetch(feedUrl);
        if (!response.ok) throw new Error(`Failed to fetch feed: ${response.status}`);

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        // Clear loading state
        container.innerHTML = '';

        // Display up to 3 items
        const maxItems = 3;
        const displayCount = Math.min(items.length, maxItems);

        if (displayCount === 0) {
            container.innerHTML = '<p>No news available.</p>';
            return;
        }

        for (let i = 0; i < displayCount; i++) {
            const item = items[i];
            const title = item.querySelector("title")?.textContent || 'No Title';
            const description = item.querySelector("description")?.textContent || '';
            const pubDate = item.querySelector("pubDate")?.textContent || '';
            const link = item.querySelector("link")?.textContent || '#';

            // Format date
            const dateObj = new Date(pubDate);
            const formattedDate = dateObj.toLocaleDateString(currentLang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create card
            const card = document.createElement('div');
            card.className = 'news-card';
            card.style.setProperty('--i', i + 1);

            // Clean description (remove HTML tags and truncate)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            let cleanDesc = tempDiv.textContent || tempDiv.innerText || '';
            if (cleanDesc.length > 100) cleanDesc = cleanDesc.substring(0, 100) + '...';

            card.innerHTML = `
                <div class="news-date">${formattedDate}</div>
                <h3 class="news-title">${title}</h3>
                <p class="news-excerpt">${cleanDesc}</p>
                <a href="${link}" class="news-link">
                    <span data-lang="read_more">Read More</span> <i class="fas fa-arrow-right"></i>
                </a>
            `;

            container.appendChild(card);
        }

        // Update translations for the new elements
        if (typeof updateLocalizedContent === 'function') {
            updateLocalizedContent();
        }

    } catch (error) {
        console.error('Error loading news preview:', error);
        container.innerHTML = '<p>Failed to load news.</p>';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', displayLatestNews);

// Reload when language changes
document.addEventListener('languageChanged', displayLatestNews);
