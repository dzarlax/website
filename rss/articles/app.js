document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const link = params.get('link'); // Получение ссылки из URL

    if (link) {
        fetchNews(link);
    } else {
        document.getElementById('news-content').innerText = 'Ссылка на новость не найдена.';
    }
});

function fetchNews(link) {
    const rssUrl = 'https://s333.dzarlax.dev/articles/feed_300.xml'; // Замените на URL вашей RSS ленты
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

                    document.getElementById('news-content').innerHTML = `<h2>${title}</h2><p>${description}</p>`;
                    found = true;
                }
            });

            if (!found) {
                document.getElementById('news-content').innerText = 'Новость не найдена в ленте.';
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('news-content').innerText = 'Ошибка при загрузке новостей.';
        });
}
