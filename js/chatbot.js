document.addEventListener('DOMContentLoaded', () => {
  const botonChat = document.getElementById('bot-btn');
  const cajaChat = document.getElementById('chatbot-box');
  const input = document.getElementById('chat-input');
  const enviarBtn = document.getElementById('enviar-btn');
  const respuesta = document.getElementById('respuesta');
  const cerrarBtn = document.getElementById('cerrar-chatbot');

  // Abrir/cerrar chatbot
  botonChat?.addEventListener('click', () => {
    cajaChat.classList.toggle('hidden');
    if (!cajaChat.classList.contains('hidden')) {
      input.focus();
    }
  });

  cerrarBtn?.addEventListener('click', () => {
    cajaChat.classList.add('hidden');
  });

  enviarBtn?.addEventListener('click', () => {
    procesarPregunta();
  });

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      procesarPregunta();
    }
  });

  function procesarPregunta() {
    const pregunta = input.value.trim().toLowerCase();
    if (!pregunta) return;

    input.value = '';
    respuesta.textContent = '';
    const animacion = mostrarEscribiendo();

    setTimeout(() => {
      clearInterval(animacion);
      respuesta.textContent = responder(pregunta);
    }, 1200);
  }

  function mostrarEscribiendo() {
    let puntos = 0;
    respuesta.textContent = "Escribiendo";
    const animacion = setInterval(() => {
      puntos = (puntos + 1) % 4;
      respuesta.textContent = "Escribiendo" + ".".repeat(puntos);
    }, 300);
    return animacion;
  }

  function responder(pregunta) {
    const normalizada = pregunta
      .replace(/kienes?|kien|quien/g, 'quienes')
      .replace(/ubicacion|ubicaci[oó]n|donde|ubi/g, 'ubicacion')
      .replace(/contacto|contactarlos?|ctto|contac/g, 'contacto')
      .replace(/hola|buen[oa]s?( días| tardes| noches)?/g, 'saludo');

    if (normalizada.includes('quienes')) {
      return 'Somos Quality, una papelería e imprenta con más de 10 años de experiencia.';
    }

    if (normalizada.includes('ubicacion')) {
      return 'Estamos en Josefa Ortiz de Domínguez 606, Cadereyta Jiménez, N.L. con sucursales en Centro, Plazuela y López Mateos.';
    }

    if (normalizada.includes('contacto')) {
      return 'Puedes llamarnos al 828 118 8792, 812 261 3422 o escribirnos a contabilidadlet17@gmail.com.';
    }

    if (normalizada.includes('saludo')) {
      return '¡Hola! 😊 ¿En qué podemos ayudarte hoy?';
    }

    if (normalizada.includes('que hacen') || normalizada.includes('servicios') || normalizada.includes('ofrecen')) {
      return 'Ofrecemos impresión digital, diseño gráfico, papelería, encuadernación, sellos y artículos promocionales.';
    }

    return 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla o consultar nuestra sección de contacto?';
  }
});
