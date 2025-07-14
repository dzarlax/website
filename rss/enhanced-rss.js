import { paginateItems, goToPage, createPagination } from './pagination.js';
import { displayItems, displayPagination } from './display.js';
import { fetchRSSFeed } from './fetchRSSFeed.js';

class EnhancedRSSFeed {
    constructor(url, containerId) {
        this.rssUrl = url;
        this.container = document.getElementById(containerId);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.totalItems = 0;
        this.allItems = [];
        this.filteredItems = [];
        this.favorites = this.loadFavorites();
        this.searchTerm = '';
        this.dateFilter = 'all';
        this.autoUpdateInterval = null;
        this.cacheKey = 'rss_cache_' + btoa(url);
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
        
        // Bind methods
        this.fetchRSSFeed = this.fetchRSSFeedEnhanced.bind(this);
        this.paginateItems = paginateItems.bind(this);
        this.goToPage = goToPage.bind(this);
        this.createPagination = createPagination.bind(this);
        this.displayItems = displayItems.bind(this);
        this.displayPagination = displayPagination.bind(this);
        
        // Initialize
        this.initializeEventListeners();
        this.startAutoUpdate();
    }

    // Enhanced RSS fetching with caching
    async fetchRSSFeedEnhanced() {
        try {
            // Check cache first
            const cachedData = this.getCachedData();
            if (cachedData) {
                console.log('Loading from cache');
                this.processItems(cachedData);
                return;
            }

            const response = await fetch(this.rssUrl);
            const str = await response.text();
            const data = new window.DOMParser().parseFromString(str, "text/xml");
            const items = Array.from(data.querySelectorAll("item")).reverse();
            
            // Cache the data
            this.setCachedData(items);
            
            this.processItems(items);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
            this.showError('error_loading');
        }
    }

    // Process and filter items
    processItems(items) {
        this.allItems = items;
        this.applyFilters();
        this.totalItems = this.filteredItems.length;
        const paginatedItems = this.paginateItems(this.filteredItems);
        this.displayItems(paginatedItems);
    }

    // Apply search and date filters
    applyFilters() {
        let filtered = this.allItems;

        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(item => {
                const title = item.querySelector("title").textContent.toLowerCase();
                const description = item.querySelector("description").textContent.toLowerCase();
                return title.includes(this.searchTerm) || description.includes(this.searchTerm);
            });
        }

        // Apply date filter
        if (this.dateFilter !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (this.dateFilter) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
            }

            filtered = filtered.filter(item => {
                const pubDate = new Date(item.querySelector("pubDate").textContent);
                return pubDate >= filterDate;
            });
        }

        this.filteredItems = filtered;
    }

    // Cache management
    getCachedData() {
        const cached = localStorage.getItem(this.cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp < this.cacheExpiry) {
                // Convert cached HTML strings back to XML elements
                const parser = new DOMParser();
                return data.items.map(itemHtml => {
                    const xmlDoc = parser.parseFromString(itemHtml, 'text/xml');
                    return xmlDoc.documentElement;
                });
            }
        }
        return null;
    }

    setCachedData(items) {
        const cacheData = {
            items: items.map(item => item.outerHTML),
            timestamp: Date.now()
        };
        localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    }

    // Favorites management
    loadFavorites() {
        const favorites = localStorage.getItem('rss_favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    saveFavorites() {
        localStorage.setItem('rss_favorites', JSON.stringify(this.favorites));
    }

    toggleFavorite(link, title) {
        const index = this.favorites.findIndex(fav => fav.link === link);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push({ link, title, timestamp: Date.now() });
        }
        this.saveFavorites();
        this.updateFavoriteButton(link);
    }

    updateFavoriteButton(link) {
        const button = document.querySelector(`[data-link="${link}"]`);
        if (button) {
            const isFavorite = this.favorites.some(fav => fav.link === link);
            button.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
            button.classList.toggle('favorited', isFavorite);
        }
    }

    // UI initialization
    initializeUI() {
        // Create enhanced controls
        const controlsContainer = document.querySelector('.feed-controls');
        if (controlsContainer) {
            controlsContainer.innerHTML = `
                <div class="search-container">
                    <input type="text" id="search-input" placeholder="Поиск по новостям...">
                    <button id="search-button"><i class="fas fa-search"></i></button>
                </div>
                <div class="filter-container">
                    <label for="date-filter">Фильтр по дате:</label>
                    <select id="date-filter">
                        <option value="all">Все</option>
                        <option value="today">Сегодня</option>
                        <option value="week">За неделю</option>
                        <option value="month">За месяц</option>
                    </select>
                </div>
                <div class="view-controls">
                    <button id="show-favorites" class="view-button">
                        <i class="fas fa-heart"></i> Избранное
                    </button>
                    <button id="auto-update-toggle" class="view-button active">
                        <i class="fas fa-sync"></i> Авто-обновление
                    </button>
                </div>
            `;
        }
    }

    // Event listeners
    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.applyFilters();
                this.totalItems = this.filteredItems.length;
                const paginatedItems = this.paginateItems(this.filteredItems);
                this.displayItems(paginatedItems);
            });
        }

        // Date filter
        const dateFilter = document.getElementById('date-filter');
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                this.dateFilter = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.totalItems = this.filteredItems.length;
                const paginatedItems = this.paginateItems(this.filteredItems);
                this.displayItems(paginatedItems);
            });
        }

        // Favorites view
        const favoritesBtn = document.getElementById('show-favorites');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                this.showFavorites();
            });
        }

        // Auto-update toggle
        const autoUpdateBtn = document.getElementById('auto-update-toggle');
        if (autoUpdateBtn) {
            autoUpdateBtn.addEventListener('click', () => {
                this.toggleAutoUpdate();
            });
        }

        // Language change event
        document.addEventListener('languageChanged', () => {
            this.updateLocalizedContent();
        });
    }

    // Auto-update functionality
    startAutoUpdate() {
        this.autoUpdateInterval = setInterval(() => {
            this.fetchRSSFeed();
        }, 5 * 60 * 1000); // Update every 5 minutes
    }

    stopAutoUpdate() {
        if (this.autoUpdateInterval) {
            clearInterval(this.autoUpdateInterval);
            this.autoUpdateInterval = null;
        }
    }

    toggleAutoUpdate() {
        const button = document.getElementById('auto-update-toggle');
        if (this.autoUpdateInterval) {
            this.stopAutoUpdate();
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-sync"></i> Авто-обновление: ВЫКЛ';
        } else {
            this.startAutoUpdate();
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-sync"></i> Авто-обновление: ВКЛ';
        }
    }

    // Set date filter
    setDateFilter(filter) {
        this.dateFilter = filter;
        this.currentPage = 1;
        this.applyFilters();
        this.totalItems = this.filteredItems.length;
        const paginatedItems = this.paginateItems(this.filteredItems);
        this.displayItems(paginatedItems);
    }

    // Set show favorites only
    setShowFavoritesOnly(showOnly) {
        if (showOnly) {
            this.showFavorites();
        } else {
            this.currentPage = 1;
            this.applyFilters();
            this.totalItems = this.filteredItems.length;
            const paginatedItems = this.paginateItems(this.filteredItems);
            this.displayItems(paginatedItems);
        }
    }

    // Set auto update
    setAutoUpdate(enabled) {
        if (enabled) {
            this.startAutoUpdate();
        } else {
            this.stopAutoUpdate();
        }
    }

    // Show favorites
    showFavorites() {
        if (this.favorites.length === 0) {
            this.container.innerHTML = '<p>Пока нет избранных статей. Добавьте новости в избранное!</p>';
            return;
        }

        let html = '<ul class="news-list favorites-list">';
        this.favorites.forEach(fav => {
            html += `
                <li class="news-item favorite-item">
                    <div class="news-content">
                        <h2 class="news-title">
                            <a href="./rss/articles/article.html?link=${encodeURIComponent(fav.link)}&title=${encodeURIComponent(fav.title)}" class="news-link">
                                ${fav.title}
                            </a>
                        </h2>
                        <div class="news-meta">
                            <span class="favorite-date">Добавлено: ${new Date(fav.timestamp).toLocaleDateString()}</span>
                            <button class="remove-favorite" onclick="rssFeed.toggleFavorite('${fav.link}', '${fav.title}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </li>
            `;
        });
        html += '</ul>';
        html += '<button onclick="rssFeed.fetchRSSFeed()" class="back-to-all">Вернуться ко всем новостям</button>';
        
        this.container.innerHTML = html;
    }

    // Update localized content
    // Error handling
    showError(message) {
        const errorMessages = {
            'error_loading': 'Не удалось загрузить ленту новостей',
            'error_article': 'Новость не найдена',
            'no_items': 'Нет доступных новостей'
        };
        
        const errorText = errorMessages[message] || 'Произошла ошибка при загрузке';
        
        this.container.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <p>${errorText}</p>
            </div>
        `;
    }

    // Cleanup
    destroy() {
        this.stopAutoUpdate();
        // Remove event listeners if needed
    }
}

export default EnhancedRSSFeed; 