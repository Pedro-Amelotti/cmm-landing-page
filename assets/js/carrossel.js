(() => {
  const track = document.getElementById("carrossel-track");
  const prevBtn = document.querySelector(".carrossel .prev");
  const nextBtn = document.querySelector(".carrossel .next");
  if (!track || !prevBtn || !nextBtn) return;

  let autoPlayInterval;
  let cardStep = 0;
  let hasLoop = false;
  let gap = 0;
  let cardsData = [];

  fetch("assets/data/carrossel.json")
    .then((res) => res.json())
    .then((data) => {
      cardsData = data;
      montarBase();
      medir();
      configurarLoop();
      iniciarSePreciso();
      prevBtn.addEventListener("click", () => moverCarrossel(-1));
      nextBtn.addEventListener("click", () => moverCarrossel(1));
      track.addEventListener("mouseenter", pararAutoPlay);
      track.addEventListener("mouseleave", iniciarSePreciso);
      window.addEventListener("resize", () => {
        medir();
        configurarLoop();
        iniciarSePreciso();
      });
    })
    .catch(() => {
      track.innerHTML = '<p class="error-carrossel">Não foi possível carregar as imagens.</p>';
    });

  function criarCard(item, isClone = false) {
    const card = document.createElement("div");
    card.className = "card";
    if (isClone) card.dataset.clone = "true";
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}">
      <div class="card-content">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      </div>
    `;
    return card;
  }

  function montarBase() {
    track.innerHTML = "";
    cardsData.forEach((item) => track.appendChild(criarCard(item)));
  }

  function removerClones() {
    track.querySelectorAll("[data-clone]").forEach((clone) => clone.remove());
  }

  function medir() {
    const styles = getComputedStyle(track);
    gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const firstRealCard = track.querySelector(".card:not([data-clone])");
    cardStep = firstRealCard ? firstRealCard.getBoundingClientRect().width + gap : 0;
  }

  function configurarLoop() {
    if (cardStep <= 0 || !cardsData.length) return;
    removerClones();

    const totalLarguraReal = cardStep * cardsData.length;
    const precisaLoop = totalLarguraReal - track.clientWidth >= cardStep;
    hasLoop = precisaLoop;

    if (hasLoop) {
      const primeiroClone = criarCard(cardsData[0], true);
      const ultimoClone = criarCard(cardsData[cardsData.length - 1], true);
      track.insertBefore(ultimoClone, track.firstChild);
      track.appendChild(primeiroClone);
      track.scrollLeft = cardStep;
      track.addEventListener("scroll", verificarLoop);
    } else {
      track.removeEventListener("scroll", verificarLoop);
      track.scrollLeft = 0;
    }
  }

  function verificarLoop() {
    if (!hasLoop) return;
    const cloneEnd = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft <= 1) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft = track.scrollWidth - 2 * cardStep;
      requestAnimationFrame(() => (track.style.scrollBehavior = "smooth"));
    }

    if (track.scrollLeft >= cloneEnd - 1) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft = cardStep;
      requestAnimationFrame(() => (track.style.scrollBehavior = "smooth"));
    }
  }

  function moverCarrossel(direction = 1) {
    if (cardStep <= 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = track.scrollLeft + direction * cardStep;

    if (hasLoop) {
      track.scrollTo({ left: target, behavior: "smooth" });
    } else {
      const clamped = Math.max(0, Math.min(target, maxScroll));
      track.scrollTo({ left: clamped, behavior: "smooth" });
    }
  }

  function iniciarSePreciso() {
    pararAutoPlay();
    const temEspaco = track.scrollWidth > track.clientWidth && cardStep > 0;
    if (temEspaco) autoPlayInterval = setInterval(() => moverCarrossel(1), 5000);
  }

  function pararAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
})();
