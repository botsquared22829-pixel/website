const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

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
