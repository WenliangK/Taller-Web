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
   (apertura/cierre reutilizable para los 3 modales del sitio)
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
   5. MODAL 1 — DETALLES DEL JUEGO
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
   6. MODAL 2 — TÉRMINOS Y CONDICIONES
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
   7. MODAL 3 — CARRITO DE COMPRAS
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

    var subtotal = getCartSubtotal();
    var total = subtotal - (subtotal * discountPercent) / 100;
    var confirmacion = confirm('¿Confirmas tu compra por un total de S/. ' + total.toFixed(2) + '?');

    if (confirmacion) {
      cart = [];
      discountPercent = 0;
      cartCouponMsg.textContent = '';
      cartCouponMsg.classList.remove('success', 'error');
      updateCartBadge();
      renderCart();
      closeModal(modalCart);
      showToast('✅ ¡Compra realizada con éxito! Revisa tu correo.');
    }
  });
}

/* ------------------------------------------------------------
   8. SELECT DE PLATAFORMA — EVENTO change (onchange)
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
   9. FORMULARIO DE CONTACTO (validación + confirm de envío)
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
   10. AÑO ACTUAL EN EL FOOTER
   ------------------------------------------------------------ */
var yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}