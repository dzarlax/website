export function displayItems(items) {
  let html = '<ul>';
  items.forEach(el => {
    // Extract the title, description, and publication date from the RSS item
    let title = el.querySelector("title").textContent;
    let description = el.querySelector("description").textContent;
    let pubDate = new Date(el.querySelector("pubDate").textContent).toLocaleString(); // This will format the date and time

    // Create a div element to manipulate the HTML description
    let div = document.createElement('div');
    div.innerHTML = description;

    // Remove unwanted images and add a class to the others
    div.querySelectorAll('img').forEach(img => {
      if (img.src === "https://yastatic.net/s3/distribution/stardust/browser-summary-web/1.9.0/_app/immutable/assets/link.97114a7f.svg") {
        img.remove();
      } else {
        img.classList.add('rss-image');
      }
    });

    // Update the description after image manipulation
    description = div.innerHTML;

    // Add the title, formatted description, and publication date to the HTML string
    html += `<li><h2>${title}</h2><h4>${pubDate}</h4><p>${description}</p></li>`;
  });
  html += '</ul>';
  this.container.innerHTML = html;
  this.displayPagination();
}

  
  export function displayPagination() {
    this.container.innerHTML += this.createPagination();
  }
  