export function displayItems(items) {
    let html = '<ul>';
    items.forEach(el => {
      let description = el.querySelector("description").textContent;
      let div = document.createElement('div');
      div.innerHTML = description;
  
      div.querySelectorAll('img').forEach(img => {
        if (img.src === "https://yastatic.net/s3/distribution/stardust/browser-summary-web/1.9.0/_app/immutable/assets/link.97114a7f.svg") {
          img.remove();
        } else {
          img.classList.add('rss-image');
        }
      });
  
      description = div.innerHTML;
      html += `<li><h2>${el.querySelector("title").textContent}</h2><p>${description}</p></li>`;
    });
    html += '</ul>';
    this.container.innerHTML = html;
    this.displayPagination();
  }
  
  export function displayPagination() {
    this.container.innerHTML += this.createPagination();
  }
  