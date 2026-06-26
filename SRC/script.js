/* ============================================================
   PIXELVAULT - SCRIPT PRINCIPAL
   ============================================================ */

/* ------------------------------------------------------------
   1. MENÚ RESPONSIVO
   ------------------------------------------------------------ */
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-menu');

if (menu && mobileMenu) {
  menu.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', false);
    });
  });
}

/* ------------------------------------------------------------
   2. NAVEGACIÓN ACTIVA AL HACER SCROLL
   ------------------------------------------------------------ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  var scrollY = window.scrollY;
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop - 100;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav);

/* ------------------------------------------------------------
   3. SISTEMA DE NOTIFICACIONES (TOAST)
   ------------------------------------------------------------ */
var toastTimer = null;
function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2800);
}

/* ------------------------------------------------------------
   4. SISTEMA GENÉRICO DE VENTANAS MODALES
   (apertura/cierre reutilizable para todos los modales del sitio)
   ------------------------------------------------------------ */
var openModalsCount = 0;

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  openModalsCount++;
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  openModalsCount = Math.max(0, openModalsCount - 1);
  if (openModalsCount === 0) {
    document.body.classList.remove('modal-open');
  }
}

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
  // Cerrar al hacer clic en el fondo oscuro (fuera de la tarjeta del modal)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeModal(overlay);
    }
  });

  // Cerrar con cualquier botón marcado con [data-close-modal]
  overlay.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(overlay);
    });
  });
});

// Cerrar todos los modales abiertos con la tecla Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function (overlay) {
      closeModal(overlay);
    });
  }
});

/* ------------------------------------------------------------
   5. AUTENTICACIÓN Y PERSISTENCIA (localStorage)
   NOTA: este es un login simulado para fines académicos.
   Las contraseñas se guardan en texto plano en el navegador,
   esto NO es seguro para un entorno de producción real.
   ------------------------------------------------------------ */
var STORAGE_KEYS = {
  users: 'pixelvault_users',
  session: 'pixelvault_session',
  guestCart: 'pixelvault_guest_cart'
};

var currentUserEmail = localStorage.getItem(STORAGE_KEYS.session);

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function setSessionEmail(email) {
  if (email) {
    localStorage.setItem(STORAGE_KEYS.session, email);
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
}

function findUserByEmail(email) {
  var users = getUsers();
  return users.find(function (u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });
}

function updateUser(email, updaterFn) {
  var users = getUsers();
  var idx = users.findIndex(function (u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });
  if (idx === -1) return null;
  updaterFn(users[idx]);
  saveUsers(users);
  return users[idx];
}

function getGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.guestCart)) || [];
  } catch (e) {
    return [];
  }
}

function persistCart() {
  if (currentUserEmail) {
    updateUser(currentUserEmail, function (user) {
      user.cart = cart;
    });
  } else {
    localStorage.setItem(STORAGE_KEYS.guestCart, JSON.stringify(cart));
  }
}

function loadInitialCart() {
  if (currentUserEmail) {
    var user = findUserByEmail(currentUserEmail);
    if (user) {
      cart = user.cart || [];
    } else {
      // La sesión apunta a un usuario que ya no existe en localStorage
      setSessionEmail(null);
      currentUserEmail = null;
      cart = getGuestCart();
    }
  } else {
    cart = getGuestCart();
  }
}

function mergeGuestCartIntoUser(email) {
  var guestCart = getGuestCart();
  if (guestCart.length === 0) return;
  updateUser(email, function (user) {
    user.cart = (user.cart || []).concat(guestCart);
  });
  localStorage.removeItem(STORAGE_KEYS.guestCart);
}

function formatDate(isoString) {
  if (!isoString) return '—';
  var date = new Date(isoString);
  return date.toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: 'numeric' });
}

function refreshAuthUI() {
  var loggedIn = !!currentUserEmail;
  document.querySelectorAll('.account-btn').forEach(function (btn) {
    btn.textContent = loggedIn ? 'Mi Perfil' : 'Iniciar sesión';
  });
}

// ---- Referencias a los modales de autenticación ----
var modalLogin = document.getElementById('modal-login');
var modalRegister = document.getElementById('modal-register');
var modalDashboard = document.getElementById('modal-dashboard');

// ---- Botón de cuenta (header + menú móvil) ----
document.querySelectorAll('.account-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentUserEmail) {
      renderDashboard();
      openModal(modalDashboard);
    } else {
      openModal(modalLogin);
    }
  });
});

// ---- Cambiar entre modal de login y registro ----
var goToRegister = document.getElementById('go-to-register');
var goToLogin = document.getElementById('go-to-login');

if (goToRegister) {
  goToRegister.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal(modalLogin);
    openModal(modalRegister);
  });
}

if (goToLogin) {
  goToLogin.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal(modalRegister);
    openModal(modalLogin);
  });
}

// ---- Formulario de inicio de sesión ----
var loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    loginForm.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    var emailInput = document.getElementById('login-email');
    var passwordInput = document.getElementById('login-password');
    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    if (!email || !emailRegex.test(email)) {
      showError(emailInput, 'Ingresa un correo electrónico válido.');
      isValid = false;
    }
    if (!password || password.length < 6) {
      showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    }
    if (!isValid) return;

    var user = findUserByEmail(email);
    if (!user || user.password !== password) {
      showError(passwordInput, 'Correo o contraseña incorrectos.');
      return;
    }

    mergeGuestCartIntoUser(user.email);
    currentUserEmail = user.email;
    setSessionEmail(user.email);
    loadInitialCart();
    updateCartBadge();
    renderCart();
    refreshAuthUI();

    loginForm.reset();
    closeModal(modalLogin);
    showToast('👋 ¡Bienvenido de nuevo, ' + user.email + '!');
  });
}

// ---- Formulario de registro ----
var registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    registerForm.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    var emailInput = document.getElementById('register-email');
    var passwordInput = document.getElementById('register-password');
    var confirmInput = document.getElementById('register-password-confirm');

    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var confirmPassword = confirmInput.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    if (!email || !emailRegex.test(email)) {
      showError(emailInput, 'Ingresa un correo electrónico válido.');
      isValid = false;
    }
    if (!password || password.length < 6) {
      showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    }
    if (confirmPassword !== password) {
      showError(confirmInput, 'Las contraseñas no coinciden.');
      isValid = false;
    }
    if (!isValid) return;

    if (findUserByEmail(email)) {
      showError(emailInput, 'Ya existe una cuenta registrada con este correo.');
      return;
    }

    var newUser = {
      email: email,
      password: password,
      registeredAt: new Date().toISOString(),
      cart: [],
      purchases: [],
      coupons: [],
      returns: []
    };

    var users = getUsers();
    users.push(newUser);
    saveUsers(users);

    mergeGuestCartIntoUser(newUser.email);
    currentUserEmail = newUser.email;
    setSessionEmail(newUser.email);
    loadInitialCart();
    updateCartBadge();
    renderCart();
    refreshAuthUI();

    registerForm.reset();
    closeModal(modalRegister);
    showToast('🎮 ¡Cuenta creada con éxito! Bienvenido a PixelVault.');
  });
}

// ---- Cerrar sesión ----
var logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    var confirmLogout = confirm('¿Seguro que deseas cerrar sesión?');
    if (!confirmLogout) return;

    currentUserEmail = null;
    setSessionEmail(null);
    discountPercent = 0;
    if (cartCouponMsg) {
      cartCouponMsg.textContent = '';
      cartCouponMsg.classList.remove('success', 'error');
    }

    loadInitialCart();
    updateCartBadge();
    renderCart();
    refreshAuthUI();
    closeModal(modalDashboard);
    showToast('Sesión cerrada. ¡Vuelve pronto!');
  });
}

// ---- Pestañas del panel "Mi Perfil" ----
document.querySelectorAll('.dashboard-tab').forEach(function (tabBtn) {
  tabBtn.addEventListener('click', function () {
    var target = tabBtn.getAttribute('data-tab');

    document.querySelectorAll('.dashboard-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    tabBtn.classList.add('active');

    document.querySelectorAll('.dashboard-panel').forEach(function (panel) {
      panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
    });
  });
});

// ---- Renderizado del panel "Mi Perfil" ----
function renderDashboard() {
  if (!currentUserEmail) return;
  var user = findUserByEmail(currentUserEmail);
  if (!user) return;

  document.getElementById('dashboard-email').textContent = user.email;
  document.getElementById('dashboard-info-email').textContent = user.email;
  document.getElementById('dashboard-info-since').textContent = formatDate(user.registeredAt);

  renderPurchasesList(user);
  renderCouponsList(user);
  renderReturnsList(user);
}

function renderPurchasesList(user) {
  var container = document.getElementById('dashboard-purchases-list');
  var purchases = user.purchases || [];

  if (purchases.length === 0) {
    container.innerHTML = '<p class="dashboard-empty">Aún no has realizado ninguna compra.</p>';
    return;
  }

  var html = '<div class="dashboard-list">';
  purchases.slice().reverse().forEach(function (item) {
    html +=
        '<div class="dashboard-item">' +
        '<div class="dashboard-item-info">' +
        '<strong>' + item.title + '</strong>' +
        '<span>' + formatDate(item.date) + '</span>' +
        '</div>' +
        '<span class="dashboard-item-price">S/. ' + item.price + '</span>' +
        '<button class="btn-return" type="button" data-purchase-id="' + item.id + '">Solicitar devolución</button>' +
        '</div>';
  });
  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.btn-return').forEach(function (btn) {
    btn.addEventListener('click', function () {
      requestReturn(btn.getAttribute('data-purchase-id'));
    });
  });
}

function renderCouponsList(user) {
  var container = document.getElementById('dashboard-coupons-list');
  var coupons = user.coupons || [];

  if (coupons.length === 0) {
    container.innerHTML = '<p class="dashboard-empty">No has utilizado ningún cupón todavía.</p>';
    return;
  }

  var html = '<div class="dashboard-list">';
  coupons.slice().reverse().forEach(function (c) {
    html +=
        '<div class="dashboard-item">' +
        '<div class="dashboard-item-info">' +
        '<strong>' + c.code + '</strong>' +
        '<span>' + formatDate(c.date) + '</span>' +
        '</div>' +
        '<span class="cart-coupon success">-' + c.discount + '%</span>' +
        '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function renderReturnsList(user) {
  var container = document.getElementById('dashboard-returns-list');
  var returns = user.returns || [];

  if (returns.length === 0) {
    container.innerHTML = '<p class="dashboard-empty">No tienes devoluciones registradas.</p>';
    return;
  }

  var html = '<div class="dashboard-list">';
  returns.slice().reverse().forEach(function (item) {
    html +=
        '<div class="dashboard-item">' +
        '<div class="dashboard-item-info">' +
        '<strong>' + item.title + '</strong>' +
        '<span>Comprado: ' + formatDate(item.date) + ' · Devuelto: ' + formatDate(item.returnDate) + '</span>' +
        '</div>' +
        '<span class="return-tag">Devuelto</span>' +
        '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function requestReturn(purchaseId) {
  if (!currentUserEmail) return;
  var user = findUserByEmail(currentUserEmail);
  if (!user) return;

  var purchase = (user.purchases || []).find(function (p) {
    return p.id === purchaseId;
  });
  if (!purchase) return;

  var confirmReturn = confirm('¿Deseas solicitar la devolución de "' + purchase.title + '"?');
  if (!confirmReturn) return;

  updateUser(currentUserEmail, function (u) {
    u.purchases = (u.purchases || []).filter(function (p) {
      return p.id !== purchaseId;
    });
    u.returns = u.returns || [];
    u.returns.push({
      id: 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      title: purchase.title,
      price: purchase.price,
      date: purchase.date,
      returnDate: new Date().toISOString()
    });
  });

  renderDashboard();
  showToast('↩️ Devolución solicitada para "' + purchase.title + '".');
}

/* ------------------------------------------------------------
   6. MODAL 1 — DETALLES DEL JUEGO
   ------------------------------------------------------------ */
var gameDetails = {
  cs2: {
    title: 'Counter-Strike 2',
    platform: 'PC / STEAM',
    genre: 'Shooter táctico',
    developer: 'Valve',
    year: '2023',
    price: 58,
    image: 'https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359',
    description: 'La evolución del shooter táctico más jugado del mundo: nuevas físicas de humo, un motor de sonido renovado y mapas remasterizados elevan cada intercambio de disparos a un nivel de precisión nunca visto en la franquicia.'
  },
  minecraft: {
    title: 'Minecraft',
    platform: 'Xbox Series X',
    genre: 'Sandbox / Mundo abierto',
    developer: 'Mojang Studios',
    year: '2011',
    price: 110,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd5gr2YHx65IVjx04i5nnj9PrYbAayydNipA&s',
    description: 'Construye, explora y sobrevive en un mundo generado por bloques que nunca se repite. Desde castillos imposibles hasta granjas automáticas, el único límite es tu imaginación y la llegada de la noche.'
  },
  'mario-party': {
    title: 'Mario Party',
    platform: 'Nintendo Switch',
    genre: 'Fiesta / Multijugador',
    developer: 'Nintendo',
    year: '2018',
    price: 150,
    image: 'https://mario.wiki.gallery/images/thumb/9/90/Mario_Party_2021_Logo_.png/250px-Mario_Party_2021_Logo_.png',
    description: 'Reúne hasta cuatro jugadores en un tablero repleto de minijuegos, estrellas y alianzas rotas. Perfecto para noches de risas garantizadas con amigos o en familia.'
  },
  re4: {
    title: 'Resident Evil 4 - Remake',
    platform: 'PC / Steam',
    genre: 'Survival Horror',
    developer: 'Capcom',
    year: '2023',
    price: 170,
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/2509/85p2Dwh5iDhUzRKe40QeNYh3.png',
    description: 'Leon S. Kennedy regresa a una España rural infestada de horror en esta reconstrucción total del clásico de Capcom, con gráficos de última generación y un combate más visceral que nunca.'
  },
  halo: {
    title: 'Halo: The Master Chief Collection',
    platform: 'PS5 / Xbox',
    genre: 'Shooter en primera persona',
    developer: '343 Industries',
    year: '2019',
    price: 200,
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg?t=1774466074',
    description: 'Toda la saga del Jefe Maestro reunida en una sola colección, con gráficos remasterizados, multijugador clásico y campañas que marcaron la historia de los shooters de consola.'
  },
  gtav: {
    title: 'GTA V Online',
    platform: 'PC',
    genre: 'Acción / Mundo abierto',
    developer: 'Rockstar Games',
    year: '2013',
    price: 160,
    image: 'https://static.wikia.nocookie.net/esgta/images/1/1b/Car%C3%A1tula_GTA_V.jpg/revision/latest/scale-to-width-down/1200?cb=20130402191528',
    description: 'Sube de rango en la ciudad de Los Santos junto a otros 29 jugadores: organiza atracos, compra propiedades y construye tu propio imperio criminal en línea.'
  }
};

var modalDetails = document.getElementById('modal-details');

document.querySelectorAll('.btn-details').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var gameId = btn.getAttribute('data-game-id');
    var data = gameDetails[gameId];
    if (!data || !modalDetails) return;

    // Manipulación del DOM: textContent + innerHTML + atributos de imagen
    document.getElementById('modal-details-title').textContent = data.title;
    document.getElementById('modal-details-platform').textContent = data.platform;
    document.getElementById('modal-details-meta').innerHTML =
        data.genre + ' &middot; ' + data.developer + ' &middot; ' + data.year;
    document.getElementById('modal-details-desc').textContent = data.description;
    document.getElementById('modal-details-price').textContent = 'S/. ' + data.price;

    var img = document.getElementById('modal-details-img');
    img.src = data.image;
    img.alt = data.title;

    openModal(modalDetails);
  });
});

/* ------------------------------------------------------------
   7. MODAL 2 — TÉRMINOS Y CONDICIONES
   ------------------------------------------------------------ */
var termsLink = document.getElementById('terms-link');
var modalTerms = document.getElementById('modal-terms');

if (termsLink && modalTerms) {
  termsLink.addEventListener('click', function (e) {
    e.preventDefault();
    openModal(modalTerms);
  });
}

/* ------------------------------------------------------------
   8. MODAL 3 — CARRITO DE COMPRAS (con persistencia)
   ------------------------------------------------------------ */
var cart = [];
var discountPercent = 0;
var validCoupons = { PIXEL10: 10, GAMER20: 20, VAULT15: 15 };

var cartFloatBtn = document.getElementById('cart-float-btn');
var cartBadge = document.getElementById('cart-badge');
var modalCart = document.getElementById('modal-cart');
var cartItemsList = document.getElementById('cart-items-list');
var cartTotalEl = document.getElementById('cart-total');
var cartCouponMsg = document.getElementById('cart-coupon-msg');
var applyCouponBtn = document.getElementById('apply-coupon-btn');
var checkoutBtn = document.getElementById('checkout-btn');

function updateCartBadge() {
  if (!cartBadge) return;
  cartBadge.textContent = cart.length;
  cartBadge.classList.remove('bump');
  void cartBadge.offsetWidth; // fuerza el reflow para reiniciar la animación
  cartBadge.classList.add('bump');
}

function getCartSubtotal() {
  return cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
}

function renderCart() {
  if (!cartItemsList || !cartTotalEl) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
  } else {
    var html = '';
    cart.forEach(function (item) {
      html +=
          '<div class="cart-item">' +
          '<span class="cart-item-name">' + item.title + '</span>' +
          '<span class="cart-item-price">S/. ' + item.price + '</span>' +
          '</div>';
    });
    cartItemsList.innerHTML = html;
  }

  var subtotal = getCartSubtotal();
  var total = subtotal - (subtotal * discountPercent) / 100;
  cartTotalEl.textContent = 'S/. ' + total.toFixed(2);
}

function addToCart(title, price) {
  cart.push({ title: title, price: price });
  persistCart();
  updateCartBadge();
  renderCart();
}

document.querySelectorAll('.btn-card').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var original = btn.textContent;
    var title = btn.getAttribute('data-title') || 'Juego';
    var price = parseFloat(btn.getAttribute('data-price')) || 0;

    btn.textContent = '✓ Agregado';
    btn.classList.add('added');
    btn.disabled = true;

    addToCart(title, price);
    showToast('🛒 ' + title + ' agregado al carrito (' + cart.length + ')');
    console.log('[PixelVault] Evento capturado: se agregó "' + title + '". Total en carrito: ' + cart.length);

    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('added');
      btn.disabled = false;
    }, 3000);
  });
});

if (cartFloatBtn && modalCart) {
  cartFloatBtn.addEventListener('click', function () {
    renderCart();
    openModal(modalCart);
  });
}

// ENTRADA/SALIDA: prompt para aplicar el cupón
if (applyCouponBtn) {
  applyCouponBtn.addEventListener('click', function () {
    var code = prompt('Ingresa tu código de descuento:');

    if (code === null) {
      return; // el usuario presionó "Cancelar"
    }

    code = code.trim().toUpperCase();

    if (code === '') {
      alert('⚠️ Debes ingresar un código de cupón.');
      return;
    }

    if (validCoupons.hasOwnProperty(code)) {
      discountPercent = validCoupons[code];
      cartCouponMsg.textContent = '✅ Cupón "' + code + '" aplicado: ' + discountPercent + '% de descuento.';
      cartCouponMsg.classList.remove('error');
      cartCouponMsg.classList.add('success');

      if (currentUserEmail) {
        updateUser(currentUserEmail, function (user) {
          user.coupons = user.coupons || [];
          user.coupons.push({ code: code, discount: discountPercent, date: new Date().toISOString() });
        });
      }

      renderCart();
      showToast('🎉 Cupón aplicado correctamente');
    } else {
      // SALIDA: alert cuando el cupón es inválido
      discountPercent = 0;
      cartCouponMsg.textContent = '';
      cartCouponMsg.classList.remove('success');
      cartCouponMsg.classList.add('error');
      alert('❌ El cupón "' + code + '" no es válido o ha expirado.');
      renderCart();
    }
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. Agrega algún juego antes de finalizar la compra.');
      return;
    }

    if (!currentUserEmail) {
      showToast('Inicia sesión para completar tu compra');
      closeModal(modalCart);
      openModal(modalLogin);
      return;
    }

    var subtotal = getCartSubtotal();
    var total = subtotal - (subtotal * discountPercent) / 100;
    var confirmacion = confirm('¿Confirmas tu compra por un total de S/. ' + total.toFixed(2) + '?');

    if (confirmacion) {
      var now = new Date().toISOString();
      var purchasedItems = cart.map(function (item) {
        return {
          id: 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          title: item.title,
          price: item.price,
          date: now
        };
      });

      updateUser(currentUserEmail, function (user) {
        user.purchases = (user.purchases || []).concat(purchasedItems);
        user.cart = [];
      });

      cart = [];
      discountPercent = 0;
      cartCouponMsg.textContent = '';
      cartCouponMsg.classList.remove('success', 'error');
      updateCartBadge();
      renderCart();
      closeModal(modalCart);
      showToast('✅ ¡Compra realizada con éxito! Revisa tu historial en "Mi Perfil".');
    }
  });
}

/* ------------------------------------------------------------
   9. SELECT DE PLATAFORMA — EVENTO change (onchange)
   ------------------------------------------------------------ */
var platformSelect = document.getElementById('plataforma');
var platformMsg = document.getElementById('platform-msg');

var platformLabels = {
  ps5: 'PlayStation 5',
  xbox: 'Xbox Series X/S',
  switch: 'Nintendo Switch',
  pc: 'PC / Steam',
  movil: 'dispositivos móviles'
};

if (platformSelect && platformMsg) {
  platformSelect.addEventListener('change', function () {
    var label = platformLabels[platformSelect.value];
    if (label) {
      platformMsg.textContent = '¡Excelente elección para jugar en ' + label + '!';
      platformMsg.classList.add('show');
    } else {
      platformMsg.textContent = '';
      platformMsg.classList.remove('show');
    }
  });
}

/* ------------------------------------------------------------
   10. FORMULARIO DE CONTACTO (validación + confirm de envío)
   ------------------------------------------------------------ */
var form = document.getElementById('contact-form');

function showError(input, message) {
  var group = input.closest('.form-group');
  group.classList.add('has-error');
  var errorEl = group.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isValid = true;
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    var nombre = document.getElementById('nombre');
    if (!nombre.value.trim() || nombre.value.trim().length < 2) {
      showError(nombre, 'El nombre debe tener al menos 2 caracteres.');
      isValid = false;
    }

    var apellido = document.getElementById('apellido');
    if (!apellido.value.trim() || apellido.value.trim().length < 2) {
      showError(apellido, 'El apellido debe tener al menos 2 caracteres.');
      isValid = false;
    }

    var email = document.getElementById('email');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email, 'Ingresa un correo electrónico válido.');
      isValid = false;
    }

    var mensaje = document.getElementById('mensaje');
    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
      showError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // ENTRADA/SALIDA: confirm antes de enviar el formulario
    var deseaEnviar = confirm('¿Estás seguro de enviar esta consulta?');

    if (deseaEnviar) {
      showToast('✅ Mensaje enviado correctamente. ¡Gracias!');
      form.reset();
      if (platformMsg) {
        platformMsg.textContent = '';
        platformMsg.classList.remove('show');
      }
    } else {
      showToast('✋ Envío cancelado. Puedes revisar tu mensaje.');
    }
  });
}

/* ------------------------------------------------------------
   11. AÑO ACTUAL EN EL FOOTER
   ------------------------------------------------------------ */
var yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   12. INICIALIZACIÓN
   ------------------------------------------------------------ */
loadInitialCart();
updateCartBadge();
renderCart();
refreshAuthUI();