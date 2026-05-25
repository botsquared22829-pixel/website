const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const revealItems = Array.from(document.querySelectorAll(".reveal"));

const sectionLinks = navLinks
  .map((link) => ({
    link,
    section: document.getElementById(link.getAttribute("href").slice(1)),
  }))
  .filter((item) => item.section);

function setActiveNavLink() {
  const currentPosition = window.scrollY + 140;
  let activeItem = sectionLinks[0];

  sectionLinks.forEach((item) => {
    if (item.section.offsetTop <= currentPosition) {
      activeItem = item;
    }
  });

  sectionLinks.forEach((item) => {
    const isActive = item === activeItem;
    item.link.classList.toggle("is-active", isActive);

    if (isActive) {
      item.link.setAttribute("aria-current", "page");
    } else {
      item.link.removeAttribute("aria-current");
    }
  });
}

setActiveNavLink();
window.addEventListener("scroll", setActiveNavLink, { passive: true });
window.addEventListener("resize", setActiveNavLink);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        window.setTimeout(() => {
          entry.target.style.transitionDelay = "";
        }, 650);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
