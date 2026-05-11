(() => {
  const swiperRoot = document.getElementById("colab-swiper");
  const track = document.getElementById("colab-track");
  const prevBtn = document.getElementById("colab-prev");
  const nextBtn = document.getElementById("colab-next");

  if (!swiperRoot || !track || !prevBtn || !nextBtn) return;

  const paginationEl = swiperRoot.querySelector(".colab-pagination");

  if (typeof Swiper === "undefined") return;

  const swiper = new Swiper(swiperRoot, {
    loop: false,
    autoplay: false,
    watchOverflow: true,
    slidesPerView: 1.2,
    slidesPerGroup: 1,
    spaceBetween: 16,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
      disabledClass: "is-disabled",
      lockClass: "is-locked",
    },
    breakpoints: {
      900: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
    },
  });

  const syncNavState = () => {
    prevBtn.classList.toggle("is-disabled", swiper.isBeginning);
    nextBtn.classList.toggle("is-disabled", swiper.isEnd);
  };

  syncNavState();
  swiper.on("slideChange", syncNavState);
  swiper.on("resize", syncNavState);
  swiper.on("reachBeginning", syncNavState);
  swiper.on("reachEnd", syncNavState);
  swiper.on("fromEdge", syncNavState);
})();
