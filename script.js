// Active nav link based on current page
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');
  const isActive = linkPage === currentPage;
  link.classList.toggle('is-active', isActive);
  if (isActive) {
    link.setAttribute('aria-current', 'page');
  } else {
    link.removeAttribute('aria-current');
  }
});

// Reveal animation on scroll
const revealItems = Array.from(document.querySelectorAll('.reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        window.setTimeout(() => {
          entry.target.style.transitionDelay = '';
        }, 650);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12,
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
