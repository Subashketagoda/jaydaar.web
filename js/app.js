/**
 * JAYDAAR - Luxury Modern Business Website & Lookbook
 * "A Style That Is Timeless"
 * Client Controller, Lightbox, Atelier Concierge & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    products: JAYDAAR_DATA.products,
    filteredProducts: [...JAYDAAR_DATA.products],
    activeCategory: 'all',
    searchQuery: '',
    currentModalProduct: null,
    selectedSize: null,
    currentLightboxIndex: 0
  };

  // 1. Haute Couture Loading Experience (Atelier Preloader Sequence: Exactly 2.5s)
  const preloader = document.getElementById('preloader');
  const preloaderCount = document.getElementById('preloaderCount');
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderStatus = document.getElementById('preloaderStatus');

  if (preloader) {
    const preloaderVideo = preloader.querySelector('video');
    if (preloaderVideo) {
      preloaderVideo.muted = true;
      preloaderVideo.defaultMuted = true;
      preloaderVideo.playsInline = true;
      preloaderVideo.play().catch(() => {});
    }

    const PRELOADER_DURATION_MS = 2500; // Exact 2.5 seconds
    const startTime = performance.now();
    const stages = [
      { max: 28, text: 'GATHERING ATELIER ARCHIVE...' },
      { max: 62, text: 'WEAVING WAX-RESIST SILHOUETTES...' },
      { max: 88, text: 'SYNCHRONIZING CAMPAIGN CINEMA...' },
      { max: 100, text: 'WELCOME TO JAYDAAR' }
    ];

    let preloaderCompleted = false;

    function stepPreloader(timestamp) {
      if (preloaderCompleted) return;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / PRELOADER_DURATION_MS, 1.0);
      const currentPct = Math.min(100, Math.floor(progress * 100));

      if (preloaderCount) {
        preloaderCount.textContent = `${currentPct.toString().padStart(2, '0')}%`;
      }
      if (preloaderFill) {
        preloaderFill.style.width = `${currentPct}%`;
      }

      if (preloaderStatus) {
        const stage = stages.find(s => currentPct <= s.max) || stages[stages.length - 1];
        preloaderStatus.textContent = stage.text;
      }

      if (progress < 1.0) {
        requestAnimationFrame(stepPreloader);
      } else {
        preloaderCompleted = true;
        if (preloaderCount) preloaderCount.textContent = '100%';
        if (preloaderFill) preloaderFill.style.width = '100%';
        if (preloaderStatus) preloaderStatus.textContent = 'WELCOME TO JAYDAAR';

        setTimeout(() => {
          preloader.classList.add('fade-out');
          // Start playing hero video seamlessly as curtains reveal site
          const heroVid = document.getElementById('heroBgVideo');
          if (heroVid && typeof playVideoSafely === 'function') {
            playVideoSafely(heroVid);
          }
          setTimeout(() => {
            preloader.style.display = 'none';
            if (preloaderVideo) preloaderVideo.pause();
          }, 450);
        }, 120);
      }
    }

    requestAnimationFrame(stepPreloader);
  }

  // DOM Elements
  const siteHeader = document.getElementById('siteHeader');
  const mainNav = document.getElementById('mainNav');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const productsGrid = document.getElementById('editorialProductsGrid');
  const catalogTabsContainer = document.getElementById('catalogTabsContainer');
  const searchInput = document.getElementById('catalogSearchInput');
  const galleryMasonry = document.getElementById('galleryMasonry');
  const socialPreviewGrid = document.getElementById('socialPreviewGrid');

  // Product Modal Elements
  const productModalBackdrop = document.getElementById('productModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalMainImg = document.getElementById('modalMainImg');
  const modalThumbsStrip = document.getElementById('modalThumbsStrip');
  const modalCategoryLabel = document.getElementById('modalCategoryLabel');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSizePills = document.getElementById('modalSizePills');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const modalSpecsList = document.getElementById('modalSpecsList');

  // Lightbox Elements
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  // Size Guide Elements
  const sizeGuideModalBackdrop = document.getElementById('sizeGuideModalBackdrop');
  const sizeGuideModalCloseBtn = document.getElementById('sizeGuideModalCloseBtn');
  const openSizeGuideBtns = document.querySelectorAll('.open-size-guide');

  // Contact Form
  const atelierInquiryForm = document.getElementById('atelierInquiryForm');

  // 2. Navigation: Sticky Header & Active Section Spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = ['hero', 'about', 'products', 'featured', 'gallery', 'reels', 'whyJaydaar', 'contact'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
          if (navLink) navLink.classList.add('active');
        }
      }
    });
  }

  // Mobile Menu Toggle
  if (mobileMenuToggle && mainNav) {
    const closeMobileMenu = () => {
      mobileMenuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.nav-link, .mobile-nav-cta').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // 3. Scroll Reveal Animations (Restrained & Modern)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.02,
      rootMargin: '60px 0px 60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 4. Products / Collections: Filter Tabs & Grid
  function renderTabs() {
    if (!catalogTabsContainer) return;
    catalogTabsContainer.innerHTML = JAYDAAR_DATA.categories.map(cat => {
      const isActive = cat.id === state.activeCategory ? 'active' : '';
      return `
        <button class="tab-btn ${isActive}" data-category="${cat.id}">
          ${cat.name}
        </button>
      `;
    }).join('');

    catalogTabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.dataset.category;
        renderTabs();
        filterAndRenderProducts();
      });
    });
  }

  function getCategoryName(catId) {
    const cat = JAYDAAR_DATA.categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  }

  function filterAndRenderProducts() {
    let result = [...state.products];

    // Category filter
    if (state.activeCategory !== 'all') {
      result = result.filter(p => p.category === state.activeCategory);
    }

    // Search query filter
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    state.filteredProducts = result;
    renderProductsGrid();
  }

  function renderProductsGrid() {
    if (!productsGrid) return;

    if (state.filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 6rem 1rem;">
          <span style="font-size: 0.72rem; letter-spacing: 0.24em; color: #666; text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Archive Query</span>
          <h3 style="font-family: var(--font-display); font-size: 2rem; color: #FFFFFF; text-transform: uppercase; margin-bottom: 1rem;">No Pieces Found</h3>
          <p style="color: #888888; font-size: 0.85rem; font-weight: 300;">Try clearing your search query or exploring our complete collections.</p>
          <button style="margin-top: 2rem;" class="btn-minimal-white" id="resetCatalogFilters">Show Complete Archive</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetCatalogFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeCategory = 'all';
          state.searchQuery = '';
          if (searchInput) searchInput.value = '';
          renderTabs();
          filterAndRenderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = state.filteredProducts.map(product => {
      const mainImg = product.images[0];
      const hoverImg = product.images[1] || product.images[0];
      const categoryName = getCategoryName(product.category);

      return `
        <article class="editorial-prod-card" data-product-id="${product.id}">
          <div class="prod-visual-box" onclick="window.JaydaarApp.openProductModal('${product.id}')">
            ${product.tag ? `<span class="prod-tag-pill">${product.tag}</span>` : ''}
            <div class="prod-quick-action-pill">Quick View &bull; Inquire</div>
            <img src="${mainImg}" alt="${product.name}" class="prod-visual-img main-view" loading="lazy">
            <img src="${hoverImg}" alt="${product.name}" class="prod-visual-img hover-view" loading="lazy">
          </div>

          <div class="prod-caption-box">
            <div class="prod-meta-line">
              <span class="prod-category-tag">${product.number} / ${categoryName}</span>
              <span class="prod-sizes-tag">${product.sizes[0]}</span>
            </div>
            <h3 class="prod-item-name" onclick="window.JaydaarApp.openProductModal('${product.id}')">${product.name}</h3>
            <p class="prod-item-desc">${product.subtitle}</p>
            <button class="prod-inquire-btn" onclick="window.JaydaarApp.openProductModal('${product.id}')">Inquire Piece &rarr;</button>
          </div>
        </article>
      `;
    }).join('');
  }

  // 5. Gallery / Work: Render Masonry & Lightbox
  function renderGallery() {
    if (!galleryMasonry) return;
    galleryMasonry.innerHTML = JAYDAAR_DATA.lookbook.map((item, idx) => `
      <div class="lookbook-tile" onclick="window.JaydaarApp.openLightbox(${idx})">
        <img src="${item.image}" alt="${item.caption}" loading="lazy">
        <div class="lookbook-tile-overlay">
          <p class="tile-caption">${item.caption}</p>
          <span class="tile-action-link">View High-Res &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  function openLightbox(index) {
    if (!galleryLightbox) return;
    state.currentLightboxIndex = index;
    const item = JAYDAAR_DATA.lookbook[index];
    if (!item) return;

    lightboxImg.src = item.image;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;

    galleryLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (galleryLightbox) {
      galleryLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function nextLightbox() {
    const nextIdx = (state.currentLightboxIndex + 1) % JAYDAAR_DATA.lookbook.length;
    openLightbox(nextIdx);
  }

  function prevLightbox() {
    const prevIdx = (state.currentLightboxIndex - 1 + JAYDAAR_DATA.lookbook.length) % JAYDAAR_DATA.lookbook.length;
    openLightbox(prevIdx);
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);
  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }

  // 6. Cinema in Motion: Render Reels Showcase (Continuous Autoplay Cinema)
  // 6. Cinema in Motion: Render Reels Showcase (Smooth Lazy Streaming Cinema)
  const reelsGrid = document.getElementById('reelsGrid');

  function renderReels() {
    if (!reelsGrid || !JAYDAAR_DATA.reels) return;
    reelsGrid.innerHTML = JAYDAAR_DATA.reels.map((reel, idx) => `
      <div class="reel-card" data-idx="${idx}">
        <div class="reel-live-badge"><span class="reel-live-dot"></span> LIVE MOTION</div>
        <video class="reel-video" loop muted playsinline webkit-playsinline preload="none" poster="${reel.poster}">
          <source src="${reel.video}" type="video/mp4">
        </video>

        <div class="reel-overlay">
          <span class="reel-tag">${reel.tag}</span>
          <h4 class="reel-title">${reel.title}</h4>
          <p class="reel-caption">${reel.caption}</p>
          <a href="https://wa.me/${JAYDAAR_DATA.brand.whatsappNumber}?text=${encodeURIComponent('Hello Jaydaar! I watched your campaign reel for ' + reel.title + ' and would like to inquire about this piece.')}" target="_blank" class="reel-inquire-link">
            Inquire Piece &rarr;
          </a>
        </div>
      </div>
    `).join('');
  }

  // 6. Social Media Section (@jaydaar_) with Real Campaign Videos
  function renderSocialMedia() {
    if (!socialPreviewGrid || !JAYDAAR_DATA.socialPosts) return;
    socialPreviewGrid.innerHTML = JAYDAAR_DATA.socialPosts.map(post => `
      <div class="social-tile" onclick="window.open('${post.url}', '_blank')">
        <video class="social-video" loop muted playsinline webkit-playsinline preload="none" poster="${post.poster}">
          <source src="${post.video}" type="video/mp4">
        </video>
        <div class="social-tile-overlay">
          <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span class="social-view-label">Watch on Instagram &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  // 7. Contact / Atelier Concierge Form
  if (atelierInquiryForm) {
    atelierInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formClientName').value.trim();
      const phone = document.getElementById('formClientPhone').value.trim();
      const inquiryType = document.getElementById('formInquiryType').value;
      const message = document.getElementById('formClientMessage').value.trim();

      const text = `Hello Jaydaar Atelier! My name is ${name}.
Phone: ${phone}
Inquiry Regarding: ${inquiryType}
Message / Vision: ${message || 'I would like to consult with your stylist.'}`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${JAYDAAR_DATA.brand.whatsappNumber}?text=${encoded}`, '_blank');
    });
  }

  // 8. Product Detail Quick-View Modal
  function openProductModal(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    state.currentModalProduct = product;
    state.selectedSize = product.sizes[0] || 'Standard';

    modalCategoryLabel.textContent = `${product.number} / ${getCategoryName(product.category)}`;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;

    modalMainImg.src = product.images[0];
    modalMainImg.alt = product.name;

    modalThumbsStrip.innerHTML = product.images.map((imgUrl, idx) => `
      <img src="${imgUrl}" alt="${product.name} view ${idx + 1}" class="modal-thumb-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
    `).join('');

    modalThumbsStrip.querySelectorAll('.modal-thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        modalThumbsStrip.querySelectorAll('.modal-thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        modalMainImg.src = thumb.src;
      });
    });

    modalSizePills.innerHTML = product.sizes.map((size, idx) => `
      <button class="size-btn-pill ${idx === 0 ? 'active' : ''}" data-size="${size}">
        ${size}
      </button>
    `).join('');

    modalSizePills.querySelectorAll('.size-btn-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        modalSizePills.querySelectorAll('.size-btn-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedSize = pill.dataset.size;
        updateWhatsAppLink();
      });
    });

    modalSpecsList.innerHTML = product.details.map(d => `<li>${d}</li>`).join('');
    updateWhatsAppLink();

    productModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateWhatsAppLink() {
    if (!state.currentModalProduct) return;
    const p = state.currentModalProduct;
    const s = state.selectedSize || 'Standard';
    const message = `Hello Jaydaar Atelier! I am interested in inquiring about "${p.name}" (${p.number}) in size ${s}. Please let me know about availability and bespoke tailoring options.`;
    const encoded = encodeURIComponent(message);
    modalWhatsappBtn.onclick = () => {
      window.open(`https://wa.me/${JAYDAAR_DATA.brand.whatsappNumber}?text=${encoded}`, '_blank');
    };
  }

  function closeProductModal() {
    productModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
  if (productModalBackdrop) {
    productModalBackdrop.addEventListener('click', (e) => {
      if (e.target === productModalBackdrop) closeProductModal();
    });
  }

  // 9. Size Guide Modal
  function openSizeGuide() {
    if (sizeGuideModalBackdrop) {
      sizeGuideModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSizeGuide() {
    if (sizeGuideModalBackdrop) {
      sizeGuideModalBackdrop.classList.remove('active');
      if (!productModalBackdrop.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }
  }

  openSizeGuideBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openSizeGuide();
  }));

  if (sizeGuideModalCloseBtn) sizeGuideModalCloseBtn.addEventListener('click', closeSizeGuide);
  if (sizeGuideModalBackdrop) {
    sizeGuideModalBackdrop.addEventListener('click', (e) => {
      if (e.target === sizeGuideModalBackdrop) closeSizeGuide();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeSizeGuide();
      closeLightbox();
    } else if (e.key === 'ArrowRight' && galleryLightbox && galleryLightbox.classList.contains('active')) {
      nextLightbox();
    } else if (e.key === 'ArrowLeft' && galleryLightbox && galleryLightbox.classList.contains('active')) {
      prevLightbox();
    }
  });

  // Search input handler with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        filterAndRenderProducts();
      }, 200);
    });
  }

  // Global namespace for inline triggers
  window.JaydaarApp = {
    openProductModal,
    openLightbox,
    filterByCategory: (catId) => {
      state.activeCategory = catId;
      renderTabs();
      filterAndRenderProducts();
      const catalogSec = document.getElementById('products');
      if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // High-Performance Priority Video Engine: Stream & Play only active videos
  function playVideoSafely(vid) {
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.setAttribute('loop', '');
    const p = vid.play();
    if (p !== undefined) p.catch(() => {});
  }

  function pauseVideoSafely(vid) {
    if (!vid || vid.id === 'heroBgVideo') return;
    try { vid.pause(); } catch(e) {}
  }

  function initSmartVideoPlayback() {
    // 1. Play hero video immediately
    const heroVid = document.getElementById('heroBgVideo');
    if (heroVid) playVideoSafely(heroVid);

    // 2. Fallback gesture unlock for hero video on strict mobile browsers
    const unlockVisible = () => {
      if (heroVid && heroVid.paused) playVideoSafely(heroVid);
    };
    ['touchstart', 'touchend', 'scroll', 'click', 'pointerdown'].forEach(evt => {
      window.addEventListener(evt, unlockVisible, { once: true, passive: true });
    });

    // 3. Viewport Intersection: Stream & Play ONLY when scrolled within 180px of screen
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            playVideoSafely(vid);
          } else {
            pauseVideoSafely(vid);
          }
        });
      }, { rootMargin: '180px 0px 180px 0px', threshold: 0.05 });

      document.querySelectorAll('.reel-video, .social-video, .featured-visual-video').forEach(vid => {
        videoObserver.observe(vid);
      });
    }
  }

  // 9. Luxury Cursor Engine (Desktop)
  function initLuxuryCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const text = document.getElementById('cursorText');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    function attachCursorHover() {
      document.querySelectorAll('a, button, input, select, textarea, .tab-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });

      document.querySelectorAll('.prod-visual-box, .lookbook-tile, .reel-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-explore');
          if (text) text.textContent = 'EXPLORE';
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-explore');
          if (text) text.textContent = '';
        });
      });
    }

    attachCursorHover();
  }

  // Initial Boot
  renderTabs();
  renderProductsGrid();
  renderGallery();
  renderReels();
  renderSocialMedia();
  initSmartVideoPlayback();
  initLuxuryCursor();
});
