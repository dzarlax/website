document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link'); // Получение ссылки из URL

    if (link) {
        fetchNews(link);
    } else {
        const newsContent = document.getElementById('news-content');
        newsContent.innerText = 'Ссылка на новость не найдена.';
        newsContent.classList.remove('loading');
    }
});

function fetchNews(link) {
    const rssUrl = 'https://s3.dzarlax.dev/articles/feed_300.xml'; // Замените на URL вашей RSS ленты
    const fullUrl = rssUrl;

    fetch(fullUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            let found = false;

            items.forEach(item => {
                const itemLink = item.querySelector("link").textContent;

                if (itemLink === link) {
                    const title = item.querySelector("title").textContent;
                    const description = item.querySelector("description").textContent;

                    const newsContent = document.getElementById('news-content');
                    newsContent.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
                    newsContent.classList.remove('loading');
                    found = true;
                }
            });

            if (!found) {
                const newsContent = document.getElementById('news-content');
                newsContent.innerText = 'Новость не найдена в ленте.';
                newsContent.classList.remove('loading');
            }
        })
        .catch(err => {
            console.error(err);
            const newsContent = document.getElementById('news-content');
            newsContent.innerText = 'Ошибка при загрузке новостей.';
            newsContent.classList.add('error');
            newsContent.classList.remove('loading');
        });
}
