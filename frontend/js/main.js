document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ✅ Carrusel de productos (sin segundo DOMContentLoaded)
    const carrusel = {
        element: document.getElementById('productos-carrusel'),
        slides: document.querySelectorAll('#productos-carrusel > div'),
        currentIndex: 0,
        interval: null,
        intervalTime: 3200,

        init: function () {
            this.slides.forEach(slide => {
                slide.style.flex = '0 0 100%';
            });

            document.getElementById('carrusel-prev')?.addEventListener('click', () => this.prev());
            document.getElementById('carrusel-next')?.addEventListener('click', () => this.next());

            document.querySelectorAll('.carrusel-indicator').forEach(indicator => {
                indicator.addEventListener('click', (e) => {
                    this.goTo(parseInt(e.target.dataset.index));
                });
            });

            this.startAutoSlide();

            this.element?.parentElement?.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.element?.parentElement?.addEventListener('mouseleave', () => this.startAutoSlide());

            this.updateIndicators();
        },

        goTo: function (index) {
            this.currentIndex = index;
            const offset = -this.currentIndex * 100;
            this.element.style.transform = `translateX(${offset}%)`;
            this.element.style.transition = 'transform 0.5s ease-in-out';
            this.updateIndicators();
        },

        next: function () {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.goTo(this.currentIndex);
        },

        prev: function () {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.goTo(this.currentIndex);
        },

        startAutoSlide: function () {
            this.stopAutoSlide();
            this.interval = setInterval(() => this.next(), this.intervalTime);
        },

        stopAutoSlide: function () {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },

        updateIndicators: function () {
            document.querySelectorAll('.carrusel-indicator').forEach((indicator, index) => {
                if (index === this.currentIndex) {
                    indicator.classList.add('bg-blue-600');
                    indicator.classList.remove('bg-gray-300');
                } else {
                    indicator.classList.remove('bg-blue-600');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }
    };

    carrusel.init();

    window.addEventListener('resize', () => {
        carrusel.goTo(carrusel.currentIndex);
    });

    // Hacer las funciones globales asignándolas a window
    window.openModal = function(type) {
        const modal = document.getElementById('modal');
        if (!modal) {
            console.error('No se encontró el elemento con ID "modal"');
            return;
        }
        
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-content');
        
        if (!modalTitle || !modalBody) {
            console.error('No se encontraron los elementos del modal');
            return;
        }

        // Verifica que el tipo de modal exista
        if (!modalContent[type]) {
            console.error(`Tipo de modal no válido: ${type}`);
            return;
        }

        modalTitle.textContent = modalContent[type].title;
        modalBody.innerHTML = modalContent[type].content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeModal = function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };

    // Datos de los modales (debe estar antes de las funciones que lo usan)
    const modalContent = {
        terms: {
            title: "Términos y Condiciones - Papelería Quality",
            content: `
                <h3>1. Aceptación de Términos</h3>
                <p>Al realizar compras en <strong>Papelería Quality</strong>, el cliente acepta estos términos y condiciones. Nos reservamos el derecho de modificar esta política sin previo aviso.</p>

                <h3>2. Productos y Precios</h3>
                <p>Los precios están sujetos a cambio sin notificación. Garantizamos la calidad de nuestros productos escolares, de oficina y artículos de regalo. En caso de defectos, aplican reemplazos dentro de las 72 horas posteriores a la compra (con ticket).</p>

                <h3>3. Métodos de Pago</h3>
                <p>Aceptamos efectivo, tarjetas de crédito/débito y transferencias bancarias. No se aceptan devoluciones de dinero, solo cambios con ticket original.</p>

                <h3>4. Horario y Ubicación</h3>
                <p>Josefa Ortiz de Domínguez 606, 67480 Cadereyta Jiménez, N.L. Horario: Lunes a Viernes 6:30 AM - 10:00 PM, Sábados 8:00 AM - 8:00 PM, Domingos 9:00 AM - 8:00 PM.</p>

                <h3>5. Contacto</h3>
                <p>Para reclamos: contabilidadlet17@gmail.com o teléfono (828) 118-8792.</p>
            `
        },
        privacy: {
            title: "Política de Calidad - Papelería Quality",
            content: `
                <h3>Compromiso de Calidad</h3>
                <p>En <strong>Papelería Quality</strong> nos comprometemos a ofrecer productos escolares, de oficina y artículos de regalo que cumplan con los estándares más altos, verificando cada artículo antes de su venta.</p>

                <h3>Objetivos</h3>
                <ul>
                    <li>Garantizar satisfacción del 100% en materiales y durabilidad</li>
                    <li>Proveer asesoría personalizada para necesidades educativas/empresariales</li>
                    <li>Renovar inventario mensualmente con tendencias actuales</li>
                </ul>

                <h3>Procesos</h3>
                <p>Todos los productos pasan por inspección visual al recibirlos. Trabajamos exclusivamente con proveedores certificados en normas ISO 9001 para artículos profesionales.</p>

                <h3>Mejora Continua</h3>
                <p>Evaluamos trimestralmente las quejas/sugerencias para optimizar nuestro servicio. Capacitamos al equipo semestralmente en nuevas tendencias del sector.</p>

                <h3>Garantías</h3>
                <p>Defectos de fábrica cubiertos hasta 30 días después de la compra (presentando ticket). No aplica en daños por mal uso.</p>
            `
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Configurar el evento para cerrar al hacer clic fuera
        const modal = document.getElementById('modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }
        
    });
});
