var backToTopBtn = document.querySelector('.floating-btn--totop');

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



var toDarkBtn = document.querySelector('.floating-btn--todark');

toDarkBtn.addEventListener('click', (event) => {
  toDarkBtn.classList.remove('floating-btn--hover');
  document.body.classList.toggle('body--dark');
});

toDarkBtn.addEventListener('mouseover', (event) => {
  toDarkBtn.classList.add('floating-btn--hover');
});

toDarkBtn.addEventListener('mouseout', (event) => {
  toDarkBtn.classList.remove('floating-btn--hover');
});