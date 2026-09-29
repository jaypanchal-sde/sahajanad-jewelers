const collectionCards = document.querySelectorAll(".collection-card");

const marquee = document.querySelector(".top-marquee");
const closeMarquee = marquee?.querySelector(".close");

closeMarquee?.addEventListener("click", () => {
    marquee.hidden = true;
});

collectionCards.forEach(card => {
    const video = card.querySelector("video");
    const img = card.querySelector("img");
    const videoSrc = video.dataset.src;

    if (videoSrc) {
        video.removeAttribute("src");
        video.removeAttribute("preload");
        video.load();
    }

    card.addEventListener("mouseenter", () => {
        if (videoSrc && !video.src) {
            video.src = videoSrc;
            video.load();
        }

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                // autoplay may be blocked; keeping hover visual behavior
            });
        }
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

    const exploreBtn = card.querySelector(".explore-btn");
    exploreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        exploreBtn.classList.remove("clicked");
        void exploreBtn.offsetWidth;
        exploreBtn.classList.add("clicked");
    });
});

const reelCards = document.querySelectorAll(".reel-card");

const playReel = card => {
    const video = card.querySelector(".reel-video");
    if (!video) return;

    if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(() => card.classList.add("is-playing")).catch(() => {
            card.classList.remove("is-playing");
        });
    }
};

if ("IntersectionObserver" in window) {
    const reelObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const video = entry.target.querySelector(".reel-video");
            if (!video) return;

            if (entry.isIntersecting) {
                playReel(entry.target);
            } else {
                video.pause();
                video.currentTime = 0;
                entry.target.classList.remove("is-playing");
            }
        });
    }, { threshold: 0.5 });

    reelCards.forEach(card => reelObserver.observe(card));
} else {
    reelCards.forEach(playReel);
}

const reviewTrack = document.querySelector(".review-grid");

if (reviewTrack) {
    document.querySelectorAll("[data-review-direction]").forEach(button => {
        button.addEventListener("click", () => {
            const reviewCard = reviewTrack.querySelector(".review-card");
            const gap = Number.parseFloat(getComputedStyle(reviewTrack).gap) || 0;
            const distance = reviewCard.getBoundingClientRect().width + gap;
            const direction = Number(button.dataset.reviewDirection);

            reviewTrack.scrollBy({ left: distance * direction });
        });
    });
}
