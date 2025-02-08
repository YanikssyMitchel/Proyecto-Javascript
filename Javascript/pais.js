document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del país desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');

    if (countryName) {
        fetchCountryDetails(countryName);
    }

    function fetchCountryDetails(countryName) {
        // Verificar si los datos de los países están en localStorage
        const storedCountries = localStorage.getItem('countries');
        if (!storedCountries) {
            console.error('No se encontraron países en el localStorage.');
            return;
        }

        // Parsear los países almacenados
        const countries = JSON.parse(storedCountries);

        // Buscar el país directamente en los países almacenados
        const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());

        if (country) {
            renderCountryDetails(country);
        } else {
            console.error(`Pais ${countryName} no encontrado en el localStorage.`);
        }
    }

    function renderCountryDetails(country) {
        const container = document.getElementById('country-details');

        // Crear un fondo con la bandera
        container.style.backgroundImage = `url(${country.flags.svg})`;  // Usamos 'flags' en lugar de 'banderas'
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
                <p><strong>Moneda:</strong> ${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'No disponible'}</p>
            </div>
        `;

        container.innerHTML = countryInfo;
    }
});
