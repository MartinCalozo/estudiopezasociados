document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  // Crear y agregar contenedor popup
  const popup = document.createElement("div");
  popup.className = "popup";
  document.body.appendChild(popup);

  function showPopup(message, type = "success") {
    popup.textContent = message;
    popup.className = "popup show " + type;
    popup.style.display = "block";

    // Forzar reflow para activar la animación
    void popup.offsetWidth;
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

  // Mostrar/ocultar botón de subir
    const scrollToTop = document.getElementById("scrollToTop");
    window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTop.style.display = "flex";
    } else {
        scrollToTop.style.display = "none";
    }
    });

});
