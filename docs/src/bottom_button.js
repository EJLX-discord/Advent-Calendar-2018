var backToTopBtn = document.querySelector('.floating-btn');

backToTopBtn.addEventListener('click', (event) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  backToTopBtn.classList.remove('floating-btn--hover');
});

backToTopBtn.addEventListener('mouseover', (event) => {
  backToTopBtn.classList.add('floating-btn--hover');
});

backToTopBtn.addEventListener('mouseout', (event) => {
  backToTopBtn.classList.remove('floating-btn--hover');
});