/**
 * GOWSI MAKEOVER — LUXURY SOUTH INDIAN BRIDAL WEBSITE
 * Interactive Engine: Animations, Sliders, Lightbox, Filters & Booking System
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initStatsCounter();
  initServiceFilters();
  initBeforeAfterSlider();
  initGalleryFiltersAndLightbox();
  initTestimonialCarousel();
  initFaqAccordion();
  initBookingForm();
  initBackToTop();
  initScrollReveal();
});

/* ==========================================================================
   1. STICKY HEADER COMPACT STATE ON SCROLL
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const announcementBar = document.getElementById('announcementBar');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      if (announcementBar) {
        announcementBar.style.transform = 'translateY(-100%)';
        announcementBar.style.opacity = '0';
        announcementBar.style.pointerEvents = 'none';
      }
    } else {
      header.classList.remove('scrolled');
      if (announcementBar) {
        announcementBar.style.transform = 'translateY(0)';
        announcementBar.style.opacity = '1';
        announcementBar.style.pointerEvents = 'auto';
      }
    }
  };

  // Add smooth transition to announcement bar
  if (announcementBar) {
    announcementBar.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-drawer .btn');

  if (!toggleBtn || !navDrawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  function openDrawer() {
    navDrawer.classList.add('open');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. STATS COUNT-UP ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const targetAttr = stat.getAttribute('data-target');
          if (!targetAttr) return;
          const target = parseInt(targetAttr, 10);
          if (isNaN(target)) return;
          animateValue(stat, 0, target, 1800);
        });
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      element.innerText = Math.floor(easeOutQuad * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerText = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}

/* ==========================================================================
   4. BEFORE & AFTER TRANSFORMATION SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  const beforeLayer = document.querySelector('.before-image-layer');
  const handle = document.querySelector('.slider-handle');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  const setPosition = (x) => {
    const rect = container.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;

    beforeLayer.style.width = `${position}%`;
    handle.style.left = `${position}%`;
  };

  const onStart = (e) => {
    isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX) setPosition(clientX);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX) setPosition(clientX);
  };

  const onEnd = () => {
    isDragging = false;
  };

  handle.addEventListener('mousedown', onStart);
  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  handle.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onEnd);
}

/* ==========================================================================
   4B. SERVICE CATEGORY FILTERS
   ========================================================================== */
function initServiceFilters() {
  const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  if (!serviceFilterBtns.length || !serviceCards.length) return;

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-service-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-service-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 260);
        }
      });
    });
  });
}

/* ==========================================================================
   5. GALLERY FILTERS & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryFiltersAndLightbox() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption-text');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').trim().split(/\s+/);
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // Lightbox Trigger
  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Makeover by Gowsi Makeover — S. Gowsalya';
          if (lightboxCaption) {
            lightboxCaption.textContent = caption ? caption.textContent : 'Gowsi Makeover — S. Gowsalya';
          }
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

/* ==========================================================================
   6. TESTIMONIAL CAROUSEL
   ========================================================================== */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-card-slide');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetAutoplay();
    });
  });

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 6000);
  };

  const resetAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  // Set initial height for active items
  faqItems.forEach(item => {
    if (item.classList.contains('active')) {
      const body = item.querySelector('.faq-body');
      if (body) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    }
  });

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. BOOKING FORM WITH INSTANT WHATSAPP ENQUIRY & LOCALSTORAGE SYNC
   ========================================================================== */
function initBookingForm() {
  const bookingForm = document.getElementById('bridalBookingForm');
  const alertBox = document.getElementById('formSuccessAlert');

  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim() || '';
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const eventType = document.getElementById('eventType')?.value || '';
    const eventDate = document.getElementById('eventDate')?.value || '';
    const service = document.getElementById('serviceType')?.value || '';
    const location = document.getElementById('eventLocation')?.value.trim() || '';
    const message = document.getElementById('clientMessage')?.value.trim() || '';

    // Save inquiry to localStorage for Admin Panel
    try {
      const enquiries = JSON.parse(localStorage.getItem('gowsi_enquiries') || '[]');
      const newEnquiry = {
        id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
        name,
        phone,
        eventType,
        eventDate,
        service,
        location,
        message,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      enquiries.unshift(newEnquiry);
      localStorage.setItem('gowsi_enquiries', JSON.stringify(enquiries));
    } catch (err) {
      console.warn('Could not store inquiry locally:', err);
    }

    // Create customized WhatsApp Enquiry message
    const formattedMsg = `*Bridal Booking Enquiry — Gowsi Makeover (S. Gowsalya)*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Event Type:* ${encodeURIComponent(eventType)}%0A` +
      `*Event Date:* ${encodeURIComponent(eventDate)}%0A` +
      `*Service Required:* ${encodeURIComponent(service)}%0A` +
      `*Location/Venue:* ${encodeURIComponent(location)}%0A` +
      `*Additional Details:* ${encodeURIComponent(message)}`;

    if (alertBox) {
      alertBox.classList.add('success');
      alertBox.innerHTML = `<strong>Enquiry Prepared!</strong> Redirecting to WhatsApp to send your details to Gowsi Makeover (S. Gowsalya)...`;
    }

    setTimeout(() => {
      window.open(`https://wa.me/919489912195?text=${formattedMsg}`, '_blank');
      bookingForm.reset();
    }, 1000);
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top-btn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. SUBTLE SCROLL REVEAL ANIMATIONS & HIDDEN ADMIN SHORTCUTS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.service-card, .why-card, .stat-card, .gallery-item, .journey-card, .testimonial-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
  });

  // Hidden Admin Trigger: Ctrl+Shift+A or Alt+A keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });

  // Hidden Admin Trigger: Triple-click on footer copyright text
  const copyrightText = document.querySelector('.footer-copy-text');
  if (copyrightText) {
    let clickCount = 0;
    let clickTimer = null;
    copyrightText.style.cursor = 'default';
    copyrightText.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      if (clickCount >= 3) {
        clickCount = 0;
        window.location.href = 'admin.html';
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 600);
      }
    });
  }
}
