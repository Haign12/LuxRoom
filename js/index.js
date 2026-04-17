document.addEventListener('DOMContentLoaded', () => {
  // --- Category Slider Navigation ---
  const catGrid = document.querySelector('.cat-grid');
  const prevBtn = document.querySelector('.carousel-nav button:first-child');
  const nextBtn = document.querySelector('.carousel-nav button:last-child');

  if (catGrid && prevBtn && nextBtn) {
    const scrollAmount = 300; // Adjust based on item width + gap

    prevBtn.addEventListener('click', () => {
      catGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      catGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // --- Button Ripple Effect ---
  const buttons = document.querySelectorAll('button, .discover-btn, .primary-button, .view-all-link, .cat-item');
  
  buttons.forEach(btn => {
    // Only apply ripple to elements that are relatively positioned and not images themselves
    if (getComputedStyle(btn).position === 'static') {
      btn.style.position = 'relative';
    }
    // Prevent hiding content in some cases, but generally overflow hidden is needed
    // We already styled some in CSS, but let's enforce overflow hidden where safe
    if (!btn.classList.contains('cat-item') && !btn.classList.contains('view-all-link')) {
      btn.style.overflow = 'hidden';
    }

    btn.addEventListener('mousedown', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      // Style the ripple element
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = this.classList.contains('round-btn') || this.classList.contains('view-all-link') 
        ? 'rgba(0, 0, 0, 0.15)' 
        : 'rgba(255, 255, 255, 0.4)';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.pointerEvents = 'none';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transition = 'transform 0.5s ease-out, opacity 0.8s ease-out';
      
      this.appendChild(ripple);
      
      // Trigger animation
      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(4)';
        ripple.style.opacity = '0';
      });

      // Cleanup
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

  // --- Intersection Observer for Fade In (Optional polish) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to sections
  document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero-full')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(section);
    }
  });
});
