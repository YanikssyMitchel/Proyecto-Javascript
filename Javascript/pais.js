document.addEventListener("DOMContentLoaded", () => {
    
    const urlParams = new URLSearchParams(window.location.search);//Esta línea nos permite obtener los parámetros que vienen con la URL. 
    const countryName = urlParams.get('country');//De la URL obtenemos el valor del parámetro country. 

    if (countryName) {
        fetchCountryDetails(countryName);//Si realmente encontramos un valor para country en la URL, 

        // llamamos a la función fetchCountryDetails y le pasamos ese nombre de país 
    }

    function fetchCountryDetails(countryName) {
        
        const storedCountries = localStorage.getItem('countries');//Buscamos informacion en el local Storage
        if (!storedCountries) {
            console.error('No se encontraron países en el localStorage.');//Si no hay se muestra un mensaje 
            return;
        }

       
        const countries = JSON.parse(storedCountries);//Si hay paises los convertimos en un array de países

      
        const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());//Comparamos el nombre del país (c.name.common) 
        // con el valor que obtuvimos de la URL (countryName)
        // Usamos toLowerCase() para asegurarnos de que la comparación no dependa de mayúsculas o minúsculas.

        if (country) {//Si encontramos el pais llamamos la funcion renderCountryDetails(country);
            renderCountryDetails(country);
        } else {
            console.error(`Pais ${countryName} no encontrado en el localStorage.`);//Si no se encontra mandamos error
        }
    }

    function renderCountryDetails(country) {
        const container = document.getElementById('country-details');//Buscamos en el html el div
        //  donde ponemos la informacion

        container.style.backgroundImage = `url(${country.flags.svg})`; //Ponemos la bandera de fondo
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';//Lo centramos
        container.style.backgroundAttachment = 'fixed';
        container.style.color = '#fff'; //Ponemos el color del texto blanco

      //Creamos un div donde se vera la informacion del pais
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

        container.innerHTML = countryInfo;//Ponemos el contenido que creamos (los detalles del país) dentro del contenedor de la página para que se vea.
    }
});
