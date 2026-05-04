document.addEventListener('DOMContentLoaded', () => {
  // --- Category Slider Navigation ---
  const catGrid = document.querySelector('.cat-grid');
  const prevBtn = document.querySelector('#cat-prev');
  const nextBtn = document.querySelector('#cat-next');

  if (catGrid && prevBtn && nextBtn) {
    const scrollAmount = 300;

    prevBtn.addEventListener('click', () => {
      catGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      catGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // --- Category Tabs Logic ---
  const catTabs = document.querySelectorAll(".cat-tab");
  const catItems = document.querySelectorAll(".cat-item");

  function switchCategory(categoryName) {
    // Update active tab
    catTabs.forEach((tab) => {
      if (tab.dataset.category === categoryName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Show/hide category items with animation
    catItems.forEach((item) => {
      if (item.dataset.category === categoryName) {
        item.style.display = "block";
        item.style.animation = "none";
        item.offsetHeight; // Trigger reflow
        item.style.animation = "catFadeUp 0.5s ease forwards";
      } else {
        item.style.display = "none";
      }
    });

    // Scroll back to start of grid
    if (catGrid) {
      catGrid.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  catTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;
      switchCategory(category);
    });
  });

  // --- Brand Navigation Logic ---
  const brandItems = document.querySelectorAll(".brand-item");
  const brandProducts = document.querySelectorAll(".bp-item");

  function switchBrand(brandName) {
    brandItems.forEach((item) => {
      if (item.dataset.brand === brandName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    brandProducts.forEach((product) => {
      if (product.dataset.brand === brandName) {
        product.style.display = "flex";
        product.style.animation = "fadeUp 0.4s ease forwards";
      } else {
        product.style.display = "none";
      }
    });
  }

  brandItems.forEach((item) => {
    item.addEventListener("click", () => {
      const brand = item.dataset.brand;
      switchBrand(brand);
    });
  });

  // --- Button Ripple Effect ---
  const buttons = document.querySelectorAll('button, .discover-btn, .primary-button, .view-all-link, .cat-item');

  buttons.forEach(btn => {
    if (getComputedStyle(btn).position === 'static') {
      btn.style.position = 'relative';
    }
    if (!btn.classList.contains('cat-item') && !btn.classList.contains('view-all-link')) {
      btn.style.overflow = 'hidden';
    }

    btn.addEventListener('mousedown', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
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

      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(4)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

  // --- Intersection Observer for Fade In ---
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

  document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero-full')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(section);
    }
  });
});