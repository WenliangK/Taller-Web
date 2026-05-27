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

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  var scrollY = window.scrollY;

  sections.forEach(function (section) {
    var sectionTop    = section.offsetTop - 100;
    var sectionHeight = section.offsetHeight;
    var sectionId     = section.getAttribute('id');

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


var cartCount = 0;

document.querySelectorAll('.btn-card').forEach(function (btn) {
  btn.addEventListener('click', function () {

    var original = btn.textContent;
    btn.textContent = '✔ Agregado';
    btn.classList.add('added');
    btn.disabled = true;

    cartCount++;
    showToast('🛒 Juego agregado al carrito (' + cartCount + ')');

    console.log('[PixelVault] Evento capturado: Se agregó un producto. Total en carrito: ' + cartCount);

    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('added');
      btn.disabled = false;
    }, 3000);
  });
});

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

var form = document.getElementById('contact-form');

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

    if (isValid) {
      showToast('✅ Mensaje enviado correctamente. ¡Gracias!');
      form.reset();
    }
  });
}

function showError(input, message) {
  var group = input.closest('.form-group');
  group.classList.add('has-error');

  var errorEl = group.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

var yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
