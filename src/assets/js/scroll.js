document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("data-target");
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
