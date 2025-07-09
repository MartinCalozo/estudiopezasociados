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
// SLIDER DE IMÁGENES RESPONSIVE
// ============================================================
const slidesContainer = document.getElementById('slideContainer');
const indicatorBar = document.getElementById('indicatorBar');
const totalSlides = slidesContainer.children.length;
let currentIndex = 0;
let visibleSlides = getVisibleSlides();
let maxIndex = totalSlides - visibleSlides;

// Ajusta el número de slides visibles según el ancho
function getVisibleSlides() {
  const width = window.innerWidth;
  if (width <= 600) return 2;
  if (width <= 979) return 3;
  if (width <= 1200) return 4;
  return 5;
}

// Crea los indicadores dinámicamente
function createIndicators() {
  indicatorBar.innerHTML = '';
  maxIndex = totalSlides - visibleSlides;

  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    indicatorBar.appendChild(dot);
  }
}

// Actualiza el slider visualmente
function updateSlider() {
  const slideWidthPercent = 100 / visibleSlides;
  slidesContainer.style.transform = `translateX(-${currentIndex * slideWidthPercent}%)`;

  document.querySelectorAll('.indicator').forEach((el, i) => {
    el.classList.toggle('active', i === currentIndex);
  });
}

// Control del slider
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

// Al cambiar el tamaño de la ventana, recalcula los valores
window.addEventListener('resize', () => {
  visibleSlides = getVisibleSlides();
  maxIndex = totalSlides - visibleSlides;
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  createIndicators();
  updateSlider();
});

// Inicializar
createIndicators();
updateSlider();
