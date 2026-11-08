
/* =====================================================
   MAXI PLAYER PROFILE
   JavaScript | Interacciones y animaciones
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


  // 0. OCULTAR PANTALLA DE CARGA
  const pageLoader = document.querySelector(".page-loader");

  if (pageLoader) {
    pageLoader.classList.add("loader-hidden");
  }

  // 1. MENÚ RESPONSIVE
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });

    document.addEventListener("click", event => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  // 2. ANIMACIONES AL DESPLAZARSE
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }

  // 3. MENÚ ACTIVO SEGÚN LA SECCIÓN
  const sections = document.querySelectorAll(
    "main section[id], main section.section-anchor[id]"
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const currentId = entry.target.id;

            navLinks.forEach(link => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentId}`
              );

            });

          }

        });

      },
      {
        rootMargin: "-25% 0px -65% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

  // 4. EFECTO SUAVE EN EL BOTÓN DE DESCARGA
  const downloadButton = document.querySelector(".header-download");

  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      console.log("Descargando CV deportivo de Maxi...");
    });
  }

  // 5. DETECTAR SI EL VIDEO TIENE ID DE YOUTUBE
  const videoFrame = document.querySelector(".video-frame");
  const videoIframe = videoFrame?.querySelector("iframe");
  const videoPlaceholder = videoFrame?.querySelector(".video-placeholder");

  if (videoIframe && videoPlaceholder) {

    const videoURL = videoIframe.getAttribute("src");

    if (
      videoURL &&
      !videoURL.includes("REEMPLAZAR_ID_YOUTUBE")
    ) {
      videoPlaceholder.style.display = "none";
    } else {
      videoIframe.style.display = "none";
      videoPlaceholder.style.display = "flex";
    }

  }

  // 6. AÑO AUTOMÁTICO EN CONSOLA
  console.log("Maxi Player Profile iniciado correctamente ⚽");

});

// VISOR DE FOTOGRAFÍAS

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const counter = document.getElementById("lightbox-counter");

let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + galleryImages.length) % galleryImages.length;

  lightboxImage.src = galleryImages[currentPhoto].src;
  lightboxImage.alt = galleryImages[currentPhoto].alt;

  counter.textContent =
    `${currentPhoto + 1} / ${galleryImages.length}`;
}

galleryImages.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    showPhoto(index);
  });
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

document.querySelector(".lightbox-prev").addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

document.querySelector(".lightbox-next").addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
});