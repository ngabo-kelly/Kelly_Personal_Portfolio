const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const currentYear = document.querySelector('#current-year');

function setMenuState(isOpen) {
  menuToggle.classList.toggle('is-open', isOpen);
  navLinks.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  setMenuState(!navLinks.classList.contains('is-open'));
});

navigationItems.forEach((item) => {
  item.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navigationItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

currentYear.textContent = new Date().getFullYear();
