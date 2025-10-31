/* ============================
   Quality — Catálogo + Modales + WhatsApp (responsive)
   ============================ */

/* === Configuración editable === */
const PHONE = "528281188792";          // MX sin '+'
const IMG_BASE = "./img/servicios/";   // carpeta local de imágenes
const CALL_TEL = "8281188792";         // para botón Llamar

/* === Utilidades === */
const el = (id) => document.getElementById(id);

// WhatsApp SIN imagen (solo texto con el nombre del servicio)
function openWhatsApp(nombre) {
  const msg = `Hola, me interesa el servicio ${nombre}. ¿Podrían darme más información?`;
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* === Catálogo oficial (21 servicios) === */
const SERVICES = [
  { slug:"impresion-uv-acrilico", nombre:"IMPRESIÓN UV ACRÍLICO", imagen:"Impresion UV Acrilico.jpg", tipoModal:"completo",
    aplicaciones:["Impresión sobre rígidos","Acrílico y plásticos","Señalamientos","Figuras decorativas"] },
  { slug:"impresion-uv-trovicel", nombre:"IMPRESIÓN UV TROVICEL", imagen:"Impresion UV Trovicel.jpg", tipoModal:"completo",
    aplicaciones:["Impresión sobre rígidos","Coroplast y trovicel","Señalamientos"] },
  { slug:"impresion-uv-coroplast", nombre:"IMPRESIÓN UV COROPLAST", imagen:"Impresion UV coroplast.jpg", tipoModal:"completo",
    aplicaciones:["Impresión sobre rígidos","Coroplast y trovicel","Señalamientos"] },
  { slug:"banderas", nombre:"BANDERAS", imagen:"Banderas.png", tipoModal:"completo",
    medidas:"Pluma / gota / recta", aplicaciones:["Eventos y ferias","Puntos de venta","Exteriores con base"] },
  { slug:"impresion-uv-mdf", nombre:"IMPRESIÓN UV MDF", imagen:"Impresion UV MDF.jpg", tipoModal:"completo",
    aplicaciones:["Maderas","Figuras decorativas","Señalamientos"] },
  { slug:"impresion-uv-vitropiso", nombre:"IMPRESIÓN UV VITROPISO", imagen:"Impresion UV Vitropiso.jpg", tipoModal:"completo",
    aplicaciones:["Vidrio y azulejos","Pisos decorativos","Señalamientos"] },
  { slug:"impresion-dtf-textil", nombre:"IMPRESIÓN DTF TEXTIL", imagen:"Impresion DTF Textil.jpg", tipoModal:"completo",
    medidas:"Por metro lineal / hojas", aplicaciones:["Playeras y sudaderas","Uniformes","Souvenirs y textiles"] },
  { slug:"lonas", nombre:"LONAS", imagen:"Lonas.png", tipoModal:"completo",
    medidas:"Hasta 300 cm de ancho", aplicaciones:["Lona publicitaria","Lona traslúcida","Promociones","Colgantes con ojillos"] },
  { slug:"impresion-dtf-uv", nombre:"IMPRESIÓN DTF UV", imagen:"Impresion DTF UV.jpg", tipoModal:"completo",
    medidas:"Metro lineal (58 cm × 100 cm)", aplicaciones:["Fundas de teléfono","Tazas y termos","Cajas de cartón","Accesorios","Artículos decorativos","Plásticos","Automóviles"] },
  { slug:"corte-laser", nombre:"CORTE LÁSER", imagen:"Corte Laser.jpg", tipoModal:"completo",
    medidas:"Material/espesor compatibles", aplicaciones:["Corte y grabado acrílico","Cajas y figuras MDF","Llaveros","Decoraciones","Trofeos","Reconocimientos"] },
  { slug:"grabado-laser", nombre:"GRABADO LÁSER", imagen:"Grabado laser.jpg", tipoModal:"completo",
    medidas:"Área útil según pieza", aplicaciones:["Grabado de termos","Cajas y figuras MDF","Llaveros","Decoraciones","Trofeos","Reconocimientos"] },
  { slug:"viniles", nombre:"VINILES", imagen:"Viniles.png", tipoModal:"completo",
    medidas:"Corte y/o impresión", aplicaciones:["Vinil impreso","Vinil transparente","Etiquetas y stickers","Decoración de vidrios","Señalética"] },
  { slug:"bordado", nombre:"BORDADO", imagen:"Bordado.jpg", tipoModal:"completo",
    aplicaciones:["Logos de empresas y escuelas","Camisas","Prendas de vestir","Pantalones","Variedad de telas","Sudaderas y abrigos","Lapiceras escolares"] },
  { slug:"serigrafia", nombre:"SERIGRAFÍA", imagen:"Serigrafia.jpg", tipoModal:"breve",
    descripcion:"Impresión por serigrafía para textiles y promocionales a volumen." },
  { slug:"sublimacion", nombre:"SUBLIMACIÓN", imagen:"Sublimacion.png", tipoModal:"completo",
    aplicaciones:["Telas y toallas","Cojines","Camisas deportivas","Banderas publicitarias","Manteles","Alfombras","Rótulos textiles"] },
  { slug:"microperforado", nombre:"MICROPERFORADO", imagen:"Microperforado.png", tipoModal:"completo",
    medidas:"A la medida de tu cristal", aplicaciones:["Ventanas de negocio","Vehículos","Privacidad con visibilidad"] },
  { slug:"reconocimientos", nombre:"RECONOCIMIENTOS", imagen:"Reconocimientos.png", tipoModal:"breve",
    descripcion:"Reconocimientos en madera, cristal o acrílico, personalizados." },
  { slug:"trofeos", nombre:"TROFEOS", imagen:"Trofeos.png", tipoModal:"breve",
    descripcion:"Trofeos y premiaciones personalizadas para todo tipo de eventos." },
  { slug:"anuncios-luminosos", nombre:"ANUNCIOS LUMINOSOS", imagen:"Anuncios Luminosos.png", tipoModal:"breve",
    descripcion:"Cajas de luz, letras y letreros luminosos para fachada." },
  { slug:"banners", nombre:"BANNERS", imagen:"Banners.png", tipoModal:"completo",
    medidas:"Roll-up, X-banner y doble cara", aplicaciones:["Banners para eventos","Stands portátiles","Puntos de venta"] },
  { slug:"rotulacion", nombre:"ROTULACIÓN", imagen:"Rotulacion.png", tipoModal:"completo",
    medidas:"Vehículos / locales", aplicaciones:["Flotillas y autos","Vidrios y muros","Imagen corporativa"] }
];

/* === Render del grid (responsivo) === */
function renderServicesGrid() {
  const grid = el("services-grid");
  if (!grid) return;

  grid.innerHTML = SERVICES.map((s) => {
    const img = IMG_BASE + s.imagen;
    return `
      <article
        class="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white cursor-pointer
               flex flex-col justify-between flex-none
               w-[clamp(200px,38vw,280px)]"
        data-slug="${s.slug}" tabindex="0" aria-label="${s.nombre}">
        <div class="flex items-center justify-center bg-gray-50
                    h-[clamp(140px,22vw,180px)]">
          <img src="${img}" alt="${s.nombre}" loading="lazy" decoding="async"
               class="max-h-[clamp(120px,20vw,160px)] max-w-[92%] object-contain
                      group-hover:scale-105 transition">
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
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") open(); });
  });
}

/* === Modal === */
const modal      = el("service-modal");
const modalImg   = el("modal-img");
const modalTitle = el("modal-title");
const modalMedidas = el("modal-medidas");
const modalApps  = el("modal-apps");
const modalAppsList = el("modal-apps-list");
const modalDesc  = el("modal-desc");
const modalWA    = el("modal-wa");
const modalCall  = el("modal-call");

/* Bloquear/desbloquear scroll del fondo */
function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}
function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

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
   lockScroll(); 
  const btnClose = el("modal-close");
  if (btnClose) btnClose.focus();
}

function hideModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
    unlockScroll();  
}

/* Cierre modal */
(function bindModalEvents(){
  const btnClose = el("modal-close");
  const backdrop = el("modal-backdrop");
  if (btnClose) btnClose.addEventListener("click", hideModal);
  if (backdrop) backdrop.addEventListener("click", hideModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) hideModal();
  });
})();

let __scrollY = 0;
const __preventTouch = (e) => e.preventDefault(); // iOS

function lockScroll() {
  // guarda posición actual
  __scrollY = window.scrollY || document.documentElement.scrollTop;

  // compensa el ancho de la barra para evitar “brincos”
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  if (sbw > 0) document.body.style.paddingRight = sbw + 'px';

  // congela el body en la posición actual
  document.body.style.position = 'fixed';
  document.body.style.top = `-${__scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';

  // evita scroll táctil en el backdrop (iOS)
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.addEventListener('touchmove', __preventTouch, { passive: false });
}

function unlockScroll() {
  // revierte estilos
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';

  // restaura la posición
  window.scrollTo(0, __scrollY || 0);

  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.removeEventListener('touchmove', __preventTouch);
}


/* Init */
document.addEventListener("DOMContentLoaded", renderServicesGrid);
