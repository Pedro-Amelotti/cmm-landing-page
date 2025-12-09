function animateCounter(element, finalValue, duration = 1200) {
  const numericValue = parseInt(finalValue.replace(/\D/g, ""), 10);
  const suffix = finalValue.replace(/[0-9]/g, "");
  let start = 0;
  const increment = numericValue / (duration / 16);

  function update() {
    start += increment;
    if (start < numericValue) {
      element.textContent = Math.round(start) + suffix;
      requestAnimationFrame(update);
    } else {
      element.textContent = finalValue;
    }
  }

  update();
}

const impactSection = document.querySelector(".impact");

if (impactSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stats = entry.target.querySelectorAll(".stat");
          stats.forEach((stat) => {
            const numberElement = stat.querySelector(".stat-number");
            animateCounter(numberElement, stat.dataset.number);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(impactSection);
}
