// carousel.js

export async function initializeCarousel() {
  const container = document.querySelector(".slideshowContainer");
 
  try {
    const response = await fetch("https://www.tinakristiansen.no/wp-json/wp/v2/posts?_embed&per_page=10");
    const posts = await response.json();
 
    container.innerHTML = `
      
      <ul class="carousel-track">
        ${posts.map(createCard).join("")}
      </ul>
 <div class="carousel-nav">
        <button class="carousel-btn prev" aria-label="Previous posts">&#10094;</button>
        <button class="carousel-btn next" aria-label="Next posts">&#10095;</button>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<p>Couldn't load posts. Try reloading the page.</p>`;
    return;
  }
 
  // The arrows just scroll the track one "page". CSS scroll-snap lines the cards up.
  const track = container.querySelector(".carousel-track");
  container.querySelector(".prev").addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth });
  });
  container.querySelector(".next").addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth });
  });
}

function createCard(post) {
  const postUrl = `post.html?id=${encodeURIComponent(post.id)}`;
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
 
  return `
    <li class="card">
      ${image ? `<img class="card-img" src="${image}" alt="" loading="lazy">` : `<div class="card-img"></div>`}
      <div class="card-text">
        <h3><a href="${postUrl}">${post.title.rendered}</a></h3>
        <div class="card-excerpt">${post.excerpt.rendered}</div>
      </div>
    </li>
  `;
}
