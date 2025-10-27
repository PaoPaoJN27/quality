/* ============================
   Quality — Catálogo de 21 servicios (grid + modales + WhatsApp)
   ============================ */

/* === Configuración editable === */
const PHONE = "528281188792"; // MX sin '+'
const IMG_BASE = "./img/servicios/"; // carpeta local de imágenes
const CALL_TEL = "8281188792"; // para botón Llamar

/* Tamaños uniformes para las tarjetas (ajusta si quieres) */
const CARD_W = 260; // px
const CARD_H = 200; // px
const IMG_BOX_H = 180; // px (alto del contenedor de imagen)
const IMG_MAX_H = 160; // px (alto máximo de la imagen visible)

/* === Utilidades === */
const el = (id) => document.getElementById(id);

// WhatsApp SIN imagen (solo texto con el nombre del servicio)
function openWhatsApp(nombre) {
  const msg = `Hola, me interesa el servicio ${nombre}. ¿Podrían darme más información?`;
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* === Catálogo oficial (21 servicios del folleto) === */
const SERVICES = [
  // UV RÍGIDOS (se enriquecen con aplicaciones de la ficha "Cama plana")
  { slug:"impresion-uv-acrilico", nombre:"IMPRESIÓN UV ACRÍLICO", imagen:"Impresion UV Acrilico.png",
    tipoModal:"completo",
    aplicaciones:[
      "Impresión sobre rígidos",
      "Acrílico y plásticos",
      "Señalamientos",
      "Figuras decorativas"
    ]
  },

  { slug:"impresion-uv-trovicel", nombre:"IMPRESIÓN UV TROVICEL", imagen:"Impresion UV Trovicel.png",
    tipoModal:"completo",
    aplicaciones:[
      "Impresión sobre rígidos",
      "Coroplast y trovicel",
      "Señalamientos"
    ]
  },

  { slug:"impresion-uv-coroplast", nombre:"IMPRESIÓN UV COROPLAST", imagen:"Impresion UV coroplast.png",
    tipoModal:"completo",
    aplicaciones:[
      "Impresión sobre rígidos",
      "Coroplast y trovicel",
      "Señalamientos"
    ]
  },

  { slug:"banderas", nombre:"BANDERAS", imagen:"Banderas.png",
    tipoModal:"completo",
    medidas:"Pluma / gota / recta",
    aplicaciones:["Eventos y ferias","Puntos de venta","Exteriores con base"]
  },

  { slug:"impresion-uv-mdf", nombre:"IMPRESIÓN UV MDF", imagen:"Impresion UV MDF.png",
    tipoModal:"completo",
    aplicaciones:[
      "Maderas",
      "Figuras decorativas",
      "Señalamientos"
    ]
  },

  { slug:"impresion-uv-vitropiso", nombre:"IMPRESIÓN UV VITROPISO", imagen:"Impresion UV Vitropiso.png",
    tipoModal:"completo",
    aplicaciones:[
      "Vidrio y azulejos",
      "Pisos decorativos",
      "Señalamientos"
    ]
  },

  // TEXTIL / SUBLI
  { slug:"impresion-dtf-textil", nombre:"IMPRESIÓN DTF TEXTIL", imagen:"Impresion DTF Textil.png",
    tipoModal:"completo",
    medidas:"Por metro lineal / hojas",
    aplicaciones:["Playeras y sudaderas","Uniformes","Souvenirs y textiles"]
  },

  { slug:"lonas", nombre:"LONAS", imagen:"Lonas.png",
    tipoModal:"completo",
    medidas:"Hasta 300 cm de ancho",
    aplicaciones:["Lona publicitaria","Lona traslúcida","Promociones","Colgantes con ojillos"]
  },

  { slug:"impresion-dtf-uv", nombre:"IMPRESIÓN DTF UV", imagen:"Impresion DTF UV.png",
    tipoModal:"completo",
    medidas:"Metro lineal (58 cm × 100 cm)",
    aplicaciones:[
      "Fundas de teléfono",
      "Tazas y termos",
      "Cajas de cartón",
      "Accesorios",
      "Artículos decorativos",
      "Plásticos",
      "Automóviles"
    ]
  },

  // LÁSER
  { slug:"corte-laser", nombre:"CORTE LÁSER", imagen:"Corte Laser.png",
    tipoModal:"completo",
    medidas:"Material/espesor compatibles",
    aplicaciones:[
      "Corte y grabado acrílico",
      "Cajas y figuras MDF",
      "Llaveros",
      "Decoraciones",
      "Trofeos",
      "Reconocimientos"
    ]
  },

  { slug:"grabado-laser", nombre:"GRABADO LÁSER", imagen:"Grabado Laser.png",
    tipoModal:"completo",
    medidas:"Área útil según pieza",
    aplicaciones:[
      "Grabado de termos",
      "Cajas y figuras MDF",
      "Llaveros",
      "Decoraciones",
      "Trofeos",
      "Reconocimientos"
    ]
  },

  // VINIL / MICROPERF / BANNERS
  { slug:"viniles", nombre:"VINILES", imagen:"Viniles.png",
    tipoModal:"completo",
    medidas:"Corte y/o impresión",
    aplicaciones:[
      "Vinil impreso",
      "Vinil transparente",
      "Etiquetas y stickers",
      "Decoración de vidrios",
      "Señalética"
    ]
  },

  { slug:"bordado", nombre:"BORDADO", imagen:"Bordado.png",
    tipoModal:"completo",
    aplicaciones:[
      "Logos de empresas y escuelas",
      "Camisas",
      "Prendas de vestir",
      "Pantalones",
      "Variedad de telas",
      "Sudaderas y abrigos",
      "Lapiceras escolares"
    ]
  },

  { slug:"serigrafia", nombre:"SERIGRAFÍA", imagen:"Serigrafia.png",
    tipoModal:"breve",
    descripcion:"Impresión por serigrafía para textiles y promocionales a volumen."
  },

  { slug:"sublimacion", nombre:"SUBLIMACIÓN", imagen:"Sublimacion.png",
    tipoModal:"completo",
    aplicaciones:[
      "Telas y toallas",
      "Cojines",
      "Camisas deportivas",
      "Banderas publicitarias",
      "Manteles",
      "Alfombras",
      "Rótulos textiles"
    ]
  },

  { slug:"microperforado", nombre:"MICROPERFORADO", imagen:"Microperforado.png",
    tipoModal:"completo",
    medidas:"A la medida de tu cristal",
    aplicaciones:["Ventanas de negocio","Vehículos","Privacidad con visibilidad"]
  },

  { slug:"reconocimientos", nombre:"RECONOCIMIENTOS", imagen:"Reconocimientos.png",
    tipoModal:"breve",
    descripcion:"Reconocimientos en madera, cristal o acrílico, personalizados."
  },

  { slug:"trofeos", nombre:"TROFEOS", imagen:"Trofeos.png",
    tipoModal:"breve",
    descripcion:"Trofeos y premiaciones personalizadas para todo tipo de eventos."
  },

  { slug:"anuncios-luminosos", nombre:"ANUNCIOS LUMINOSOS", imagen:"Anuncios Luminosos.png",
    tipoModal:"breve",
    descripcion:"Cajas de luz, letras y letreros luminosos para fachada."
  },

  { slug:"banners", nombre:"BANNERS", imagen:"Banners.png",
    tipoModal:"completo",
    medidas:"Roll-up, X-banner y doble cara",
    aplicaciones:["Banners para eventos","Stands portátiles","Puntos de venta"]
  },

  { slug:"rotulacion", nombre:"ROTULACIÓN", imagen:"Rotulacion.png",
    tipoModal:"completo",
    medidas:"Vehículos / locales",
    aplicaciones:["Flotillas y autos","Vidrios y muros","Imagen corporativa"]
  }
];



/* === Render del grid (4 por fila en desktop; tarjetas iguales) === */
function renderServicesGrid() {
  const grid = el("services-grid");
  if (!grid) return;

  grid.innerHTML = SERVICES.map((s) => {
    const img = IMG_BASE + s.imagen;
    return `
      <article
        class="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white cursor-pointer flex flex-col justify-between flex-none"
        data-slug="${s.slug}" tabindex="0" aria-label="${s.nombre}"
        style="width:280px;height:200px;">  <!-- tamaño fijo de la tarjeta -->

        <div class="flex items-center justify-center bg-gray-50"
             style="height:160px;">          <!-- alto del área de imagen -->
          <img src="${img}" alt="${s.nombre}" loading="lazy" decoding="async"
               class="object-contain group-hover:scale-105 transition"
               style="max-height:140px;max-width:90%;">
        </div>

        <div class="px-3 pb-3 text-center">
          <h3 class="font-extrabold tracking-wide text-sm md:text-base">${s.nombre}</h3>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("article").forEach((card) => {
    const open = () => {
      const slug = card.getAttribute("data-slug");
      const svc = SERVICES.find((x) => x.slug === slug);
      if (svc) openServiceModal(svc);
    };
    card.addEventListener("click", open);
    card.addEventListener("keypress", (e) => { if (e.key === "Enter") open(); });
  });
}


/* === Lógica del modal reutilizable === */
const modal = el("service-modal");
const modalImg = el("modal-img");
const modalTitle = el("modal-title");
const modalMedidas = el("modal-medidas");
const modalApps = el("modal-apps");
const modalAppsList = el("modal-apps-list");
const modalDesc = el("modal-desc");
const modalWA = el("modal-wa");
const modalCall = el("modal-call");

function openServiceModal(svc) {
  modalImg.src = IMG_BASE + svc.imagen;
  modalImg.alt = svc.nombre;
  modalTitle.textContent = svc.nombre;

  modalMedidas.classList.add("hidden");
  modalApps.classList.add("hidden");
  modalDesc.classList.add("hidden");

  if (svc.tipoModal === "completo") {
    if (svc.medidas) {
      modalMedidas.textContent = `Medidas: ${svc.medidas}`;
      modalMedidas.classList.remove("hidden");
    }
    if (Array.isArray(svc.aplicaciones) && svc.aplicaciones.length) {
      modalAppsList.innerHTML = svc.aplicaciones.map(a => `<li>✔ ${a}</li>`).join("");
      modalApps.classList.remove("hidden");
    } else {
      modalDesc.textContent = svc.descripcion || "Contáctanos para más información.";
      modalDesc.classList.remove("hidden");
    }
  } else {
    modalDesc.textContent = svc.descripcion || "Contáctanos para más información.";
    modalDesc.classList.remove("hidden");
  }

  modalWA.onclick = (e) => { e.preventDefault(); openWhatsApp(svc.nombre); };
  modalCall.href = `tel:${CALL_TEL}`;
  modalWA.href = "#";

  showModal();
}

function showModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  const btnClose = el("modal-close");
  if (btnClose) btnClose.focus();
}

function hideModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/* === Eventos de cierre === */
(function bindModalEvents(){
  const btnClose = el("modal-close");
  const backdrop = el("modal-backdrop");
  if (btnClose) btnClose.addEventListener("click", hideModal);
  if (backdrop) backdrop.addEventListener("click", hideModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) hideModal();
  });
})();

/* === Init === */
document.addEventListener("DOMContentLoaded", renderServicesGrid);
