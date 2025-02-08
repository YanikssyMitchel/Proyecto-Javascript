document.addEventListener("DOMContentLoaded", () => {

    function obtenerRegiones() {
        const regionesGuardadas = localStorage.getItem('regions');

        // Mostrar un mensaje de carga
        const contenedor = document.querySelector('.regions-container');
        contenedor.innerHTML = '<p>Cargando regiones...</p>';

        if (regionesGuardadas) {
            renderizarRegiones(JSON.parse(regionesGuardadas));
        } else {
            fetch('https://restcountries.com/v3.1/all')
                .then(respuesta => respuesta.json())
                .then(datos => {
                    const regiones = {};

                    datos.forEach(pais => {
                        const region = pais.region;
                        if (region && !regiones[region]) {
                            regiones[region] = [];
                        }
                        if (region) {
                            regiones[region].push(pais);
                        }
                    });

                    localStorage.setItem('regions', JSON.stringify(regiones));
                    renderizarRegiones(regiones);
                })
                .catch(error => {
                    console.error('Error al obtener las regiones:', error);
                    contenedor.innerHTML = '<p>Hubo un error al cargar las regiones.</p>';
                });
        }
    }

    function renderizarRegiones(regiones) {
        const contenedor = document.querySelector('.regions-container');
        const fragmento = document.createDocumentFragment();

        const iconosRegiones = {
            "Asia": "fa-solid fa-earth-asia",          
            "Europe": "fa-solid fa-earth-europe", 
            "Africa": "fa-solid fa-earth-africa",       
            "Americas": "fa-solid fa-earth-americas",
            "Oceania": "fa-solid fa-earth-oceania",    
            "Antarctic":"fa-solid fa-igloo"   
        };

        // Limpiar el contenedor antes de agregar las regiones
        contenedor.innerHTML = '';

        for (const region in regiones) {
            const tarjetaRegion = document.createElement('div');
            tarjetaRegion.classList.add('region-card', region.toLowerCase());
    
            const iconoRegion = iconosRegiones[region] || "fas fa-map-marker-alt";  // Icono por defecto
    
            const regionHTML = `
                <a href="paisesRe.html?regions=${encodeURIComponent(region)}" class="region-link">
                    <h3><i class="${iconoRegion}"></i> ${region}</h3>
                </a>
            `;
            tarjetaRegion.innerHTML = regionHTML;
            fragmento.appendChild(tarjetaRegion);
        }

        contenedor.appendChild(fragmento); // Una vez todos los elementos han sido creados, se agregan al contenedor
    }

    // Iniciar la obtención de las regiones
    obtenerRegiones();
});
