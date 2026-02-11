// Reveal sections on scroll
const sections = document.querySelectorAll('section');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scrolling
document.querySelectorAll('nav a, a.button.smooth').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll button
const scrollBtn = document.getElementById('scrollToggle');
const icon = scrollBtn ? scrollBtn.querySelector('i') : null;

if (scrollBtn && icon) {
  scrollBtn.addEventListener('click', () => {
    const scrollTop = window.scrollY;
    const about = document.getElementById('about');
    if (!about) return;
    const aboutTop = about.offsetTop - 50;

    if (scrollTop < aboutTop - 20) {
      window.scrollTo({ top: aboutTop, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const about = document.getElementById('about');
    if (!about) return;
    const aboutTop = about.offsetTop - 50;

    if (scrollTop < aboutTop - 20) {
      icon.className = 'fas fa-chevron-down';
      scrollBtn.classList.add('show');
    } else {
      icon.className = 'fas fa-chevron-up';
      scrollBtn.classList.add('show');
    }
  });

  window.addEventListener('load', () => {
    scrollBtn.classList.add('show');
  });
}

// Modals
const modal = document.getElementById('workModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalTags = document.getElementById('modalTags');
const closeModal = document.getElementById('closeModal');

if (modal && modalImg && modalTitle && modalDesc && modalLink && modalTags && closeModal) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      modalTitle.textContent = item.dataset.title;
      modalDesc.textContent = item.dataset.description;
      modalImg.src = item.dataset.cover;
      modalLink.href = item.dataset.link || item.dataset.cover;

      // Set tags
      modalTags.innerHTML = '';
      const tags = (item.dataset.tags || '').split(',').map(tag => tag.trim());
      tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        modalTags.appendChild(li);
      });

      modal.classList.add('active');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Responsive nav
function respNav() {
  const nav = document.getElementById("topNav");
  if (!nav) return;
  const icon = nav.querySelector(".icon i");
  const isResponsive = nav.classList.toggle("responsive");

  if (icon) {
    if (isResponsive) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
}

// MixItUp
document.addEventListener('DOMContentLoaded', () => {
  const containerEl = document.querySelector('#gallery');
  if (containerEl && window.mixitup) {
    var mixer = mixitup(containerEl, {
      animation: {
        enable: true,
        effects: 'fade translateZ(-100px)',
        duration: 500,
        animateResizeContainer: true,
        animateResizeTargets: true,
        nudge: true
      }
    });

    const controls = document.querySelectorAll('.controls button');
    controls.forEach(button => {
      button.addEventListener('click', () => {
        controls.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }
});
