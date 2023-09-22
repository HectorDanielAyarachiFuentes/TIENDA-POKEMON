document.addEventListener("DOMContentLoaded", function () {
    // Obtén el ID del Pokémon desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    // Obtén los datos de Pokémon desde el localStorage
    const pokemonData = JSON.parse(localStorage.getItem("pokemonDatos"));

    // Busca el Pokémon por su ID
    const selectedPokemon = pokemonData.find((pokemon) => pokemon.id == id);

    if (selectedPokemon) {
        // Crea el contenido HTML con los detalles del Pokémon
        const detalleHtml = `
            <div class="pokemon-card">
                <h2>${selectedPokemon.nombre}</h2>
                <img src="${selectedPokemon.imagen}" alt="${selectedPokemon.nombre} Image">
                <p><strong>Descripción:</strong> ${selectedPokemon.descripcion}</p>
                <p><strong>Tipo:</strong> ${selectedPokemon.caracteristicas.tipo}</p>
                <p><strong>Habilidad:</strong> ${selectedPokemon.caracteristicas.habilidad}</p>
                <p><strong>Poder:</strong> ${selectedPokemon.caracteristicas.poder}</p>
                <p><strong>Votación:</strong> ${selectedPokemon.votacion}</p>
                <p id="precioPokemon"><strong>Precio:</strong> $${selectedPokemon.precio}</p>
                <button onclick="goToIndex()" class="volver-button">Volver Atrás</button>


            </div>
        `;

        // Agrega el contenido al contenedor pokemonDetails
        const pokemonDetails = document.getElementById("pokemon-details");
        pokemonDetails.innerHTML = detalleHtml;
    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        const pokemonDetails = document.getElementById("pokemon-details");
        pokemonDetails.innerHTML = "<p>Pokémon no encontrado.</p>";
    }
});
function goToIndex() {
    window.location.href = "index-picachu.html";
}
function realizarCompra() {
    const cantidad = parseInt(document.getElementById("quantity").value);
    const precioUnitario = parseFloat(selectedPokemon.precio);
    
    if (isNaN(cantidad) || cantidad < 1) {
        alert("Por favor, ingrese una cantidad válida.");
    } else {
        const total = cantidad * precioUnitario;
        
        const confirmacion = confirm(`¿Desea comprar ${cantidad} ${selectedPokemon.nombre}(s) por un total de $${total.toFixed(2)}?`);
        
        if (confirmacion) {
            // Aquí puedes agregar la lógica para realizar la compra
            alert("¡Compra realizada con éxito!");
        } else {
            alert("Compra cancelada.");
        }
    }
}

function realizarCompra() {
    const multiplicador = parseFloat(document.getElementById('multiplicador').value);
    const precio = parseFloat(document.getElementById('precio').textContent);
    const resultado = precio * multiplicador;

    // Dar formato al resultado con puntos cada tres dígitos
    const resultadoFormateado = resultado.toLocaleString();

    // Mostrar el resultado formateado y solicitar confirmación
    const confirmacion = window.confirm(`El precio total es: US$ ${resultadoFormateado}. ¿Estás seguro de realizar la compra?`);

    if (confirmacion) {
        // Cambiar el texto del botón
        const botonCompra = document.querySelector('.compra-button');
        botonCompra.textContent = 'Enviar Producto';

        // Mostrar la dirección inventada
        const direccion = '123 Calle Ficticia, Ciudad Imaginaria';
        window.alert(`Estás comprando un Pokémon. Haz clic en "Enviar Producto" para enviarlo a la siguiente dirección:\n\n${direccion}`);
    }
}
// Obtener el botón de compra
const botonCompra = document.querySelector('.compra-button');

// Agregar un evento de clic al botón
botonCompra.addEventListener('click', function() {
// Mostrar mensaje de alerta
window.alert('Enviando... Solo espera tu Pokémon');

// Redirigir a la página "index-picachu.html"
window.location.href = 'index-picachu.html';
});