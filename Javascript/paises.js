const searchInput = document.getElementById('searchInput');
const regionsContainer = document.getElementById('regionsContainer');
let allCountries = []; // Para almacenar todos los países y tenerlos disponibles para el filtro

// Función para cargar los países desde el localStorage
const loadCountriesByRegion = () => {
    const storedCountries = localStorage.getItem('countries');
    
    if (storedCountries) {
        // Si ya están almacenados, los usamos
        allCountries = JSON.parse(storedCountries);
        const regions = groupCountriesByRegion(allCountries);
        displayRegions(regions);
    } else {
        // Si no están almacenados, hacemos la llamada a la API
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                allCountries = data;
                localStorage.setItem('countries', JSON.stringify(allCountries));
                const regions = groupCountriesByRegion(allCountries);
                displayRegions(regions);
            })
            .catch(error => {
                console.error('Error cargando los países:', error);
            });
    }
};

// Función para agrupar los países por región
const groupCountriesByRegion = (countries) => {
    return countries.reduce((acc, country) => {
        const region = country.region || 'Sin región';
        if (!acc[region]) {
            acc[region] = [];
        }
        acc[region].push(country);
        return acc;
    }, {});
};

// Función para mostrar las regiones y los países
const displayRegions = (regions) => {
    regionsContainer.innerHTML = ''; // Limpiar antes de agregar

    for (const [region, countries] of Object.entries(regions)) {
        const regionDiv = document.createElement('div');
        regionDiv.classList.add(region.toLowerCase()); // Asignar clase por región

        const regionTitle = document.createElement('h2');
        regionTitle.textContent = region;
        regionDiv.appendChild(regionTitle);

        const countriesDiv = document.createElement('div');
        countriesDiv.classList.add('countries');

        countries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');

            const countryName = country.name.common;
            const countryFlag = country.flags.png;

            const countryLink = document.createElement('a');
            countryLink.href = `pais.html?country=${countryName}`; // Enlace a la página de detalles
            countryLink.title = countryName;

            countryLink.innerHTML = `
                <img src="${countryFlag}" alt="${countryName}">
                <p>${countryName}</p>
            `;
            
            countryDiv.appendChild(countryLink);
            countriesDiv.appendChild(countryDiv);
        });

        regionDiv.appendChild(countriesDiv);
        regionsContainer.appendChild(regionDiv);
    }
};

// Función para mostrar solo los países filtrados
const displayCountries = (countries) => {
    regionsContainer.innerHTML = ''; // Limpiar antes de mostrar

    const regions = groupCountriesByRegion(countries); // Agrupar los países filtrados por región
    displayRegions(regions); // Mostrar las regiones y los países filtrados
};

// Filtrar los países cuando se escribe en el input de búsqueda
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );

    displayCountries(filteredCountries);
});

// Cargar los países al cargar la página
loadCountriesByRegion();
