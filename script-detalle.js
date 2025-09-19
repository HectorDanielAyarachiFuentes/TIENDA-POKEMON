let selectedPokemon = null; // Hacemos la variable accesible globalmente en este script

document.addEventListener("DOMContentLoaded", function () {
    // Obtén el ID del Pokémon desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    // Obtén los datos de Pokémon desde el localStorage
    const pokemonData = JSON.parse(localStorage.getItem("pokemonDatos"));
    
    // Busca el Pokémon por su ID
    selectedPokemon = pokemonData.find((pokemon) => pokemon.id == id);

    if (selectedPokemon) {
        // Limpia el nombre del tipo para usarlo como clase CSS
        const tipoClase = selectedPokemon.caracteristicas.tipo.toLowerCase().replace('/', '-').replace(' ', '-');

        // Crea el contenido HTML con los detalles del Pokémon
        // Esta nueva estructura separa la imagen de la información para un layout de dos columnas
        const detalleHtml = `
            <div class="detail-image-column">
                <div class="pokemon-card-image-container">
                    <img class="pokemon-card-image" src="${selectedPokemon.imagen}" alt="${selectedPokemon.nombre} Image">
                </div>
            </div>
            <div class="detail-info-column">
                <span class="pokemon-type-badge type-badge-${tipoClase}">${selectedPokemon.caracteristicas.tipo}</span>
                <h2 class="detail-title">${selectedPokemon.nombre}</h2>
                <p class="detail-description">${selectedPokemon.descripcion}</p>
                
                <div class="stats-container">
                    <h3>Estadísticas</h3>
                    <ul>
                        <li><strong>Habilidad:</strong> ${selectedPokemon.caracteristicas.habilidad}</li>
                        <li><strong>Poder:</strong> ${selectedPokemon.caracteristicas.poder}</li>
                        <li><strong>Votación:</strong> ${selectedPokemon.votacion}</li>
                    </ul>
                </div>
                
                <!-- Sección de Compra Integrada -->
                <div class="purchase-section">
                    <p class="unit-price">Precio Unitario: <span>$${selectedPokemon.precio.toFixed(2)}</span></p>
                    <div class="quantity-selector">
                        <label for="quantity">Cantidad:</label>
                        <input type="number" id="quantity" value="1" min="1" oninput="actualizarPrecioTotal()">
                    </div>
                    <p class="total-price">Total: <span id="total-price-value">$${selectedPokemon.precio.toFixed(2)}</span></p>
                    <button class="compra-button" onclick="realizarCompra()">Comprar Ahora</button>
                </div>

                <button onclick="goToIndex()" class="volver-button">Volver al Catálogo</button>
            </div>
        `;

        // Agrega el contenido al contenedor
        const pokemonDetails = document.getElementById("pokemon-details");
        pokemonDetails.innerHTML = detalleHtml;

        // Inicializa el precio total
        actualizarPrecioTotal();
    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        const pokemonDetails = document.getElementById("pokemon-details");
        pokemonDetails.innerHTML = "<p>Pokémon no encontrado.</p>";
    }
});
function goToIndex() {
    window.location.href = "index-picachu.html"; // Redirige al catálogo
}

// Función para actualizar el precio total en tiempo real
function actualizarPrecioTotal() {
    if (!selectedPokemon) return;

    const cantidad = parseInt(document.getElementById("quantity").value);
    const precioUnitario = parseFloat(selectedPokemon.precio);
    const total = (cantidad > 0) ? (cantidad * precioUnitario) : 0;

    document.getElementById("total-price-value").textContent = `$${total.toFixed(2)}`;
}

// Lógica de compra unificada
function realizarCompra() {
    if (!selectedPokemon) return;
    const cantidad = parseInt(document.getElementById("quantity").value);
    const total = cantidad * selectedPokemon.precio;

    // Mostrar el resultado formateado y solicitar confirmación
    const confirmacion = window.confirm(`El total es $${total.toFixed(2)} por ${cantidad} ${selectedPokemon.nombre}(s).\n\n¿Estás seguro de realizar la compra?`);

    if (confirmacion) {
        alert(`¡Compra realizada con éxito!\nTu Pokémon será enviado a: 123 Calle Ficticia, Ciudad Imaginaria.`);
        window.location.href = 'index-picachu.html'; // Redirigir al catálogo
    }
}