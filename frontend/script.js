(() => {
  'use strict';

  const API_BASE = 'http://localhost:3000/api';

  const STORAGE_KEYS = {
    token: 'pixelvault_jwt_token',
    sessionUser: 'pixelvault_session_user',
    guestCart: 'pixelvault_guest_cart',
    profiles: 'pixelvault_local_profiles',
    favorites: 'pixelvault_favorites',
    theme: 'pixelvault_theme'
  };

  const games = [
    {
      id: 'cs2',
      title: 'Counter-Strike 2',
      platform: 'PC / Steam',
      platformGroup: 'pc',
      genre: 'Shooter táctico',
      developer: 'Valve',
      year: 2023,
      price: 58,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.9,
      catalog: true,
      image: 'https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359',
      description: 'La evolución del shooter táctico más jugado del mundo, con físicas renovadas, mapas modernizados y partidas competitivas de alta precisión.'
    },
    {
      id: 'minecraft',
      title: 'Minecraft',
      platform: 'Xbox Series X',
      platformGroup: 'xbox',
      genre: 'Sandbox / Mundo abierto',
      developer: 'Mojang Studios',
      year: 2011,
      price: 110,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.8,
      catalog: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd5gr2YHx65IVjx04i5nnj9PrYbAayydNipA&s',
      description: 'Construye, explora y sobrevive en un mundo de bloques que nunca se repite. El único límite es tu imaginación y la llegada de la noche.'
    },
    {
      id: 'mario-party',
      title: 'Mario Party',
      platform: 'Nintendo Switch',
      platformGroup: 'nintendo',
      genre: 'Fiesta / Multijugador',
      developer: 'Nintendo',
      year: 2018,
      price: 150,
      stock: 'low',
      stockLabel: 'Pocas unidades',
      rating: 4.7,
      catalog: true,
      image: 'https://mario.wiki.gallery/images/thumb/9/90/Mario_Party_2021_Logo_.png/250px-Mario_Party_2021_Logo_.png',
      description: 'Compite con amigos y familia en tableros llenos de minijuegos, estrellas, desafíos y alianzas inesperadas.'
    },
    {
      id: 're4',
      title: 'Resident Evil 4 - Remake',
      platform: 'PC / Steam',
      platformGroup: 'pc',
      genre: 'Survival Horror',
      developer: 'Capcom',
      year: 2023,
      price: 170,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.9,
      catalog: true,
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/2509/85p2Dwh5iDhUzRKe40QeNYh3.png',
      description: 'Leon S. Kennedy regresa en una reconstrucción completa del clásico, con gráficos modernos, tensión constante y combate más visceral.'
    },
    {
      id: 'halo',
      title: 'Halo: The Master Chief Collection',
      platform: 'PS5 / Xbox',
      platformGroup: 'xbox',
      genre: 'Shooter en primera persona',
      developer: '343 Industries',
      year: 2019,
      price: 200,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.8,
      catalog: true,
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg?t=1774466074',
      description: 'Toda la saga del Jefe Maestro reunida en una colección con campañas remasterizadas y multijugador competitivo.'
    },
    {
      id: 'gtav',
      title: 'GTA V Online',
      platform: 'PC',
      platformGroup: 'pc',
      genre: 'Acción / Mundo abierto',
      developer: 'Rockstar Games',
      year: 2013,
      price: 160,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.7,
      catalog: true,
      image: 'https://static.wikia.nocookie.net/esgta/images/1/1b/Car%C3%A1tula_GTA_V.jpg/revision/latest/scale-to-width-down/1200?cb=20130402191528',
      description: 'Construye tu imperio criminal en Los Santos, organiza atracos y participa en un universo online en constante evolución.'
    },
    {
      id: 'zelda-totk',
      title: 'The Legend of Zelda: TOTK',
      platform: 'Nintendo Switch',
      platformGroup: 'nintendo',
      genre: 'Aventura',
      developer: 'Nintendo',
      year: 2023,
      price: 280,
      stock: 'out',
      stockLabel: 'Agotado',
      rating: 4.9,
      catalog: false,
      image: 'https://www.nintendo.com/eu/media/images/other_22/character_hubs/the_legend_of_zelda/16x9_Other_TheLegendOfZelda_Hub_image1600w.jpg',
      description: 'Explora Hyrule desde el cielo hasta sus profundidades usando nuevas habilidades para construir, combinar y resolver desafíos.'
    },
    {
      id: 'fifa24',
      title: 'FIFA 24',
      platform: 'Multiplataforma',
      platformGroup: 'playstation',
      genre: 'Deportes',
      developer: 'EA Sports',
      year: 2023,
      price: 220,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.3,
      catalog: false,
      image: '',
      description: 'Competición de fútbol con clubes, ligas y modos de juego para disfrutar solo o en línea.'
    },
    {
      id: 'elden-ring',
      title: 'Elden Ring',
      platform: 'PlayStation 5',
      platformGroup: 'playstation',
      genre: 'RPG de acción',
      developer: 'FromSoftware',
      year: 2022,
      price: 250,
      stock: 'low',
      stockLabel: 'Pocas unidades',
      rating: 4.9,
      catalog: false,
      image: 'https://www.allkeyshop.com/blog/wp-content/uploads/elden-ring-title-1024x536.webp',
      description: 'Un vasto mundo de fantasía oscura, combate exigente y libertad total para construir tu propia aventura.'
    },
    {
      id: 'gow-ragnarok',
      title: 'God of War Ragnarök',
      platform: 'PlayStation 5',
      platformGroup: 'playstation',
      genre: 'Acción y aventura',
      developer: 'Santa Monica Studio',
      year: 2022,
      price: 270,
      stock: 'available',
      stockLabel: 'Disponible',
      rating: 4.9,
      catalog: false,
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
      description: 'Kratos y Atreus recorren los Nueve Reinos en una aventura épica marcada por decisiones, combates y profecías.'
    }
  ];

  const validCoupons = {
    PIXEL10: 10,
    GAMER20: 20,
    VAULT15: 15
  };

  const state = {
    cart: [],
    discountCode: '',
    discountPercent: 0,
    token: localStorage.getItem(STORAGE_KEYS.token),
    email: localStorage.getItem(STORAGE_KEYS.sessionUser),
    favorites: new Set(readJSON(STORAGE_KEYS.favorites, [])),
    search: '',
    platform: 'all',
    sort: 'featured',
    activeGameId: null,
    currentModal: null,
    lastFocused: null
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const elements = {
    header: $('#site-header'),
    scrollProgress: $('#scroll-progress'),
    backToTop: $('#back-to-top'),
    menuButton: $('#menu'),
    mobileMenu: $('#mobile-menu'),
    themeToggle: $('#theme-toggle'),
    gamesGrid: $('#games-grid'),
    emptyState: $('#empty-state'),
    resultsCount: $('#results-count'),
    gameSearch: $('#game-search'),
    platformFilter: $('#platform-filter'),
    sortGames: $('#sort-games'),
    resetFilters: $('#reset-filters'),
    comparisonBody: $('#comparison-table-body'),
    toastRegion: $('#toast-region'),
    cartHeaderButton: $('#cart-header-btn'),
    cartFloatButton: $('#cart-float-btn'),
    cartBadge: $('#cart-badge'),
    cartFloatBadge: $('#cart-float-badge'),
    cartItemsCounter: $('#cart-items-counter'),
    cartItemsList: $('#cart-items-list'),
    cartSubtotal: $('#cart-subtotal'),
    cartDiscount: $('#cart-discount'),
    cartTotal: $('#cart-total'),
    couponCode: $('#coupon-code'),
    couponMessage: $('#cart-coupon-msg'),
    applyCouponButton: $('#apply-coupon-btn'),
    checkoutButton: $('#checkout-btn'),
    detailsImage: $('#modal-details-img'),
    detailsPlatform: $('#modal-details-platform'),
    detailsTitle: $('#modal-details-title'),
    detailsMeta: $('#modal-details-meta'),
    detailsDescription: $('#modal-details-desc'),
    detailsPrice: $('#modal-details-price'),
    detailsAddButton: $('#details-add-btn'),
    contactForm: $('#contact-form'),
    platformSelect: $('#plataforma'),
    platformMessage: $('#platform-msg'),
    messageField: $('#mensaje'),
    messageCounter: $('#message-counter'),
    loginForm: $('#login-form'),
    registerForm: $('#register-form'),
    logoutButton: $('#logout-btn'),
    currentYear: $('#current-year')
  };

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(value);
  }

  function formatDate(isoString) {
    if (!isoString) return 'Sin fecha';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  function uniqueId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `${prefix}_${window.crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function getGame(gameId) {
    return games.find(game => game.id === gameId);
  }

  function getGameByTitle(title) {
    return games.find(game => game.title.toLowerCase() === String(title).toLowerCase());
  }

  function showToast(message, type = 'success') {
    if (!elements.toastRegion) return;
    const toast = document.createElement('div');
    toast.className = `toast${type === 'error' ? ' error' : ''}`;
    toast.textContent = message;
    elements.toastRegion.appendChild(toast);
    window.setTimeout(() => {
      toast.classList.add('removing');
      window.setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  function getProfiles() {
    return readJSON(STORAGE_KEYS.profiles, {});
  }

  function saveProfiles(profiles) {
    writeJSON(STORAGE_KEYS.profiles, profiles);
  }

  function createEmptyProfile(email) {
    return {
      email,
      registeredAt: new Date().toISOString(),
      cart: [],
      purchases: [],
      coupons: [],
      returns: []
    };
  }

  function getProfile(email) {
    if (!email) return null;
    const profiles = getProfiles();
    if (!profiles[email]) {
      profiles[email] = createEmptyProfile(email);
      saveProfiles(profiles);
    }
    return profiles[email];
  }

  function updateProfile(email, updater) {
    if (!email) return;
    const profiles = getProfiles();
    const profile = profiles[email] || createEmptyProfile(email);
    updater(profile);
    profiles[email] = profile;
    saveProfiles(profiles);
  }

  function normalizeCartItems(items) {
    if (!Array.isArray(items)) return [];
    const normalized = [];
    items.forEach(item => {
      const game = item.id ? getGame(item.id) : getGameByTitle(item.title);
      if (!game) return;
      const quantity = Math.max(1, Number.parseInt(item.quantity, 10) || 1);
      const existing = normalized.find(cartItem => cartItem.id === game.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        normalized.push({ id: game.id, quantity });
      }
    });
    return normalized;
  }

  function loadCart() {
    if (state.email) {
      const profile = getProfile(state.email);
      state.cart = normalizeCartItems(profile?.cart || []);
    } else {
      state.cart = normalizeCartItems(readJSON(STORAGE_KEYS.guestCart, []));
    }
  }

  function persistCart() {
    if (state.email) {
      updateProfile(state.email, profile => {
        profile.cart = state.cart;
      });
    } else {
      writeJSON(STORAGE_KEYS.guestCart, state.cart);
    }
  }

  function mergeGuestCart(email) {
    const guestCart = normalizeCartItems(readJSON(STORAGE_KEYS.guestCart, []));
    if (!guestCart.length) return;
    updateProfile(email, profile => {
      const merged = normalizeCartItems([...(profile.cart || []), ...guestCart]);
      profile.cart = merged;
    });
    localStorage.removeItem(STORAGE_KEYS.guestCart);
  }

  function setSession(email, token) {
    if (email && token) {
      state.email = email;
      state.token = token;
      localStorage.setItem(STORAGE_KEYS.sessionUser, email);
      localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
      state.email = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEYS.sessionUser);
      localStorage.removeItem(STORAGE_KEYS.token);
    }
  }

  function setTheme(theme) {
    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = resolvedTheme;
    localStorage.setItem(STORAGE_KEYS.theme, resolvedTheme);
    if (elements.themeToggle) {
      const lightMode = resolvedTheme === 'light';
      elements.themeToggle.setAttribute('aria-pressed', String(lightMode));
      elements.themeToggle.setAttribute('aria-label', lightMode ? 'Activar tema oscuro' : 'Activar tema claro');
    }
    const themeColor = $('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', resolvedTheme === 'light' ? '#f4f7fc' : '#080b14');
  }

  function initializeTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved) {
      setTheme(saved);
      return;
    }
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(preferred);
  }

  function openMenu() {
    if (!elements.menuButton || !elements.mobileMenu) return;
    elements.menuButton.classList.add('open');
    elements.mobileMenu.classList.add('open');
    elements.menuButton.setAttribute('aria-expanded', 'true');
    elements.mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!elements.menuButton || !elements.mobileMenu) return;
    elements.menuButton.classList.remove('open');
    elements.mobileMenu.classList.remove('open');
    elements.menuButton.setAttribute('aria-expanded', 'false');
    elements.mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (!elements.mobileMenu) return;
    elements.mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  }

  function getFocusableElements(container) {
    return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container)
      .filter(element => !element.hasAttribute('hidden') && element.offsetParent !== null);
  }

  function openModal(target) {
    const modal = typeof target === 'string' ? document.getElementById(target) : target;
    if (!modal) return;
    const previousTrigger = state.currentModal ? state.lastFocused : document.activeElement;
    if (state.currentModal && state.currentModal !== modal) closeModal(state.currentModal, false);
    state.lastFocused = previousTrigger;
    state.currentModal = modal;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const focusable = getFocusableElements(modal);
    window.setTimeout(() => {
      const preferred = $('[autofocus]', modal) || focusable[0];
      preferred?.focus();
    }, 60);
  }

  function closeModal(target, restoreFocus = true) {
    const modal = typeof target === 'string' ? document.getElementById(target) : target;
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (state.currentModal === modal) state.currentModal = null;
    if (!$$('.modal-overlay.open').length) document.body.classList.remove('modal-open');
    if (restoreFocus && state.lastFocused instanceof HTMLElement) state.lastFocused.focus();
  }

  function trapModalFocus(event) {
    if (event.key !== 'Tab' || !state.currentModal) return;
    const focusable = getFocusableElements(state.currentModal);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function renderCatalog() {
    if (!elements.gamesGrid) return;
    const query = state.search.trim().toLowerCase();
    let filtered = games.filter(game => game.catalog);

    if (query) {
      filtered = filtered.filter(game => {
        const haystack = `${game.title} ${game.platform} ${game.genre} ${game.developer}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    if (state.platform !== 'all') {
      filtered = filtered.filter(game => game.platformGroup === state.platform);
    }

    if (state.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (state.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (state.sort === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title, 'es'));

    elements.resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'juego encontrado' : 'juegos encontrados'}`;
    elements.emptyState.hidden = filtered.length > 0;

    elements.gamesGrid.innerHTML = filtered.map(game => {
      const favorite = state.favorites.has(game.id);
      return `
        <article class="game-card reveal visible" data-game-card="${escapeHTML(game.id)}">
          <div class="game-media">
            <img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.title)}" loading="lazy">
            <div class="game-badges">
              <span class="platform-badge">${escapeHTML(game.platform)}</span>
              <span class="stock-badge">${escapeHTML(game.stockLabel)}</span>
            </div>
            <button class="favorite-button${favorite ? ' active' : ''}" type="button" data-favorite="${escapeHTML(game.id)}" aria-label="${favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}" aria-pressed="${favorite}">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="game-content">
            <div class="game-overline"><span>${escapeHTML(game.genre)}</span><span class="game-rating">★ ${game.rating.toFixed(1)}</span></div>
            <h3>${escapeHTML(game.title)}</h3>
            <p class="game-description">${escapeHTML(game.description)}</p>
            <div class="game-footer">
              <span class="game-price"><small>Precio</small><strong>${formatCurrency(game.price)}</strong></span>
              <div class="card-actions">
                <button class="card-action" type="button" data-details="${escapeHTML(game.id)}">Detalles</button>
                <button class="card-action add" type="button" data-add="${escapeHTML(game.id)}">Agregar</button>
              </div>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  function renderComparisonTable() {
    if (!elements.comparisonBody) return;
    elements.comparisonBody.innerHTML = games.map(game => {
      const imageMarkup = game.image
        ? `<img src="${escapeHTML(game.image)}" alt="" loading="lazy">`
        : `<span class="table-placeholder" aria-hidden="true">${escapeHTML(game.title.slice(0, 2).toUpperCase())}</span>`;
      return `
        <tr>
          <td><div class="table-game">${imageMarkup}<strong>${escapeHTML(game.title)}</strong></div></td>
          <td>${escapeHTML(game.genre)}</td>
          <td><span class="table-platform">${escapeHTML(game.platform)}</span></td>
          <td><strong>${formatCurrency(game.price)}</strong></td>
          <td><span class="table-stock ${escapeHTML(game.stock)}">${escapeHTML(game.stockLabel)}</span></td>
        </tr>`;
    }).join('');
  }

  function toggleFavorite(gameId) {
    if (!getGame(gameId)) return;
    if (state.favorites.has(gameId)) {
      state.favorites.delete(gameId);
      showToast('Juego eliminado de favoritos');
    } else {
      state.favorites.add(gameId);
      showToast('Juego guardado en favoritos');
    }
    writeJSON(STORAGE_KEYS.favorites, Array.from(state.favorites));
    renderCatalog();
  }

  function openGameDetails(gameId) {
    const game = getGame(gameId);
    if (!game) return;
    state.activeGameId = game.id;
    elements.detailsImage.src = game.image;
    elements.detailsImage.alt = game.title;
    elements.detailsPlatform.textContent = game.platform;
    elements.detailsTitle.textContent = game.title;
    elements.detailsMeta.textContent = `${game.genre} · ${game.developer} · ${game.year}`;
    elements.detailsDescription.textContent = game.description;
    elements.detailsPrice.textContent = formatCurrency(game.price);
    openModal('modal-details');
  }

  function addToCart(gameId, quantity = 1) {
    const game = getGame(gameId);
    if (!game || game.stock === 'out') {
      showToast('Este juego no está disponible actualmente', 'error');
      return;
    }
    const existing = state.cart.find(item => item.id === gameId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      state.cart.push({ id: gameId, quantity });
    }
    persistCart();
    renderCart();
    showToast(`${game.title} agregado al carrito`);
  }

  function changeCartQuantity(gameId, change) {
    const item = state.cart.find(cartItem => cartItem.id === gameId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) state.cart = state.cart.filter(cartItem => cartItem.id !== gameId);
    persistCart();
    renderCart();
  }

  function removeFromCart(gameId) {
    const game = getGame(gameId);
    state.cart = state.cart.filter(item => item.id !== gameId);
    persistCart();
    renderCart();
    showToast(`${game?.title || 'Producto'} eliminado del carrito`);
  }

  function getCartCount() {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getCartSubtotal() {
    return state.cart.reduce((total, item) => {
      const game = getGame(item.id);
      return total + (game ? game.price * item.quantity : 0);
    }, 0);
  }

  function getCartTotals() {
    const subtotal = getCartSubtotal();
    const discount = subtotal * state.discountPercent / 100;
    return { subtotal, discount, total: subtotal - discount };
  }

  function renderCart() {
    const count = getCartCount();
    [elements.cartBadge, elements.cartFloatBadge].forEach(badge => {
      if (!badge) return;
      badge.textContent = count;
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    });

    if (elements.cartItemsCounter) {
      elements.cartItemsCounter.textContent = `${count} ${count === 1 ? 'producto' : 'productos'}`;
    }

    if (elements.cartItemsList) {
      if (!state.cart.length) {
        elements.cartItemsList.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Explora el catálogo y agrega tu primer juego.</p>';
      } else {
        elements.cartItemsList.innerHTML = state.cart.map(item => {
          const game = getGame(item.id);
          if (!game) return '';
          return `
            <div class="cart-item">
              <div class="cart-item-main">
                <img src="${escapeHTML(game.image)}" alt="" loading="lazy">
                <div><strong>${escapeHTML(game.title)}</strong><span>${formatCurrency(game.price)} por unidad</span></div>
              </div>
              <div class="quantity-control" aria-label="Cantidad de ${escapeHTML(game.title)}">
                <button type="button" data-quantity="-1" data-game-id="${escapeHTML(game.id)}" aria-label="Reducir cantidad">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-quantity="1" data-game-id="${escapeHTML(game.id)}" aria-label="Aumentar cantidad">+</button>
              </div>
              <div class="cart-item-end"><strong>${formatCurrency(game.price * item.quantity)}</strong><button class="remove-item" type="button" data-remove="${escapeHTML(game.id)}">Eliminar</button></div>
            </div>`;
        }).join('');
      }
    }

    const totals = getCartTotals();
    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatCurrency(totals.subtotal);
    if (elements.cartDiscount) elements.cartDiscount.textContent = `- ${formatCurrency(totals.discount)}`;
    if (elements.cartTotal) elements.cartTotal.textContent = formatCurrency(totals.total);
    if (elements.checkoutButton) elements.checkoutButton.disabled = state.cart.length === 0;
  }

  function resetCoupon(message = '') {
    state.discountCode = '';
    state.discountPercent = 0;
    if (elements.couponCode) elements.couponCode.value = '';
    if (elements.couponMessage) {
      elements.couponMessage.textContent = message;
      elements.couponMessage.classList.remove('success', 'error');
    }
  }

  function applyCoupon() {
    if (!elements.couponCode || !elements.couponMessage) return;
    const code = elements.couponCode.value.trim().toUpperCase();
    elements.couponMessage.classList.remove('success', 'error');

    if (!state.cart.length) {
      elements.couponMessage.textContent = 'Agrega un producto antes de aplicar un cupón.';
      elements.couponMessage.classList.add('error');
      return;
    }

    if (!code) {
      elements.couponMessage.textContent = 'Ingresa un código de descuento.';
      elements.couponMessage.classList.add('error');
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(validCoupons, code)) {
      state.discountCode = '';
      state.discountPercent = 0;
      elements.couponMessage.textContent = 'El código ingresado no es válido.';
      elements.couponMessage.classList.add('error');
      renderCart();
      return;
    }

    state.discountCode = code;
    state.discountPercent = validCoupons[code];
    elements.couponMessage.textContent = `Cupón ${code} aplicado: ${state.discountPercent}% de descuento.`;
    elements.couponMessage.classList.add('success');

    if (state.email) {
      updateProfile(state.email, profile => {
        profile.coupons = profile.coupons || [];
        const alreadyRecorded = profile.coupons.some(coupon => coupon.code === code);
        if (!alreadyRecorded) {
          profile.coupons.push({ code, discount: state.discountPercent, date: new Date().toISOString() });
        }
      });
    }

    renderCart();
    showToast('Cupón aplicado correctamente');
  }

  function checkout() {
    if (!state.cart.length) {
      showToast('Tu carrito está vacío', 'error');
      return;
    }

    if (!state.token || !state.email) {
      closeModal('modal-cart', false);
      openModal('modal-login');
      showToast('Inicia sesión para completar tu compra', 'error');
      return;
    }

    const totals = getCartTotals();
    const confirmed = window.confirm(`¿Confirmas la compra por ${formatCurrency(totals.total)}?`);
    if (!confirmed) return;

    const now = new Date().toISOString();
    const purchases = state.cart.map(item => {
      const game = getGame(item.id);
      return {
        id: uniqueId('purchase'),
        gameId: item.id,
        title: game?.title || 'Juego',
        quantity: item.quantity,
        unitPrice: game?.price || 0,
        price: (game?.price || 0) * item.quantity,
        date: now
      };
    });

    updateProfile(state.email, profile => {
      profile.purchases = [...(profile.purchases || []), ...purchases];
      profile.cart = [];
    });

    state.cart = [];
    resetCoupon();
    persistCart();
    renderCart();
    closeModal('modal-cart');
    showToast('Compra realizada. Revisa el historial en tu perfil');
  }

  function refreshAuthUI() {
    const label = state.token ? 'Mi perfil' : 'Iniciar sesión';
    $$('.account-btn').forEach(button => {
      const span = $('span', button);
      if (span) span.textContent = label;
      else button.textContent = label;
    });
  }

  function accountAction() {
    closeMenu();
    if (state.token && state.email) {
      renderDashboard();
      openModal('modal-dashboard');
    } else {
      openModal('modal-login');
    }
  }

  function clearFormErrors(form) {
    $$('.form-group', form).forEach(group => {
      group.classList.remove('has-error');
      const error = $('.form-error', group);
      if (error) error.textContent = '';
    });
  }

  function setFieldError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const error = $('.form-error', group);
    if (error) error.textContent = message;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function login(event) {
    event.preventDefault();
    clearFormErrors(elements.loginForm);
    const emailInput = $('#login-email');
    const passwordInput = $('#login-password');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    let valid = true;

    if (!validateEmail(email)) {
      setFieldError(emailInput, 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (password.length < 6) {
      setFieldError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }

    if (!valid) return;

    const submitButton = $('button[type="submit"]', elements.loginForm);
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Ingresando...';

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldError(passwordInput, data.error || 'No se pudo iniciar sesión. Revisa tus datos.');
        return;
      }

      setSession(email, data.token);
      getProfile(email);
      mergeGuestCart(email);
      loadCart();
      refreshAuthUI();
      renderCart();
      elements.loginForm.reset();
      closeModal('modal-login');
      showToast(`Bienvenido, ${email}`);
    } catch {
      setFieldError(passwordInput, 'No se pudo conectar con el servidor. Verifica que el backend esté activo.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  async function register(event) {
    event.preventDefault();
    clearFormErrors(elements.registerForm);
    const emailInput = $('#register-email');
    const passwordInput = $('#register-password');
    const confirmInput = $('#register-password-confirm');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmation = confirmInput.value;
    let valid = true;

    if (!validateEmail(email)) {
      setFieldError(emailInput, 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (password.length < 6) {
      setFieldError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }

    if (confirmation !== password) {
      setFieldError(confirmInput, 'Las contraseñas no coinciden.');
      valid = false;
    }

    if (!valid) return;

    const submitButton = $('button[type="submit"]', elements.registerForm);
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Creando cuenta...';

    try {
      const response = await fetch(`${API_BASE}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldError(emailInput, data.error || 'No se pudo crear la cuenta.');
        return;
      }

      getProfile(email);
      elements.registerForm.reset();
      closeModal('modal-register', false);
      openModal('modal-login');
      $('#login-email').value = email;
      showToast('Cuenta creada correctamente. Ahora inicia sesión');
    } catch {
      setFieldError(emailInput, 'No se pudo conectar con el servidor. Verifica que el backend esté activo.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  function logout() {
    const confirmed = window.confirm('¿Deseas cerrar tu sesión?');
    if (!confirmed) return;
    setSession(null, null);
    state.discountCode = '';
    state.discountPercent = 0;
    loadCart();
    refreshAuthUI();
    renderCart();
    closeModal('modal-dashboard');
    showToast('Sesión cerrada correctamente');
  }

  function renderDashboard() {
    if (!state.email) return;
    const profile = getProfile(state.email);
    if (!profile) return;

    const email = escapeHTML(profile.email);
    $('#dashboard-email').textContent = profile.email;
    $('#dashboard-info-email').textContent = profile.email;
    $('#dashboard-info-since').textContent = formatDate(profile.registeredAt);
    $('#dashboard-avatar').textContent = profile.email.slice(0, 2).toUpperCase();

    const purchasesContainer = $('#dashboard-purchases-list');
    const purchases = [...(profile.purchases || [])].reverse();
    purchasesContainer.innerHTML = purchases.length
      ? `<div class="dashboard-list">${purchases.map(item => `
          <div class="dashboard-item">
            <div class="dashboard-item-info"><strong>${escapeHTML(item.title)}</strong><span>${item.quantity || 1} unidad(es) · ${formatDate(item.date)}</span></div>
            <div class="dashboard-item-actions"><span class="dashboard-item-price">${formatCurrency(item.price || item.unitPrice || 0)}</span><button class="btn-return" type="button" data-return="${escapeHTML(item.id)}">Solicitar devolución</button></div>
          </div>`).join('')}</div>`
      : '<p class="dashboard-empty">Aún no has realizado ninguna compra.</p>';

    const couponsContainer = $('#dashboard-coupons-list');
    const coupons = [...(profile.coupons || [])].reverse();
    couponsContainer.innerHTML = coupons.length
      ? `<div class="dashboard-list">${coupons.map(coupon => `
          <div class="dashboard-item"><div class="dashboard-item-info"><strong>${escapeHTML(coupon.code)}</strong><span>Aplicado el ${formatDate(coupon.date)}</span></div><span class="return-tag">-${Number(coupon.discount) || 0}%</span></div>`).join('')}</div>`
      : '<p class="dashboard-empty">Todavía no has utilizado cupones.</p>';

    const returnsContainer = $('#dashboard-returns-list');
    const returns = [...(profile.returns || [])].reverse();
    returnsContainer.innerHTML = returns.length
      ? `<div class="dashboard-list">${returns.map(item => `
          <div class="dashboard-item"><div class="dashboard-item-info"><strong>${escapeHTML(item.title)}</strong><span>Solicitado el ${formatDate(item.returnDate)}</span></div><span class="return-tag">Devuelto</span></div>`).join('')}</div>`
      : '<p class="dashboard-empty">No tienes devoluciones registradas.</p>';

    const accountEmail = $('#dashboard-info-email');
    if (accountEmail) accountEmail.setAttribute('title', email);
  }

  function requestReturn(purchaseId) {
    if (!state.email) return;
    const profile = getProfile(state.email);
    const purchase = (profile.purchases || []).find(item => item.id === purchaseId);
    if (!purchase) return;
    const confirmed = window.confirm(`¿Deseas solicitar la devolución de "${purchase.title}"?`);
    if (!confirmed) return;

    updateProfile(state.email, currentProfile => {
      currentProfile.purchases = (currentProfile.purchases || []).filter(item => item.id !== purchaseId);
      currentProfile.returns = currentProfile.returns || [];
      currentProfile.returns.push({
        ...purchase,
        id: uniqueId('return'),
        returnDate: new Date().toISOString()
      });
    });

    renderDashboard();
    showToast('Solicitud de devolución registrada');
  }

  function validateContactField(input) {
    const value = input.value.trim();
    input.closest('.form-group')?.classList.remove('has-error');
    const error = input.closest('.form-group')?.querySelector('.form-error');
    if (error) error.textContent = '';

    if (input.id === 'nombre' || input.id === 'apellido') {
      if (value.length < 2) {
        setFieldError(input, 'Debe contener al menos 2 caracteres.');
        return false;
      }
    }

    if (input.id === 'email' && !validateEmail(value)) {
      setFieldError(input, 'Ingresa un correo electrónico válido.');
      return false;
    }

    if (input.id === 'telefono' && value && !/^[+]?\d[\d\s-]{6,14}$/.test(value)) {
      setFieldError(input, 'Ingresa un número de teléfono válido.');
      return false;
    }

    if (input.id === 'mensaje' && value.length < 10) {
      setFieldError(input, 'El mensaje debe tener al menos 10 caracteres.');
      return false;
    }

    return true;
  }

  function submitContactForm(event) {
    event.preventDefault();
    clearFormErrors(elements.contactForm);
    const requiredFields = ['nombre', 'apellido', 'email', 'mensaje'].map(id => document.getElementById(id));
    const phone = $('#telefono');
    const fields = [...requiredFields, phone];
    const valid = fields.every(field => validateContactField(field));
    if (!valid) {
      const firstError = $('.has-error input, .has-error textarea', elements.contactForm);
      firstError?.focus();
      showToast('Revisa los campos marcados antes de enviar', 'error');
      return;
    }

    const confirmed = window.confirm('¿Deseas enviar esta consulta?');
    if (!confirmed) return;
    elements.contactForm.reset();
    elements.messageCounter.textContent = '0/500';
    elements.platformMessage.textContent = '';
    showToast('Consulta enviada correctamente');
  }

  function initializeRevealAnimations() {
    const revealElements = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(element => observer.observe(element));
  }

  function initializeNavigationObserver() {
    const sections = $$('[data-nav-section]');
    const links = $$('#desktop-nav a, #mobile-menu a');
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }, { rootMargin: '-25% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(100, scrollTop / scrollable * 100) : 0;
    if (elements.scrollProgress) elements.scrollProgress.style.width = `${progress}%`;
    elements.header?.classList.toggle('scrolled', scrollTop > 18);
    elements.backToTop?.classList.toggle('visible', scrollTop > 650);
  }

  function initializeEvents() {
    elements.menuButton?.addEventListener('click', toggleMenu);

    elements.mobileMenu?.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080) closeMenu();
    });

    elements.themeToggle?.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    elements.backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    elements.gameSearch?.addEventListener('input', event => {
      state.search = event.target.value;
      renderCatalog();
    });

    elements.platformFilter?.addEventListener('change', event => {
      state.platform = event.target.value;
      renderCatalog();
    });

    elements.sortGames?.addEventListener('change', event => {
      state.sort = event.target.value;
      renderCatalog();
    });

    elements.resetFilters?.addEventListener('click', () => {
      state.search = '';
      state.platform = 'all';
      state.sort = 'featured';
      elements.gameSearch.value = '';
      elements.platformFilter.value = 'all';
      elements.sortGames.value = 'featured';
      renderCatalog();
    });

    elements.gamesGrid?.addEventListener('click', event => {
      const favoriteButton = event.target.closest('[data-favorite]');
      const detailsButton = event.target.closest('[data-details]');
      const addButton = event.target.closest('[data-add]');
      if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
      if (detailsButton) openGameDetails(detailsButton.dataset.details);
      if (addButton) {
        addToCart(addButton.dataset.add);
        const originalText = addButton.textContent;
        addButton.textContent = 'Agregado';
        addButton.classList.add('added');
        addButton.disabled = true;
        window.setTimeout(() => {
          addButton.textContent = originalText;
          addButton.classList.remove('added');
          addButton.disabled = false;
        }, 1200);
      }
    });

    $$('[data-quick-add]').forEach(button => {
      button.addEventListener('click', () => addToCart(button.dataset.quickAdd));
    });

    elements.detailsAddButton?.addEventListener('click', () => {
      if (!state.activeGameId) return;
      addToCart(state.activeGameId);
      closeModal('modal-details');
      openModal('modal-cart');
    });

    [elements.cartHeaderButton, elements.cartFloatButton].forEach(button => {
      button?.addEventListener('click', () => {
        renderCart();
        openModal('modal-cart');
      });
    });

    elements.cartItemsList?.addEventListener('click', event => {
      const quantityButton = event.target.closest('[data-quantity]');
      const removeButton = event.target.closest('[data-remove]');
      if (quantityButton) changeCartQuantity(quantityButton.dataset.gameId, Number(quantityButton.dataset.quantity));
      if (removeButton) removeFromCart(removeButton.dataset.remove);
    });

    elements.applyCouponButton?.addEventListener('click', applyCoupon);
    elements.couponCode?.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyCoupon();
      }
    });
    elements.checkoutButton?.addEventListener('click', checkout);

    $$('.account-btn').forEach(button => button.addEventListener('click', accountAction));

    $('#go-to-register')?.addEventListener('click', event => {
      event.preventDefault();
      closeModal('modal-login', false);
      openModal('modal-register');
    });

    $('#go-to-login')?.addEventListener('click', event => {
      event.preventDefault();
      closeModal('modal-register', false);
      openModal('modal-login');
    });

    $('#terms-link')?.addEventListener('click', event => {
      event.preventDefault();
      openModal('modal-terms');
    });

    elements.loginForm?.addEventListener('submit', login);
    elements.registerForm?.addEventListener('submit', register);
    elements.logoutButton?.addEventListener('click', logout);

    $$('.password-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const input = document.getElementById(button.dataset.passwordTarget);
        if (!input) return;
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        button.textContent = show ? 'Ocultar' : 'Ver';
        button.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
      });
    });

    $$('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('mousedown', event => {
        if (event.target === overlay) closeModal(overlay);
      });
      $$('[data-close-modal]', overlay).forEach(button => button.addEventListener('click', () => closeModal(overlay)));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (state.currentModal) closeModal(state.currentModal);
        else closeMenu();
      }
      trapModalFocus(event);
    });

    $$('.dashboard-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        $$('.dashboard-tab').forEach(button => {
          const active = button === tab;
          button.classList.toggle('active', active);
          button.setAttribute('aria-selected', String(active));
        });
        $$('.dashboard-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === target));
      });
    });

    $('#dashboard-purchases-list')?.addEventListener('click', event => {
      const button = event.target.closest('[data-return]');
      if (button) requestReturn(button.dataset.return);
    });

    elements.contactForm?.addEventListener('submit', submitContactForm);

    elements.contactForm?.addEventListener('focusout', event => {
      const input = event.target.closest('input, textarea');
      if (input && ['nombre', 'apellido', 'email', 'telefono', 'mensaje'].includes(input.id)) validateContactField(input);
    });

    elements.contactForm?.addEventListener('input', event => {
      const group = event.target.closest('.form-group');
      if (group?.classList.contains('has-error')) validateContactField(event.target);
    });

    elements.messageField?.addEventListener('input', () => {
      elements.messageCounter.textContent = `${elements.messageField.value.length}/500`;
    });

    elements.platformSelect?.addEventListener('change', () => {
      const labels = {
        ps5: 'PlayStation 5',
        xbox: 'Xbox Series X/S',
        switch: 'Nintendo Switch',
        pc: 'PC / Steam',
        movil: 'dispositivos móviles'
      };
      const selected = labels[elements.platformSelect.value];
      elements.platformMessage.textContent = selected ? `Buena elección: ${selected}.` : '';
    });
  }

  function initialize() {
    initializeTheme();
    loadCart();
    renderCatalog();
    renderComparisonTable();
    renderCart();
    refreshAuthUI();
    initializeEvents();
    initializeRevealAnimations();
    initializeNavigationObserver();
    handleScroll();
    if (elements.currentYear) elements.currentYear.textContent = new Date().getFullYear();
  }

  initialize();
})();
