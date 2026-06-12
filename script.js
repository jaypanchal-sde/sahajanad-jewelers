const collectionCards = document.querySelectorAll(".collection-card");

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
