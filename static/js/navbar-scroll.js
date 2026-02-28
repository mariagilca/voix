(function () {
  function updateNavbarScrollState() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 8) {
      navbar.classList.add('scrolling');
    } else {
      navbar.classList.remove('scrolling');
    }
  }

  document.addEventListener('DOMContentLoaded', updateNavbarScrollState);
  window.addEventListener('load', updateNavbarScrollState);
  window.addEventListener('scroll', updateNavbarScrollState, {passive: true});
})();
