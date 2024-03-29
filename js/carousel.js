// carousel.js

export async function initializeCarousel() {
    let state = {
        posts: [],
        slideIndex: 1,
    };

    async function getLatestBlogPosts(numPosts) {
        const response = await fetch("https://www.tinakristiansen.no/wp-json/wp/v2/posts?_embed&per_page=" + numPosts);
        const posts = await response.json();
        return posts;
    }

    window.plusSlides = function (n) {
        showSlides(state.slideIndex += n);
    };

    window.currentSlide = function (n) {
        showSlides(state.slideIndex = n);
    };

    async function showSlides(n) {
        if (state.posts.length === 0) {
            state.posts = await getLatestBlogPosts(10);
        }

        const slideshowContainer = document.querySelector(".slideshowContainer");
        let slideHTML = '';

        state.posts.forEach(function (post, i) {
            const postUrl = `post.html?id=${encodeURIComponent(post.id)}`;
            slideHTML += `
                <div class="mySlides slide">
                    <a href="${postUrl}">
                        <img class="blogImage" src="${post._embedded["wp:featuredmedia"]["0"].source_url}" alt="${post.title.rendered}"/>
                    </a> 
                    <div class="text">
                        <a href="${postUrl}">
                            <h2>${post.title.rendered}</h2>
                            <p>${post.excerpt.rendered}</p>
                        </a>
                    </div>
                </div>`;
        });

        slideshowContainer.innerHTML = slideHTML;

        slideshowContainer.innerHTML += `
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        `;

        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {
            state.slideIndex = 1;
        }
        if (n < 1) {
            state.slideIndex = slides.length;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[state.slideIndex - 1].style.display = "block";
    }

    showSlides(state.slideIndex);
}
