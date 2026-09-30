// Menú hamburguesa para celulares
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
// ==================================================
// FUNCIONALIDAD: AMPLIAR FOTOS Y NAVEGACIÓN GALERÍA
// ==================================================

const modal = document.getElementById('visor-fotos');
const fotoAgrandada = document.getElementById('foto-pantalla-completa');
const btnCerrar = document.querySelector('.cerrar-modal');
const btnAnterior = document.querySelector('.prev-modal');
const btnSiguiente = document.querySelector('.next-modal');

let grupoActualFotos = [];
let indiceActual = 0;

// Seleccionamos tooooodas las imágenes
const fotos = document.querySelectorAll('.galeria-grid img, .mini-galeria-servicio img');

fotos.forEach(foto => {
    foto.addEventListener('click', function(e) {
        modal.classList.add('activo'); // Aparece capa negra
        
        // ¡Magia!: Buscamos todas las "compañeras" que están dentro de esa misma caja/álbum
        const contenedorCaja = this.closest('.galeria-grid, .mini-galeria-servicio');
        grupoActualFotos = Array.from(contenedorCaja.querySelectorAll('img'));
        
        // Buscamos en qué número de posición está la que tocaste (para poder saber cuál es la siguiente)
        indiceActual = grupoActualFotos.indexOf(this);
        
        fotoAgrandada.src = grupoActualFotos[indiceActual].src; // Mostrar en grande
    });
});

// Botón de Cerrar y tocar fondo oscuro para salir
btnCerrar.addEventListener('click', () => modal.classList.remove('activo'));
modal.addEventListener('click', (e) => {
    // Para que las flechas y la imagen no cierren la pantalla
    if (e.target === modal) modal.classList.remove('activo');
});

// Función para pasar la foto
function cambiarFoto(direccion) {
    indiceActual = indiceActual + direccion;
    
    // Para hacer efecto 'Bucle' o carrusel continuo
    if (indiceActual >= grupoActualFotos.length) indiceActual = 0;   // Llegaste a la final, volver al 1 
    if (indiceActual < 0) indiceActual = grupoActualFotos.length - 1; // Vas en reversa desde el 1, ve al último
    
    fotoAgrandada.src = grupoActualFotos[indiceActual].src;
}

// Acción de Botones click 
btnAnterior.addEventListener('click', () => cambiarFoto(-1));
btnSiguiente.addEventListener('click', () => cambiarFoto(1));

// Navegación PRO: Que puedan pasarlo desde el teclado 
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('activo')) return; // Solo si pantalla oscura está encendida
    if (e.key === 'ArrowRight') cambiarFoto(1);  // Boton derecho pasa la siguiente
    if (e.key === 'ArrowLeft') cambiarFoto(-1);  // Boton izquierdo hacia atras
    if (e.key === 'Escape') modal.classList.remove('activo'); // ESCape quita la pantalla
});


// ==================================================
// EFECTO ANIMADO AL BAJAR (SCROLL REVEAL)
// ==================================================
const observarAparicion = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer');
        }
    });
}, { threshold: 0.1 }); // Se activa cuando al menos el 10% es visible

// Seleccionamos todo lo que queremos animar (Todas las tarjetas, servicios y fotos)
const elementosAAnimar = document.querySelectorAll('.card, .servicio-item, .inst-item, .video-card, .testimonio, .galeria-grid img');

elementosAAnimar.forEach(el => {
    el.classList.add('oculto-al-inicio'); // Los ocultamos de golpe al cargar
    observarAparicion.observe(el);        // El observador espera a que bajes
});

// ==================================================
// ESCONDER PANTALLA DE CARGA (VERSIÓN FORZADA RÁPIDA)
// ==================================================
const pantallaCarga = document.getElementById('pantalla-carga');

// Regla 1: Ocultar rápido si el contenido inicial ya se leyó (sin esperar a los pesados videos de Facebook)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        pantallaCarga.classList.add('ocultar-pantalla');
    }, 1000); // Desaparece al primer segundo exacto
});

// Regla 2 (Modo Seguro): Por si el internet falla, a los 2.5 segundos máximos la quita SÍ o SÍ obligatoriamente.
setTimeout(function() {
    pantallaCarga.classList.add('ocultar-pantalla');
}, 2500);