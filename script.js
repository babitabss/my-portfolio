// Mobile menu toggle
const mobileToggleButton = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('a[href^="#"]');

if (mobileToggleButton) {
  mobileToggleButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Hide mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
});

// Footer year
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// AOS init
if (window.AOS) {
  AOS.init({
    once: true,
    offset: 40,
    duration: 700,
    easing: 'ease-out-cubic'
  });
}

// Beautiful Projects Section Interactions
function initBeautifulProjects() {
  // Enhanced project card interactions
  const projectCards = document.querySelectorAll('article[class*="group relative bg-white rounded-2xl"]');
  
  projectCards.forEach((card, index) => {
    // Add staggered entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Animate in when visible
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200 + 300);
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
      // Add subtle parallax effect to image
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.15) translateZ(0)';
      }
      
      // Add glow effect
      this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(236, 72, 153, 0.2), 0 0 30px rgba(236, 72, 153, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
      }
    });
    
    // Add click ripple effect
    card.addEventListener('click', function(e) {
      if (!e.target.closest('a')) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    });
  });
  
  // Enhanced featured project interactions
  const featuredProject = document.querySelector('.featured-project, [class*="group relative overflow-hidden rounded-3xl"]');
  if (featuredProject) {
    featuredProject.addEventListener('mouseenter', function() {
      // Add enhanced glow effect
      this.style.boxShadow = '0 40px 80px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(236, 72, 153, 0.15), 0 0 40px rgba(236, 72, 153, 0.2)';
    });
  }
  
  // Smooth scroll animations for project section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add floating animation to icons
          const icons = entry.target.querySelectorAll('svg');
          icons.forEach((icon, i) => {
            setTimeout(() => {
              icon.style.animation = 'float 3s ease-in-out infinite';
              icon.style.animationDelay = `${i * 0.5}s`;
            }, 500);
          });
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  // Observe all project elements
  document.querySelectorAll('#projects article, #projects h2, #projects h3').forEach((el) => {
    observer.observe(el);
  });
}

// Initialize beautiful projects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBeautifulProjects);
} else {
  initBeautifulProjects();
}

// Add ripple effect styles
if (!document.querySelector('#ripple-styles')) {
  const rippleStyles = document.createElement('style');
  rippleStyles.id = 'ripple-styles';
  rippleStyles.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
      z-index: 1;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .animate-in {
      animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(rippleStyles);
}
// Contact form validation
const form = document.getElementById('contactForm');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorMessage = document.getElementById('error-message');
const successEl = document.getElementById('formSuccess');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(el, message) {
  if (el) el.textContent = message;
}

function clearErrors() {
  [errorName, errorEmail, errorMessage].forEach((el) => el && (el.textContent = ''));
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    successEl && successEl.classList.add('hidden');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(errorName, 'Please enter your full name.');
      isValid = false;
    }

    if (!isValidEmail(email.value)) {
      showError(errorEmail, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(errorMessage, 'Message should be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      // Simulate async submit
      setTimeout(() => {
        if (successEl) {
          successEl.textContent = 'Thanks! Your message has been sent.';
          successEl.classList.remove('hidden');
        }
        form.reset();
      }, 400);
    }
  });
}


