document.addEventListener("DOMContentLoaded", function () {
    // URL del JSON (reemplaza con la ubicación real del JSON)
    const jsonURL = "datos.json"; // Cambia el nombre del archivo a "datos.json" si está en la misma ubicación

    // Elemento donde se mostrarán los Pokémon
    const pokemonContainer = document.getElementById("pokemon-container");

    // Realiza una solicitud para cargar el JSON
    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            // Almacena los datos del JSON en localStorage
            localStorage.setItem("pokemonDatos", JSON.stringify(data));

            // Itera a través de los datos de los Pokémon en el JSON
            data.forEach((pokemonData) => {
                // Limpia el nombre del tipo para usarlo como clase CSS (ej. "Fuego/Volador" -> "fuego-volador")
                const tipoClase = pokemonData.caracteristicas.tipo.toLowerCase().replace('/', '-').replace(' ', '-');

                // Crea el contenido HTML con el botón "Ver Más"
                const htmlContent = `
                    <div class="pokemon-card type-${tipoClase}">
                        <div class="pokemon-card-image-container">
                            <img class="pokemon-card-image" src="${pokemonData.imagen}" alt="${pokemonData.nombre} Image">
                        </div>
                        <div class="pokemon-card-content">
                            <h2>${pokemonData.nombre}</h2>
                            <p>${pokemonData.descripcion}</p>
                            <a href="detalle.html?id=${pokemonData.id}" class="ver-mas-button">Ver más</a>
                        </div>
                    </div>
                `;

                // Agrega el contenido HTML al contenedor de Pokémon
                pokemonContainer.innerHTML += htmlContent;
            });
        })
        .catch((error) => {
            console.error("Error al cargar el JSON:", error);
        });
});
