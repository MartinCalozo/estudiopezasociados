// ============================================================
// // INICIO DEL DOCUMENTO
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================================
  // FORMULARIO DE CONTACTO - POPUP de Éxito/Error
  // ==========================================================
  const form = document.getElementById("contact-form");
  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  function showPopup(message, type = "success") {
    popup.textContent = message;
    popup.className = "popup show " + type;
    popup.style.display = "block";

    void popup.offsetWidth; // fuerza reflow
    popup.classList.add("fade-in");

    setTimeout(() => {
      popup.classList.remove("fade-in");
      popup.classList.add("fade-out");
    }, 3000);

    setTimeout(() => {
      popup.classList.remove("fade-out", "show", type);
      popup.style.display = "none";
    }, 4000);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          showPopup("¡Gracias por tu consulta! Te responderemos a la brevedad.", "success");
          form.reset();
        } else {
          showPopup("Hubo un error al enviar. Intentá nuevamente más tarde.", "error");
        }
      }).catch(() => {
        showPopup("Hubo un problema de conexión.", "error");
      });
    });
  }

  // ==========================================================
  // SCROLL SUAVE EN ANCLAS
  // ==========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================
  // MENÚ HAMBURGUESA - Mostrar/Ocultar
  // ==========================================================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // ==========================================================
  // BOTÓN "VOLVER ARRIBA" FLOTANTE
  // ==========================================================
  const scrollToTop = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollToTop.style.display = "flex";
    } else {
      scrollToTop.style.display = "none";
    }
  });

}); // ← Fin DOMContentLoaded


// ============================================================
// SLIDER DE IMÁGENES
// ============================================================
const slidesContainer = document.getElementById('slideContainer');
const totalSlides = slidesContainer.children.length;
const visibleSlides = 5;
const maxIndex = totalSlides - visibleSlides;
let currentIndex = 0;

const indicatorBar = document.getElementById('indicatorBar');

// Crear indicadores dinámicamente
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  indicatorBar.appendChild(dot);
}

const indicators = document.querySelectorAll('.indicator');

function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 20}%)`;

  indicators.forEach((el, i) => {
    el.classList.toggle('active', i === currentIndex);
  });
}

function moveSlide(dir) {
  currentIndex += dir;
  if (currentIndex > maxIndex) currentIndex = 0;
  if (currentIndex < 0) currentIndex = maxIndex;
  updateSlider();
}

function goTo(index) {
  currentIndex = index;
  updateSlider();
}
