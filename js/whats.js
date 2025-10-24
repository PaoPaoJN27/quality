
(() => {
  const PHONE = "528281188792"; // MX sin '+'
  const PUBLIC_BASE_URL = "https://paopaojn27.github.io/quality/img/promocion/";// ✅ dominio real (termina con /)
  let lastOpen = 0;

  const isHttp = (u) => /^https?:\/\//i.test(u);

  function toAbs(path) {
    if (!path) return "";
    try {
      if (PUBLIC_BASE_URL) return new URL(path, PUBLIC_BASE_URL).href;
      if (isHttp(location.origin)) return new URL(path, location.origin + "/").href;
      return "";
    } catch { return ""; }
  }

  const BASE_MESSAGE =
    "Hola 👋, me interesa la promoción *{nombre}*. ¿Podrían darme más información y ejemplos?";

  function openWhatsApp(nombrePromo, imgSrc = "") {
    const now = Date.now();
    if (now - lastOpen < 900) return; // evita doble clic rápido
    lastOpen = now;

    const imgUrl = toAbs(imgSrc);
    const msg = BASE_MESSAGE.replace("{nombre}", nombrePromo);
    const text = imgUrl ? `${msg}\n${imgUrl}` : msg;
    const t = encodeURIComponent(text);

    const urls = [
      `https://api.whatsapp.com/send?phone=${PHONE}&text=${t}`,
      `https://web.whatsapp.com/send?phone=${PHONE}&text=${t}`,
      `https://wa.me/${PHONE}?text=${t}`,
    ];

    for (const u of urls) {
      try {
        const w = window.open(u, "_blank", "noopener,noreferrer");
        if (w) return;
      } catch {}
    }
    window.location.href = urls[0];
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

  // Click en slide → usa nombre + URL absoluta de imagen
  $slides.forEach(slide => {
    const handler = () => {
      const nombre =
        slide.querySelector("span")?.innerText?.trim() ||
        slide.querySelector("img")?.alt?.trim() ||
        "Promoción";
      const imgSrc = slide.querySelector("img")?.getAttribute("src") || "";
      openWhatsApp(nombre, imgSrc);
    };
    slide.addEventListener("click", handler);
    slide.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); }
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
})();
