
// MENÚ PARA CELULARES
const botonMenu = document.getElementById('menuBoton');
const menu = document.getElementById('menu');

botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');

    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute(
        'aria-label',
        abierto ? 'Cerrar menú' : 'Abrir menú'
    );
});

// CERRAR EL MENÚ AL SELECCIONAR UNA SECCIÓN
document.querySelectorAll('#menu a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        menu.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir menú');
    });
});

// AÑO AUTOMÁTICO
document.getElementById('anio').textContent =
    new Date().getFullYear();
 
// ANIMACIONES AL DESPLAZARSE

const elementosAnimados = document.querySelectorAll(
  '.seccion h2, .tarjeta, .servicio, .seccion .texto, ' +
  '.actuacion-habilidad, .disponibilidad-voz, ' +
  '.estadistica, .habilidad-item, .experiencia-bloque, ' +
  '.sobre-mi-texto, .fortaleza'
);


const reducirMovimiento = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!reducirMovimiento &&
    'IntersectionObserver' in window) {

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  elementosAnimados.forEach(elemento => {
    elemento.classList.add('animacion-entrada');
    observador.observe(elemento);
  });

}

// BARRA DE PROGRESO DE LECTURA

console.log('Barra encontrada:', barraProgreso !== null);

function actualizarProgreso() {
    const documento = document.documentElement;

    const desplazamiento = window.scrollY;

    const alturaDesplazable =
        documento.scrollHeight - window.innerHeight;

    const porcentaje = alturaDesplazable > 0
        ? Math.min(100, Math.max(0,
            (desplazamiento / alturaDesplazable) * 100))
        : 100;

    barraProgreso.style.width = `${porcentaje}%`;

    barraProgreso.setAttribute(
        'aria-valuenow',
        String(Math.round(porcentaje))
    );
}

window.addEventListener('scroll', actualizarProgreso, {
    passive: true
});

window.addEventListener('resize', actualizarProgreso);

window.addEventListener('load', actualizarProgreso);

actualizarProgreso();

// BOTÓN VOLVER ARRIBA

const botonVolverArriba = document.getElementById('volverArriba');

function controlarBotonArriba() {
    if (window.scrollY > 400) {
        botonVolverArriba.classList.add('mostrar');
    } else {
        botonVolverArriba.classList.remove('mostrar');
    }
}

botonVolverArriba.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches ? 'instant' : 'smooth'
    });
});

window.addEventListener('scroll', controlarBotonArriba, {
    passive: true
});

controlarBotonArriba();

// BUSCADOR DE PROYECTOS

const buscarProyecto = document.getElementById('buscarProyecto');
const tarjetasProyectos = document.querySelectorAll(
    '#proyectos .tarjeta'
);
const sinResultados = document.getElementById('sinResultados');

buscarProyecto.addEventListener('input', () => {
    const busqueda = buscarProyecto.value
        .toLowerCase()
        .trim();

    let encontrados = 0;

    tarjetasProyectos.forEach(tarjeta => {
        const contenido = tarjeta.textContent.toLowerCase();
        const coincide = contenido.includes(busqueda);

        tarjeta.hidden = !coincide;

        if (coincide) {
            encontrados++;
        }
    });

    sinResultados.hidden = encontrados !== 0;
});

// EFECTO DE ESCRITURA AUTOMÁTICA

const textoAnimado = document.getElementById('textoAnimado');

const profesionesEdu = [
  'Configurador de Minecraft',
  'Director creativo',
  'Desarrollador de bots Discord',
  'Roleplayer'
];

if (textoAnimado) {
  const reducirMovimientoTexto = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reducirMovimientoTexto) {
    // Mostrar una frase fija si el usuario prefiere menos movimiento
    textoAnimado.textContent = profesionesEdu.join(' · ');
  } else {
    let indiceProfesion = 0;
    let indiceLetra = 0;
    let borrando = false;

    function animarEscritura() {
      const frase = profesionesEdu[indiceProfesion];

      if (!borrando) {
        indiceLetra++;
        textoAnimado.textContent = frase.slice(0, indiceLetra);

        if (indiceLetra === frase.length) {
          borrando = true;
          setTimeout(animarEscritura, 1800);
          return;
        }
      } else {
        indiceLetra--;
        textoAnimado.textContent = frase.slice(0, indiceLetra);

        if (indiceLetra === 0) {
          borrando = false;
          indiceProfesion =
            (indiceProfesion + 1) % profesionesEdu.length;

          setTimeout(animarEscritura, 350);
          return;
        }
      }

      setTimeout(animarEscritura, borrando ? 45 : 95);
    }

    animarEscritura();
  }
}

// CONTACTO DIRECTO MEDIANTE GMAIL

const formularioContacto = document.getElementById('formularioContacto');

if (formularioContacto) {
  formularioContacto.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById('contactoNombre').value.trim();
    const email = document.getElementById('contactoEmail').value.trim();
    const mensaje = document.getElementById('contactoMensaje').value.trim();

    const destinatario = 'eduardo.grang05@gmail.com';
    const asunto = 'Nuevo Mensaje - Portafolio de Edu';

    const cuerpo =
      `Nombre: ${nombre}\n` +
      `Email: ${email}\n\n` +
      `Mensaje:\n${mensaje}`;

    const enlaceGmail =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      '&to=' + encodeURIComponent(destinatario) +
      '&su=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(cuerpo);

    window.location.href = enlaceGmail;
  });
}
