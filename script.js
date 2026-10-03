"use strict";
const navLinks = Array.from(document.querySelectorAll(".header nav a"));
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
}
window.addEventListener("beforeprint", () => {
  document.querySelectorAll("details.courses").forEach(detail => {
    detail.dataset.wasOpen = String(detail.open);
    detail.open = true;
  });
});
window.addEventListener("afterprint", () => {
  document.querySelectorAll("details.courses").forEach(detail => {
    detail.open = detail.dataset.wasOpen === "true";
    delete detail.dataset.wasOpen;
  });
});
