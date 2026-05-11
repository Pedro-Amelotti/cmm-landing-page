(() => {
  const track = document.getElementById("colab-track");
  const btnPrev = document.getElementById("colab-prev");
  const btnNext = document.getElementById("colab-next");

  if (!track || !btnPrev || !btnNext) return;

  let scrollStep = 260;
  const mobileBreakpoint = 900;

  function medirPasso() {
    const firstCard = track.querySelector(".colab-card");
    if (!firstCard) return;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    scrollStep = firstCard.getBoundingClientRect().width + gap;
  }

  function updateArrows() {
    const isMobile = window.innerWidth <= mobileBreakpoint;
    if (isMobile) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
      return;
    }

    const isScrollable = track.scrollWidth > track.clientWidth + 2;
    btnPrev.style.display = isScrollable ? "grid" : "none";
    btnNext.style.display = isScrollable ? "grid" : "none";
  }

  function centerTrackOnDesktop() {
    const isMobile = window.innerWidth <= mobileBreakpoint;
    if (isMobile) {
      track.scrollLeft = 0;
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) {
      track.scrollLeft = maxScroll / 2;
    } else {
      track.scrollLeft = 0;
    }
  }

  btnNext.addEventListener("click", () => {
    track.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    track.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  const recalc = () => {
    medirPasso();
    updateArrows();
    centerTrackOnDesktop();
  };

  window.addEventListener("load", recalc);
  window.addEventListener("resize", recalc);
})();
