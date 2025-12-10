const modalOverlay = document.getElementById("modal-overlay");
const modalCard = document.querySelector(".modal-card");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalButtons = document.querySelectorAll(".btn-open-modal");

async function openModal(filePath) {
  if (!modalOverlay || !modalContent) return;
  modalContent.innerHTML = '<p class="modal-loading">Carregando...</p>';
  modalOverlay.classList.add("active");

  try {
    const response = await fetch(filePath, { cache: "no-cache" });
    if (!response.ok) throw new Error("Falha ao carregar o arquivo.");
    const html = await response.text();
    modalContent.innerHTML = html;
  } catch (error) {
    modalContent.innerHTML =
      "<p>Não foi possível carregar o conteúdo agora. Tente novamente em instantes.</p>";
  }
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  if (modalContent) modalContent.innerHTML = "";
}

modalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const filePath = button.getAttribute("data-file");
    if (filePath) openModal(filePath);
  });
});

modalClose?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", closeModal);
modalCard?.addEventListener("click", (event) => event.stopPropagation());
