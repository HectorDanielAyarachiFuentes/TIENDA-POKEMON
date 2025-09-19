// BARRA DESPLEGABLE
function toggleMenu() {
    var navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('show');
}

// --- MODO OSCURO / CLARO ---
const modoBoton = document.getElementById('modoBoton');

// Función para cambiar el tema. Es llamada por el atributo onclick en el HTML.
function cambiarModo() {
    document.body.classList.toggle('dark-mode');
    actualizarEstadoModo();
}

// Función para actualizar el texto del botón y guardar la preferencia en localStorage
function actualizarEstadoModo() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if (modoBoton) modoBoton.textContent = 'Modo Claro';
    } else {
        localStorage.setItem('theme', 'light');
        if (modoBoton) modoBoton.textContent = 'Modo Oscuro';
    }
}

// IIFE para aplicar el tema guardado al cargar la página y evitar parpadeos
(function aplicarTemaGuardado() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    actualizarEstadoModo();
})();

/** VENTANA EMERGENTE */
// Obtén el elemento de la ventana emergente
const miVentanaEmergente = document.getElementById('miVentanaEmergente');

// Función para mostrar la ventana emergente
function mostrarVentanaEmergente() {
    if (miVentanaEmergente) {
        miVentanaEmergente.style.display = 'block';
    }
}

// Mostrar la ventana emergente automáticamente después de cinco segundos
setTimeout(mostrarVentanaEmergente, 5000);

// Obtén el elemento del botón para cerrar la ventana emergente
const cerrarPopup = document.getElementById('cerrarPopup');

// Función para cerrar la ventana emergente
function cerrarVentanaEmergente() {
    if (miVentanaEmergente) {
        miVentanaEmergente.style.display = 'none';
        miVentanaEmergente.scrollTop = 0;
    }
}

// Agrega un evento de clic al botón para cerrar la ventana emergente
if (cerrarPopup) {
    cerrarPopup.addEventListener('click', cerrarVentanaEmergente);
}
