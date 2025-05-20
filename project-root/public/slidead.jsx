let slideIndex = 1;
let slideTimer;

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("gos");
  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
  resetTimer();
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
  resetTimer();
}

function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => plusSlides(1), 3000);
}

window.onload = function () {
  showSlides(slideIndex);
  slideTimer = setInterval(() => plusSlides(1), 3000);
};