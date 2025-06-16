document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  // ------------------------------
  // Popup de éxito o error
  // ------------------------------
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

  // ------------------------------
  // Envío de formulario
  // ------------------------------
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
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

  // ------------------------------
  // Scroll suave en anclas
  // ------------------------------
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

  // ------------------------------
  // Menú hamburguesa
  // ------------------------------
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Opcional: cerrar al hacer click en un enlace
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  const scrollToTop = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTop.style.display = "flex";
    } else {
        scrollToTop.style.display = "none";
    }
  })
});