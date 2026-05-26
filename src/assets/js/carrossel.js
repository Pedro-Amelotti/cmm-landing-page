(() => {
  const swiperRoot = document.getElementById("carrossel-swiper");
  const track = document.getElementById("carrossel-track");
  const prevBtn = document.querySelector(".carrossel .prev");
  const nextBtn = document.querySelector(".carrossel .next");

  if (!swiperRoot || !track || !prevBtn || !nextBtn) return;

  const paginationEl = swiperRoot.querySelector(".carrossel-pagination");
  const source = swiperRoot.dataset.source || "../assets/data/carrossel/pt.json";
  const errorMessage =
    swiperRoot.dataset.errorMessage || "Unable to load images.";
  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  fetch(source)
    .then((res) => {
      if (!res.ok) throw new Error("Unable to load carousel data.");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || !data.length) {
        throw new Error("Carousel data is empty.");
      }

      track.innerHTML = data
        .map((item) => {
          const hasButton = item.buttonLabel && item.buttonUrl;
          const buttonHtml = hasButton
            ? `<a class="carrossel-link-btn" href="${escapeHtml(item.buttonUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.buttonLabel)}</a>`
            : "";

          return `
      <div class="card swiper-slide">
        <img src="${escapeHtml(item.imagem)}" alt="${escapeHtml(item.titulo)}" loading="lazy">
        <div class="card-content">
          <h3>${escapeHtml(item.titulo)}</h3>
          <p>${escapeHtml(item.descricao)}</p>
          ${buttonHtml}
        </div>
      </div>
      `;
        })
        .join("");

      if (typeof Swiper === "undefined") {
        throw new Error("Swiper is not available.");
      }

      const swiper = new Swiper(swiperRoot, {
        loop: false,
        autoplay: false,
        watchOverflow: true,
        slidesPerView: 1,
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
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 28,
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
    })
    .catch(() => {
      track.innerHTML = `<p class="error-carrossel">${errorMessage}</p>`;
      if (paginationEl) paginationEl.remove();
      prevBtn.classList.add("is-locked");
      nextBtn.classList.add("is-locked");
    });
})();
