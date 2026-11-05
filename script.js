
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

// CONTACTO: PENDIENTE DE CONFIGURAR
document.getElementById('copiarCorreo')
    .addEventListener('click', () => {
        document.getElementById('mensajeContacto').textContent =
            'Próximamente agregaremos mis redes y correo profesional.';
    });
    
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

