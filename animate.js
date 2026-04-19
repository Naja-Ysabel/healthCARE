const ANIMATION_CONFIG = {
  duration: 260,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
};

function applyTransition(element, properties = ['opacity', 'transform'], duration = ANIMATION_CONFIG.duration) {
  if (!element) return;
  element.style.transition = properties.map(prop => `${prop} ${duration}ms ${ANIMATION_CONFIG.easing}`).join(', ');
}

function fadeInElement(element, delay = 0) {
  if (!element) return;
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  applyTransition(element);
  requestAnimationFrame(() => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  });
}

function initPageEntrance() {
  const app = document.getElementById('app');
  if (!app) return;
  app.style.opacity = '0';
  app.style.transform = 'translateY(8px)';
  applyTransition(app);
  requestAnimationFrame(() => {
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';
  });
}

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      fadeInElement(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.card-hover, .fade-in, .rounded-xl').forEach(el => {
    observer.observe(el);
  });
}

function setupButtonFeedback() {
  document.querySelectorAll('button').forEach(button => {
    button.style.willChange = 'transform, opacity';
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}

function initAnimations() {
  initPageEntrance();
  setupScrollReveal();
  setupButtonFeedback();
}

document.addEventListener('DOMContentLoaded', initAnimations);
