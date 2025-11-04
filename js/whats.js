(() => {
  const PHONE = "528281188792"; // MX sin '+'
  let lastOpen = 0;

  const BASE_MESSAGE =
    "Hola 👋, me interesa la promoción *{nombre}*. ¿Podrían darme más información y ejemplos?";

  // === WhatsApp SOLO TEXTO ===
  function openWhatsAppText(text) {
    const now = Date.now();
    if (now - lastOpen < 900) return; // evita doble clic
    lastOpen = now;

    const t = encodeURIComponent(text || "Hola 👋");
    const url = `https://wa.me/${PHONE}?text=${t}`;
    window.location.assign(url);
  }

  // ===== Carrusel =====
  const $track = document.getElementById("hero-track");
  const $carousel = document.getElementById("hero-carousel");
  if (!$track || !$carousel) return;

  const $slides = Array.from($track.querySelectorAll(".hero-slide"));
  const $prev = document.getElementById("hero-prev");
  const $next = document.getElementById("hero-next");
  const $dots = Array.from(document.querySelectorAll(".hero-dot"));

  let index = 0, timer = null;
  const DURATION = 5500;

  function goTo(i) {
    index = (i + $slides.length) % $slides.length;
    $track.style.transform = `translateX(${-index * 100}%)`;
    $dots.forEach((d, di) => {
      d.classList.toggle("bg-white/60", di === index);
      d.classList.toggle("bg-white/30", di !== index);
    });
  }

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  function start(){ timer = setInterval(next, DURATION); }
  function stop(){ if (timer) clearInterval(timer); }

  ["mouseenter","focusin","touchstart"].forEach(ev => $carousel.addEventListener(ev, stop, {passive:true}));
  ["mouseleave","focusout","touchend"].forEach(ev => $carousel.addEventListener(ev, start, {passive:true}));
  if ($next) $next.addEventListener("click", next);
  if ($prev) $prev.addEventListener("click", prev);
  $dots.forEach((dot,i) => dot.addEventListener("click", () => goTo(i)));

  // Click en slide → usa data-msg o mensaje base (SIN imagen)
  $slides.forEach(slide => {
    try { slide.setAttribute("type", "button"); } catch {}

    const handler = () => {
      const nombre =
        slide.querySelector("span")?.innerText?.trim() ||
        slide.querySelector("img")?.alt?.trim() ||
        "Promoción";

      const custom = (slide.dataset && slide.dataset.msg) ? String(slide.dataset.msg).trim() : "";
      const text = custom || BASE_MESSAGE.replace("{nombre}", nombre);

      openWhatsAppText(text);
    };

    slide.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    });

    slide.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        handler();
      }
    });
  });

  // Swipe en móvil
  let startX = 0, deltaX = 0;
  $carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    deltaX = 0;
  }, {passive:true});
  $carousel.addEventListener("touchmove", e => {
    deltaX = e.touches[0].clientX - startX;
  }, {passive:true});
  $carousel.addEventListener("touchend", () => {
    if (Math.abs(deltaX) > 40) (deltaX < 0 ? next() : prev());
  }, {passive:true});

  goTo(0);
  start();
})()
