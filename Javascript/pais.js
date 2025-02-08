document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del país desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');

    if (countryName) {
        fetchCountryDetails(countryName);
    }

    function fetchCountryDetails(countryName) {
        // Verificar si los datos están en localStorage
        const storedRegions = localStorage.getItem('regions');
        if (!storedRegions) {
            console.error('No regiones encontrados en el localStorage.');
            return;
        }

        // Parsear las regiones almacenadas
        const regions = JSON.parse(storedRegions);

        // Buscar el país en las regiones almacenadas
        let country = null;
        for (const region in regions) {
            country = regions[region].find(c => c.name.common.toLowerCase() === countryName.toLowerCase());
            if (country) break;
        }

        if (country) {
            renderCountryDetails(country);
        } else {
            console.error(`Pais ${countryName} no encontrado en el localStorage.`);
        }
    }

    function renderCountryDetails(country) {
        const container = document.getElementById('country-details');

        // Crear un fondo con la bandera
        container.style.backgroundImage = `url(${country.flags.svg})`;  
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        container.style.backgroundAttachment = 'fixed';
        container.style.color = '#fff'; // Para que el texto sea blanco y resalte

        // Crear el contenido del país
        const countryInfo = `
            <div class="country-info">
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital || 'No disponible'}</p>
                <p><strong>Región:</strong> ${country.region}</p>
                <p><strong>Población:</strong> ${country.population}</p>
                <p><strong>Área:</strong> ${country.area} km²</p>
                <p><strong>Idioma(s):</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'No disponible'}</p>
                <p><strong>Moneda:</strong>${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'No disponible' }</p>
            </div>
        `;

        container.innerHTML = countryInfo;
    }
});
