const btnMobile = document.getElementById("btn-mobile");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");
const mobileLinks = mobileMenu?.querySelectorAll("a") || [];

function closeMobileMenu() {
  mobileMenu?.classList.remove("active");
  menuOverlay?.classList.remove("active");
  btnMobile?.classList.remove("open");
  btnMobile?.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  if (!btnMobile || !mobileMenu || !menuOverlay) return;
  const isOpening = !mobileMenu.classList.contains("active");
  if (isOpening) {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    btnMobile.classList.add("open");
    btnMobile.setAttribute("aria-expanded", "true");
  } else {
    closeMobileMenu();
  }
}

btnMobile?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

mobileMenu?.addEventListener("click", (event) => event.stopPropagation());

menuOverlay?.addEventListener("click", closeMobileMenu);

mobileLinks?.forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("click", (event) => {
  if (!mobileMenu?.classList.contains("active")) return;
  if (mobileMenu.contains(event.target) || btnMobile?.contains(event.target)) return;
  closeMobileMenu();
});

window.addEventListener(
  "scroll",
  () => {
    if (mobileMenu?.classList.contains("active")) closeMobileMenu();
  },
  { passive: true }
);
