  function observeAnimatedElement(el, options = {}) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px) scale(1)';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.transition = options.transition || 'all 1s ease';
          el.style.opacity = 1;
          el.style.transform = 'translateY(0) scale(1)';
        } else {
          el.style.opacity = 0;
          el.style.transform = 'translateY(30px)';
        }
      });	
    }, { threshold: 0.2 });

    observer.observe(el);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const welcome = document.querySelector('.about-container');
    observeAnimatedElement(welcome, { transition: 'all 1s ease' });

    const gallery = document.querySelector('.gallery-section');
    observeAnimatedElement(gallery, { transition: 'all 1s ease' });

    const images = document.querySelectorAll('.gallery-grid img');
    images.forEach((img, index) => {
      img.style.transitionDelay = `${0.2 + index * 0.15}s`;
      observeAnimatedElement(img, { transition: 'all 0.6s ease' });
    });
  });


 function animateLocationSection() {
    const locationText = document.querySelector('.location-text');
    const locationImage = document.querySelector('.location-image');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          locationText.style.opacity = 1;
          locationText.style.transform = 'translateX(0)';
          locationImage.style.opacity = 1;
          locationImage.style.transform = 'translateX(0)';
        } else {
          locationText.style.opacity = 0;
          locationText.style.transform = 'translateX(-50px)';
          locationImage.style.opacity = 0;
          locationImage.style.transform = 'translateX(50px)';
        }
      });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.location-section'));
  }

  window.addEventListener('DOMContentLoaded', () => {
    const welcome = document.querySelector('.about-container');
    observeAnimatedElement(welcome, { transition: 'all 1s ease' });

    const images = document.querySelectorAll('.gallery-grid img');
    images.forEach((img, index) => {
      img.style.transitionDelay = `${0.2 + index * 0.15}s`;
      observeAnimatedElement(img, { transition: 'all 0.6s ease' });
    });

    animateLocationSection();
  });