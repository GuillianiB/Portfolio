/* ================================================================
   main.js — C&G Services
   Estructura:
   1.  PROJECTS — array de datos de proyectos (EDITA AQUÍ)
   2.  Cursor personalizado
   3.  Navbar — efecto scroll
   4.  Generación de tarjetas de proyectos
   5.  Modal — abrir, cerrar, rellenar contenido
   6.  Scroll reveal — animaciones al entrar al viewport
   7.  Utilidades
================================================================ */


/* ================================================================
   1. DATOS DE PROYECTOS
   ---------------------------------------------------------------
   Para AGREGAR un proyecto:
     - Copia uno de los objetos y pégalo al final del array.
     - Cambia el id (número único).
     - Rellena todos los campos.

   Para MODIFICAR un proyecto:
     - Encuentra el objeto por su "id" o "title" y edita los campos.

   Para ELIMINAR un proyecto:
     - Borra el objeto completo (incluidas las llaves {} y la coma).

   Campos disponibles:
     id          → número único (no repetir)
     num         → texto del número visible en la tarjeta (ej: "01")
     title       → nombre del proyecto
     tag         → categoría/etiqueta corta
     cardDesc    → descripción corta para la tarjeta
     subtitle    → subtítulo que aparece en el modal
     description → descripción larga en el modal (puede tener \n)
     tech        → array de tecnologías usadas
     features    → array de características (lista en el modal)
     results     → array de { num, label } para métricas de impacto
                   (máximo 4, se muestran en grid 2x2)
     visual      → SVG inline como string (la ilustración del proyecto)
================================================================ */
const PROJECTS = [

  /* ─── PROYECTO 1 ─── */
  {
    id: 1,
    num: "01",
    title: "4 Formularios",
    tag: "Gestión Documental",
    cardDesc: "Aplicación de gestión documental que digitaliza procesos manuales complejos, adaptada a las necesidades del usuario final.",
    subtitle: "Plataforma de digitalización de procesos documentales para eliminar el flujo manual de papel.",
    description: "Esta aplicación transforma un proceso 100% manual de gestión de documentos en una solución digital integrada. Los usuarios pueden crear, consultar, aprobar y archivar formularios desde cualquier dispositivo, eliminando errores humanos y tiempos de espera.\n\nDesarrollada sobre Microsoft Power Apps con integración a SharePoint para el almacenamiento seguro de registros.",
    tech: ["Power Apps", "SharePoint", "Power Automate", "Microsoft 365"],
    features: [
      "Digitalización de 4 tipos de formularios distintos",
      "Flujo de aprobación automático con notificaciones",
      "Historial de versiones y trazabilidad completa",
      "Generación de PDF al completar cada formulario",
      "Panel de administración para gestionar usuarios"
    ],
    results: [
      { num: "90%",  label: "Reducción de papel" },
      { num: "3x",   label: "Más rápido" }, 
      { num: "100%", label: "Auditable" },
      { num: "0",    label: "Errores de datos" }
    ],
    /* Ilustración SVG del proyecto — puedes reemplazar por un <img> o una URL */
    visual: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="65" height="85" rx="4" stroke="#00e6b4" stroke-width="1.5" fill="none"/>
      <rect x="28" y="24" width="48" height="5" rx="2" fill="#00e6b4" opacity="0.6"/>
      <rect x="28" y="36" width="35" height="5" rx="2" fill="#0099ff" opacity="0.5"/>
      <rect x="28" y="48" width="42" height="5" rx="2" fill="#00e6b4" opacity="0.4"/>
      <rect x="28" y="60" width="30" height="5" rx="2" fill="#0099ff" opacity="0.3"/>
      <rect x="28" y="72" width="38" height="5" rx="2" fill="#00e6b4" opacity="0.3"/>
      <circle cx="88" cy="80" r="18" fill="#0a1628" stroke="#00e6b4" stroke-width="1.5"/>
      <path d="M81 80l4.5 4.5L96 73" stroke="#00e6b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  /* ─── PROYECTO 2 ─── */
  {
    id: 2,
    num: "02",
    title: "APP QR",
    tag: "Móvil & Recursos Humanos",
    cardDesc: "Aplicación móvil para escanear códigos QR, enfocada en la administración de personal con alta adaptabilidad.",
    subtitle: "Solución móvil para control y administración de personal mediante lectura de códigos QR.",
    description: "APP QR es una aplicación móvil desarrollada en Power Apps que permite a los responsables de RRHH escanear códigos QR asignados a cada empleado para registrar asistencia, consultar información y gestionar solicitudes en tiempo real.\n\nDiseñada para funcionar en dispositivos Android e iOS sin necesidad de hardware adicional, con sincronización instantánea a la base de datos central.",
    tech: ["Power Apps Mobile", "QR Scanner API", "Dataverse", "Azure AD"],
    features: [
      "Escaneo de QR con cámara del dispositivo",
      "Registro de asistencia y movimientos en tiempo real",
      "Consulta de ficha de empleado completa",
      "Gestión de solicitudes y permisos desde móvil",
      "Sincronización offline con resolución de conflictos"
    ],
    results: [
      { num: "2min", label: "Registro por empleado" },
      { num: "iOS/And", label: "Multiplataforma" },
      { num: "Real-time", label: "Sincronización" },
      { num: "500+", label: "Registros/día" }
    ],
    visual: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="8" width="50" height="90" rx="8" stroke="#00e6b4" stroke-width="1.5" fill="none"/>
      <rect x="42" y="16" width="36" height="62" rx="2" fill="rgba(0,230,180,0.04)" stroke="rgba(0,230,180,0.15)" stroke-width="1"/>
      <circle cx="60" cy="88" r="4" fill="none" stroke="#00e6b4" stroke-width="1.5"/>
      <!-- QR simplificado -->
      <rect x="47" y="22" width="8" height="8" rx="1" fill="#00e6b4" opacity="0.7"/>
      <rect x="65" y="22" width="8" height="8" rx="1" fill="#00e6b4" opacity="0.7"/>
      <rect x="47" y="40" width="8" height="8" rx="1" fill="#00e6b4" opacity="0.7"/>
      <rect x="57" y="30" width="6" height="6" rx="1" fill="#0099ff" opacity="0.5"/>
      <rect x="65" y="38" width="8" height="4" rx="1" fill="#0099ff" opacity="0.5"/>
      <rect x="57" y="40" width="4" height="8" rx="1" fill="#00e6b4" opacity="0.4"/>
      <rect x="65" y="44" width="8" height="4" rx="1" fill="#0099ff" opacity="0.5"/>
    </svg>`
  },

  /* ─── PROYECTO 3 ─── */
  {
    id: 3,
    num: "03",
    title: "EPP",
    tag: "Auditoría & Equipo",
    cardDesc: "Plataforma para pedidos de equipo de personal con generación automática de documentos PDF para auditorías.",
    subtitle: "Sistema integral de solicitud y control de Equipos de Protección Personal con documentación automática.",
    description: "EPP (Equipo de Protección Personal) es una aplicación que permite a los empleados solicitar equipos de trabajo, en caso de pérdida o requerir otro equipo asi como también a los auditores consultar toda la trazabilidad en documentos PDF generados automáticamente.\n\nCada solicitud genera un expediente digital con firma electrónica, fecha y detalle del equipo entregado, cumpliendo normativas de auditoría interna.",
    tech: ["Power Apps", "Power Automate", "PDF Generation", "SharePoint", "Power BI"],
    features: [
      "Catálogo de equipos con imágenes y descripciones",
      "Generación automática de PDF por solicitud",
      "Dashboard de auditoría con filtros avanzados",
      "Historial completo por empleado y por equipo",
      "Alertas de reposición por stock mínimo"
    ],
    results: [
      { num: "100%", label: "Trazabilidad" },
      { num: "-80%", label: "Tiempo de gestión" },
      { num: "PDF Auto", label: "Documentación" },
      { num: "0 papel", label: "Proceso digital" }
    ],
    visual: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="15" width="70" height="88" rx="4" stroke="#7c3aed" stroke-width="1.5" fill="none"/>
      <path d="M18 30h70" stroke="rgba(124,58,237,0.3)" stroke-width="1"/>
      <rect x="26" y="38" width="50" height="6" rx="2" fill="#00e6b4" opacity="0.5"/>
      <rect x="26" y="50" width="38" height="5" rx="2" fill="#0099ff" opacity="0.4"/>
      <rect x="26" y="62" width="45" height="5" rx="2" fill="#7c3aed" opacity="0.4"/>
      <rect x="26" y="74" width="32" height="5" rx="2" fill="#00e6b4" opacity="0.3"/>
      <circle cx="92" cy="88" r="20" fill="#080a0f" stroke="#00e6b4" stroke-width="1.5"/>
      <path d="M85 88l4 4 9-9" stroke="#00e6b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="26" y="26" font-family="monospace" font-size="7" fill="#7c3aed" opacity="0.8">EPP — DOCUMENTO</text>
    </svg>`
  }

  /* ─── AGREGA MÁS PROYECTOS AQUÍ ───
  ,{
    id: 4,
    num: "04",
    title: "Nombre del proyecto",
    tag: "Categoría",
    cardDesc: "Descripción corta para la tarjeta.",
    subtitle: "Subtítulo del modal.",
    description: "Descripción larga...",
    tech: ["Tech 1", "Tech 2"],
    features: ["Feature 1", "Feature 2"],
    results: [
      { num: "X%", label: "Métrica 1" },
      { num: "Yz", label: "Métrica 2" }
    ],
    visual: `<svg>...</svg>`
  }
  */
];


/* ================================================================
   2. CURSOR PERSONALIZADO
   Mueve el cursor pequeño instantáneamente y el anillo
   con lag para efecto de inercia.
================================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  /* Anima el anillo con suavizado (lerp) */
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Expande el anillo sobre elementos interactivos */
  document.querySelectorAll('button, a, .project-card, .service-item, .modal-close').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });
})();


/* ================================================================
   3. NAVBAR — efecto al hacer scroll
   Cambia la opacidad del fondo cuando se baja.
================================================================ */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(8,10,15,0.97)';
    } else {
      nav.style.background = 'rgba(8,10,15,0.75)';
    }
  });
})();


/* ================================================================
   4. GENERACIÓN DE TARJETAS DE PROYECTOS
   Lee el array PROJECTS y crea el HTML de cada tarjeta
   inyectándolo en #projects-grid.
================================================================ */
(function renderProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROJECTS.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <!-- Línea de acento superior (animada en hover por CSS) -->
      <div class="card-accent-line"></div>

      <!-- Imagen / ilustración -->
      <div class="card-image-wrap">
        <div class="card-visual">
          ${project.visual}
        </div>
        <div class="card-tag">${project.tag}</div>
      </div>

      <!-- Contenido de la tarjeta -->
      <div class="card-body">
        <div class="card-num">${project.num} / PROYECTO</div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.cardDesc}</p>
        <button class="card-btn" data-project-id="${project.id}" aria-label="Ver detalles de ${project.title}">
          Ver detalles
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;

    /* Abre el modal al hacer click en la tarjeta completa */
    card.addEventListener('click', () => openModal(project.id));

    grid.appendChild(card);
  });

  /* Re-observa los elementos recién creados para el scroll reveal */
  initScrollReveal();
})();


/* ================================================================
   5. MODAL — abrir, cerrar, rellenar contenido
================================================================ */
const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');

/* — Abre el modal con los datos del proyecto indicado por id — */
function openModal(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  /* Rellena los campos del modal */
  document.getElementById('modal-tag').textContent      = project.tag;
  document.getElementById('modal-num').textContent      = `${project.num} / PROYECTO`;
  document.getElementById('modal-title').textContent    = project.title;
  document.getElementById('modal-subtitle').textContent = project.subtitle;
  document.getElementById('modal-desc').textContent     = project.description;
  document.getElementById('modal-visual').innerHTML     = project.visual;

  /* Tecnologías → pills */
  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = project.tech
    .map(t => `<span class="tech-pill">${t}</span>`)
    .join('');

  /* Características → lista */
  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = project.features
    .map(f => `<li>${f}</li>`)
    .join('');

  /* Resultados / métricas */
  const resultsContainer = document.getElementById('modal-results');
  resultsContainer.innerHTML = project.results
    .map(r => `
      <div class="result-item">
        <span class="result-num">${r.num}</span>
        <span class="result-label">${r.label}</span>
      </div>
    `).join('');

  /* Muestra el overlay */
  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden'; /* evita scroll de fondo */
}

/* — Cierra el modal — */
function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* Cierra con el botón X */
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

/* Cierra al hacer click en el overlay (fuera del modal) */
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* Cierra con la tecla Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ================================================================
   6. SCROLL REVEAL
   Observa elementos con clase .reveal y les añade .is-visible
   cuando entran al viewport, disparando la transición CSS.
================================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); /* deja de observar una vez visible */
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* Ejecuta reveal en los elementos estáticos del HTML */
document.querySelectorAll('.stat-item, .service-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});

initScrollReveal();


/* ================================================================
   7. UTILIDADES
================================================================ */

/**
 * scrollToSection(id)
 * Desplaza la vista hasta la sección con el id indicado.
 * Usado en los botones del hero y el CTA.
 * @param {string} id — id del elemento destino (sin #)
 */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
