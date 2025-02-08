document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos en el localStorage
    const obtenerYAlmacenarDatos = () => {
        const regionesGuardadas = localStorage.getItem('regions');
        const paisesGuardados = localStorage.getItem('countries');
        
        if (regionesGuardadas && paisesGuardados) {
            console.log('Datos de regiones y países ya cargados en localStorage.');
            return; // Si ya existen en localStorage, no hacer la petición
        }

        // Realizamos la petición a la API solo si los datos no están en el localStorage
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const regiones = {};
                data.forEach(country => {
                    const region = country.region;
                    if (region && !regiones[region]) {
                        regiones[region] = [];
                    }
                    if (region) {
                        regiones[region].push({
                            nombre: country.name,
                            capital: country.capital || 'No disponible',
                            poblacion: country.population,
                            area: country.area || 'No disponible',
                            region: country.region,
                            banderas: country.flags,
                            idiomas: country.languages ? Object.values(country.languages).join(', ') : 'No disponible',
                            monedas: country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'No disponible'
                        });
                    }
                });

                // Almacenamos las regiones y países en el localStorage
                localStorage.setItem('regions', JSON.stringify(regiones));
                localStorage.setItem('countries', JSON.stringify(data));
                console.log('Datos de regiones y países guardados en localStorage');
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    };

    obtenerYAlmacenarDatos();
});
