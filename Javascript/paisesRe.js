document.addEventListener("DOMContentLoaded", () => {
    // Obtener la región desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const regionSeleccionada = urlParams.get('regions');

    if (regionSeleccionada) {
        document.getElementById('region-name').textContent = `Países en la región de ${regionSeleccionada}`;

        // Llamar a la función para obtener y mostrar los países de esa región
        obtenerPaisesDeRegion(regionSeleccionada);
    } else {
        document.getElementById('region-name').textContent = 'No se especificó ninguna región.';
    }
});

// Función para obtener los países de una región desde el localStorage
function obtenerPaisesDeRegion(region) {
    const regionesGuardadas = localStorage.getItem('regions');
    const contenedorPaises = document.getElementById('countries-container');
    
    if (regionesGuardadas) {
        const regiones = JSON.parse(regionesGuardadas);
        const paisesDeRegion = regiones[region];

        // Limpiar el contenedor antes de mostrar los países
        contenedorPaises.innerHTML = '';

        if (paisesDeRegion && paisesDeRegion.length > 0) {
            // Mostrar todos los países inicialmente
            paisesDeRegion.forEach(pais => {
                const paisHTML = `
                   <a href="pais.html?country=${encodeURIComponent(pais.nombre.common)}" class="list-group-item list-group-item-action">
                    ${pais.nombre.common}
                    </a>
                `;
                contenedorPaises.innerHTML += paisHTML;
            });

            // Agregar el filtro de búsqueda
            agregarFiltroBusqueda(paisesDeRegion);
        } else {
            contenedorPaises.innerHTML = '<p>No se encontraron países en esta región.</p>';
        }
    } else {
        contenedorPaises.innerHTML = '<p>No se encontraron datos de regiones en el almacenamiento local.</p>';
    }
}

// Función para agregar el evento de búsqueda
function agregarFiltroBusqueda(paisesDeRegion) {
    const searchInput = document.getElementById('country-search'); // Asegúrate de tener el input con id "country-search"
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        
        // Filtrar los países por el nombre
        const filteredCountries = paisesDeRegion.filter(pais =>
            pais.nombre.common.toLowerCase().includes(query)
        );

        // Actualizar el contenedor con los países filtrados
        mostrarPaisesFiltrados(filteredCountries);
    });
}

// Función para mostrar los países filtrados
function mostrarPaisesFiltrados(paises) {
    const contenedorPaises = document.getElementById('countries-container');
    contenedorPaises.innerHTML = ''; // Limpiar contenedor

    if (paises.length > 0) {
        paises.forEach(pais => {
            const paisHTML = `
            <a href="pais.html?country=${encodeURIComponent(pais.nombre.common)}" class="list-group-item list-group-item-action">
                ${pais.nombre.common}
            </a>
        `;
            contenedorPaises.innerHTML += paisHTML;
        });
    } else {
        contenedorPaises.innerHTML = '<p>No se encontraron países que coincidan con la búsqueda.</p>';
    }
}
