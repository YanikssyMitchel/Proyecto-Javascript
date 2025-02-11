document.addEventListener("DOMContentLoaded", () => {//Cuando se cargue el documento
   
    const urlParams = new URLSearchParams(window.location.search);//Obtiene la URL

    const regionSeleccionada = urlParams.get('regions');//obtenemos el valor del parámetro regions de la URL. 

    if (regionSeleccionada) {//Si esta la region seleccionada
        document.getElementById('region-name').textContent = `Países en la región de ${regionSeleccionada}`;
        //en el html mostrara Paises de la region y el nombre de la region

        obtenerPaisesDeRegion(regionSeleccionada);//Se llama obtener paises de la region

    } else {//Si no
        document.getElementById('region-name').textContent = 'No se especificó ninguna región.';//dice que no se especifico
    }
});


function obtenerPaisesDeRegion(region) {//Se manda la region

    const regionesGuardadas = localStorage.getItem('regions');//Se llama las regiones del localstorage
    const contenedorPaises = document.getElementById('countries-container');//Se busca el id
    
    if (regionesGuardadas) {//Si está la region

        const regiones = JSON.parse(regionesGuardadas);//Lo convertimos en Json

        const paisesDeRegion = regiones[region];//Llamamos los paises de esa region

       
        contenedorPaises.innerHTML = '';//se limpia el contenido

        if (paisesDeRegion && paisesDeRegion.length > 0) {//Si los paises de la region son mayores a la cantidad de paises
        
            paisesDeRegion.forEach(pais => {//Se recorre con un foreach los paises de esa region 
                const paisHTML = `
                   <a href="pais.html?country=${encodeURIComponent(pais.name.common)}" class="list-group-item list-group-item-action">
                    ${pais.name.common}
                    </a>
                `;//Creamos una cadena de texto con un A que nos envia a pais.html con el nombre del pais que seleccionamos

                contenedorPaises.innerHTML += paisHTML;//Agregamos paisHTML al contenedor
            });

           
            agregarFiltroBusqueda(paisesDeRegion);//LLamamos la funcion con los paises de la region
        } else {
            contenedorPaises.innerHTML = '<p>No se encontraron países en esta región.</p>';//Si no se dice que no se encontaron
        }
    } else {
        contenedorPaises.innerHTML = '<p>No se encontraron datos de regiones en el almacenamiento local.</p>';
    }
}

function agregarFiltroBusqueda(paisesDeRegion) {
    const searchInput = document.getElementById('country-search');//Se llama el input
    
    searchInput.addEventListener('input', () => {//cada vez que escribimos
        const query = searchInput.value.toLowerCase();//Pasa lo que escribimos a minuscula
        
        const filteredCountries = paisesDeRegion.filter(pais =>//se filtran los paises segun lo que se escriba

            pais.name.common.toLowerCase().includes(query)//Si el nombre del pais incluye lo que se escribio se deja ahi
        );

        
        mostrarPaisesFiltrados(filteredCountries);//Se llama la funcion mostrar paises
    });
}


function mostrarPaisesFiltrados(paises) {//Se muestran los paises filtrados

    const contenedorPaises = document.getElementById('countries-container');//Se llama el div del html
    contenedorPaises.innerHTML = '';//Se limpia todo

    if (paises.length > 0) {//Si el tamano del nombre del pais es mayor a 0
        paises.forEach(pais => {//Se hace el foreARCH Con el nombre del pais y el a que nos envia a pais.html
            const paisHTML = `
            <a href="pais.html?country=${encodeURIComponent(pais.name.common)}" class="list-group-item list-group-item-action">
                ${pais.name.common}
            </a>
        `;
            contenedorPaises.innerHTML += paisHTML;//Se anade al contenedor de paises
        });
    } else {
        contenedorPaises.innerHTML = '<p>No se encontraron países que coincidan con la búsqueda.</p>';//si no dira que no se encuentran paises
    }
}
