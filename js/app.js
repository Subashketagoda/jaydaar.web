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
          // Trigger all videos to start playing immediately as curtains reveal site
          if (typeof playAllVideos === 'function') {
            playAllVideos();
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

  // Hero Pure Video / Cinema View Toggle
  const heroSection = document.getElementById('hero');
  const heroCleanToggle = document.getElementById('heroCleanToggle');
  const cleanToggleLabel = document.getElementById('cleanToggleLabel');

  if (heroSection && heroCleanToggle) {
    heroCleanToggle.addEventListener('click', () => {
      const isClean = heroSection.classList.toggle('clean-view');
      if (cleanToggleLabel) {
        cleanToggleLabel.textContent = isClean ? 'Show Text' : 'Pure Video';
      }
      heroCleanToggle.setAttribute('aria-pressed', isClean ? 'true' : 'false');
    });
  }

  // ==========================================================================
  // Hero Scroll-Driven Sticky Reveal Engine (Full Screen Video -> Slow Rise Text -> Page Roll)
  // ==========================================================================
  const heroTrack = document.getElementById('heroTrack');
  const heroEditorial = document.getElementById('hero');
  const heroBottomContent = document.getElementById('heroBottomContent');
  const heroGradient = document.getElementById('heroGradient');
  const heroScrollCue = document.getElementById('heroScrollCue');
  const heroBgVideo = document.getElementById('heroBgVideo');
  const floatingConcierge = document.getElementById('floatingConcierge');

  function updateHeroScroll() {
    if (!heroTrack || !heroEditorial) return;

    const rect = heroTrack.getBoundingClientRect();
    const trackHeight = heroTrack.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = trackHeight - viewportHeight;

    if (scrollableDistance <= 0) return;

    // Scrolled amount within track: 0 when at top
    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollableDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Phase 1: As user scrolls from 0 to 0.45, hero text gracefully floats UP from below into view
    const textProgress = Math.max(0, Math.min(1, progress / 0.45));
    // High-end cubic ease out
    const easedText = 1 - Math.pow(1 - textProgress, 3);

    // Text translateY: from 80px (tucked below) to 0px (at rest)
    const translateY = (1 - easedText) * 80;
    // Text opacity: from 0 to 1
    const textOpacity = Math.max(0, Math.min(1, textProgress * 1.25));

    // Bottom gradient opacity: from 0.08 (pure video clarity) to 0.88 (deep contrast for text)
    const gradientOpacity = 0.08 + (easedText * 0.80);

    // Initial "Scroll to Discover" cue indicator fades out rapidly as soon as user starts scrolling (0 to 0.15)
    const cueProgress = Math.max(0, Math.min(1, progress / 0.15));
    const cueOpacity = 1 - cueProgress;
    const cueTranslateY = cueProgress * 20;

    // Phase 2: Gentle parallax on video / subtle dimming as the next section comes in (progress 0.70 to 1.0)
    let videoScale = 1.0;
    let videoDim = 1.0;
    let textParallax = 0;
    if (progress > 0.70) {
      const exitP = (progress - 0.70) / 0.30;
      videoScale = 1.0 + (exitP * 0.03);
      videoDim = 1.0 - (exitP * 0.25);
      textParallax = -exitP * 35; // gentle upward drift as page slides over
    }

    // Apply values via CSS custom properties on container
    heroEditorial.style.setProperty('--hero-text-y', `${(translateY + textParallax).toFixed(1)}px`);
    heroEditorial.style.setProperty('--hero-text-opacity', textOpacity.toFixed(3));
    heroEditorial.style.setProperty('--hero-gradient-opacity', gradientOpacity.toFixed(3));
    heroEditorial.style.setProperty('--hero-pointer-events', textProgress > 0.45 ? 'auto' : 'none');

    if (heroScrollCue) {
      heroScrollCue.style.setProperty('--cue-opacity', cueOpacity.toFixed(3));
      heroScrollCue.style.setProperty('--cue-y', `${cueTranslateY.toFixed(1)}px`);
    }

    if (heroBgVideo) {
      heroBgVideo.style.transform = `scale(${videoScale.toFixed(3)})`;
      heroBgVideo.style.opacity = videoDim.toFixed(3);
    }

    // Floating Concierge Widget: completely hidden on Hero, smoothly rises up on scroll
    if (floatingConcierge) {
      if (window.scrollY > 280 || progress > 0.25) {
        floatingConcierge.classList.add('visible');
      } else {
        floatingConcierge.classList.remove('visible');
      }
    }
  }

  // Initial call on load
  updateHeroScroll();
  window.addEventListener('resize', updateHeroScroll, { passive: true });

  // ==========================================================================
  // Lenis Butter-Smooth Luxury Momentum Scrolling Engine
  // ==========================================================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenis.on('scroll', () => {
      updateHeroScroll();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor navigation with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          if (targetId === '#hero') {
            e.preventDefault();
            lenis.scrollTo(0, { duration: 1.2 });
            return;
          }
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, {
              offset: -60,
              duration: 1.2
            });
          }
        }
      });
    });
  }

  // 2. Navigation: Sticky Header & Active Section Spy (RAF Throttled for 60/120fps)
  const trackedSections = [
    { id: 'hero', el: document.getElementById('heroTrack') || document.getElementById('hero'), link: document.querySelector('.main-nav a[href="#hero"]') },
    { id: 'about', el: document.getElementById('about'), link: document.querySelector('.main-nav a[href="#about"]') },
    { id: 'products', el: document.getElementById('products'), link: document.querySelector('.main-nav a[href="#products"]') },
    { id: 'featured', el: document.getElementById('featured'), link: document.querySelector('.main-nav a[href="#featured"]') },
    { id: 'gallery', el: document.getElementById('gallery'), link: document.querySelector('.main-nav a[href="#gallery"]') },
    { id: 'reels', el: document.getElementById('reels'), link: document.querySelector('.main-nav a[href="#reels"]') },
    { id: 'whyJaydaar', el: document.getElementById('whyJaydaar'), link: document.querySelector('.main-nav a[href="#whyJaydaar"]') },
    { id: 'contact', el: document.getElementById('contact'), link: document.querySelector('.main-nav a[href="#contact"]') }
  ].filter(item => item.el && item.link);

  let scrollTicking = false;

  function handleScrollTick() {
    updateHeroScroll();

    const scrollY = window.scrollY;
    if (scrollY > 40) {
      if (!siteHeader.classList.contains('scrolled')) siteHeader.classList.add('scrolled');
    } else {
      if (siteHeader.classList.contains('scrolled')) siteHeader.classList.remove('scrolled');
    }

    const scrollPos = scrollY + 220;
    let currentActiveId = null;

    for (let i = 0; i < trackedSections.length; i++) {
      const { id, el } = trackedSections[i];
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = id;
        break;
      }
    }

    if (currentActiveId) {
      trackedSections.forEach(({ id, link }) => {
        if (id === currentActiveId) {
          if (!link.classList.contains('active')) link.classList.add('active');
        } else {
          if (link.classList.contains('active')) link.classList.remove('active');
        }
      });
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(handleScrollTick);
      scrollTicking = true;
    }
  }, { passive: true });

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
  const reelsGrid = document.getElementById('reelsGrid');

  function renderReels() {
    if (!reelsGrid || !JAYDAAR_DATA.reels) return;
    reelsGrid.innerHTML = JAYDAAR_DATA.reels.map((reel, idx) => `
      <div class="reel-card" data-idx="${idx}">
        <div class="reel-live-badge"><span class="reel-live-dot"></span> LIVE MOTION</div>
        <video class="reel-video" loop muted playsinline webkit-playsinline preload="auto" poster="${reel.poster}">
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

    // Attach click to play/pause on reels
    reelsGrid.querySelectorAll('.reel-card').forEach(card => {
      const vid = card.querySelector('video');
      if (!vid) return;

      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        if (vid.paused) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    });
  }

  function renderSocialMedia() {
    if (!socialPreviewGrid || !JAYDAAR_DATA.socialPosts) return;
    socialPreviewGrid.innerHTML = JAYDAAR_DATA.socialPosts.map(post => `
      <div class="social-tile" onclick="window.open('${post.url}', '_blank')">
        <video class="social-video" loop muted playsinline webkit-playsinline preload="auto" poster="${post.poster}">
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

  // Universal Video Engine: Ensure EVERY video autoplays smoothly across all devices
  function safePlayVideo(vid) {
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.setAttribute('muted', '');
    const p = vid.play();
    if (p !== undefined) {
      p.catch(() => {});
    }
  }

  function playAllVideos() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(vid => {
      if (vid.classList.contains('preloader-bg-video')) return;
      safePlayVideo(vid);
    });
  }

  function initSmartVideoPlayback() {
    // 1. Play all videos immediately
    playAllVideos();

    // 2. Play video as soon as its metadata / first frame is ready
    document.querySelectorAll('video').forEach(vid => {
      ['loadeddata', 'canplay', 'loadedmetadata'].forEach(evt => {
        vid.addEventListener(evt, () => {
          if (!vid.classList.contains('preloader-bg-video')) {
            safePlayVideo(vid);
          }
        }, { once: true });
      });
    });

    // 3. Fallback gesture unlock for strict Safari/iOS & Android Chrome policies
    const unlockHandler = () => {
      playAllVideos();
    };
    ['touchstart', 'touchend', 'scroll', 'click', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlockHandler, { once: true, passive: true });
    });

    // 4. Viewport Intersection: Play videos when in view, PAUSE when off-screen to free GPU
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            safePlayVideo(vid);
          } else {
            // Keep hero playing, pause off-screen reels to keep GPU fresh
            if (!vid.classList.contains('hero-bg-video') && !vid.classList.contains('preloader-bg-video')) {
              vid.pause();
            }
          }
        });
      }, { rootMargin: '160px 0px 160px 0px', threshold: 0.02 });

      document.querySelectorAll('video').forEach(vid => {
        if (!vid.classList.contains('preloader-bg-video')) {
          videoObserver.observe(vid);
        }
      });
    }
  }

  // 9. Luxury Cursor Engine (Desktop, Decoupled GPU Compositor)
  function initLuxuryCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const text = document.getElementById('cursorText');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        ringX = mouseX;
        ringY = mouseY;
        hasMoved = true;
      }
    }, { passive: true });

    function renderCursor() {
      if (hasMoved) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
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

  // ==========================================================================
  // 10. Dark/Light Mode Toggle (with localStorage persistence)
  // ==========================================================================
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const metaThemeColor = document.getElementById('metaThemeColor');
    if (!themeToggle) return;

    // Restore saved preference
    const savedTheme = localStorage.getItem('jaydaar-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      if (metaThemeColor) metaThemeColor.content = '#FAFAFA';
    }

    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('jaydaar-theme', isLight ? 'light' : 'dark');

      // Update meta theme-color for mobile browser chrome
      if (metaThemeColor) {
        metaThemeColor.content = isLight ? '#FAFAFA' : '#000000';
      }

      // GA4 Analytics: Track theme switch
      if (typeof gtag === 'function') {
        gtag('event', 'theme_toggle', {
          event_category: 'engagement',
          event_label: isLight ? 'light' : 'dark'
        });
      }
    });
  }

  // ==========================================================================
  // 11. Hero Video Auto-Rotation Engine (Cinematic Crossfade)
  // ==========================================================================
  function initHeroVideoRotation() {
    const heroVideo = document.getElementById('heroBgVideo');
    const transitionOverlay = document.getElementById('heroVideoTransition');
    if (!heroVideo || !transitionOverlay) return;

    // Parse video list from data attribute
    let heroVideos;
    try {
      heroVideos = JSON.parse(heroVideo.dataset.heroVideos || '[]');
    } catch (e) {
      return;
    }
    if (!heroVideos || heroVideos.length <= 1) return;

    let currentVideoIndex = 0;
    const ROTATION_INTERVAL = 8000; // 8 seconds per video
    const FADE_DURATION = 800;      // 0.8s crossfade

    function rotateHeroVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
      const nextSrc = heroVideos[currentVideoIndex];

      // Phase 1: Fade to black
      transitionOverlay.classList.add('fading');

      setTimeout(() => {
        // Phase 2: Swap source while hidden
        const source = heroVideo.querySelector('source');
        if (source) {
          source.src = nextSrc;
        } else {
          heroVideo.src = nextSrc;
        }
        heroVideo.load();

        // Phase 3: Play and fade back in
        const playWhenReady = () => {
          heroVideo.muted = true;
          heroVideo.play().catch(() => {});
          transitionOverlay.classList.remove('fading');
        };

        // Wait for enough data to start playback
        heroVideo.addEventListener('canplay', playWhenReady, { once: true });

        // Fallback in case canplay doesn't fire quickly
        setTimeout(() => {
          if (transitionOverlay.classList.contains('fading')) {
            playWhenReady();
          }
        }, 1200);
      }, FADE_DURATION);
    }

    // Start rotation cycle
    setInterval(rotateHeroVideo, ROTATION_INTERVAL);
  }

  // ==========================================================================
  // 12. Image Lazy-Load Fade-In Observer
  // ==========================================================================
  function initLazyLoadFadeIn() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (!lazyImages.length) return;

    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Mark as loaded when the image finishes loading
            if (img.complete) {
              img.classList.add('loaded');
            } else {
              img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
              img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
            }
            imgObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imgObserver.observe(img));
    } else {
      // Fallback: just show all images
      lazyImages.forEach(img => img.classList.add('loaded'));
    }
  }

  // ==========================================================================
  // 13. GA4 Analytics: Track Key User Interactions
  // ==========================================================================
  function initAnalyticsTracking() {
    if (typeof gtag !== 'function') return;

    // Track WhatsApp inquiries
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'whatsapp_inquiry', {
          event_category: 'conversion',
          event_label: link.textContent.trim().substring(0, 50)
        });
      });
    });

    // Track Instagram link clicks
    document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'social_click', {
          event_category: 'engagement',
          event_label: 'instagram'
        });
      });
    });

    // Track section visibility
    const sectionElements = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gtag('event', 'section_view', {
              event_category: 'engagement',
              event_label: entry.target.id
            });
            sectionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      sectionElements.forEach(section => sectionObserver.observe(section));
    }
  }

  // Initial Boot
  renderGallery();
  renderReels();
  renderSocialMedia();
  initSmartVideoPlayback();
  initLuxuryCursor();
  initThemeToggle();
  initHeroVideoRotation();
  initLazyLoadFadeIn();
  initAnalyticsTracking();
});

