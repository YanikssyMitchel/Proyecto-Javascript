document.addEventListener("DOMContentLoaded", () => {//Cuando la pagina este cargada

    function obtenerRegiones() {//Se llama la funcion obtener Regiones
        const regionesGuardadas = localStorage.getItem('regions');//Se busca la region en el local Storage

        
        const contenedor = document.querySelector('.regions-container');//Se busca la clase
        contenedor.innerHTML = '<p>Cargando regiones...</p>';//Se anade un p en el contenedor cargando regiones

        if (regionesGuardadas) {//Si hay regiones
            renderizarRegiones(JSON.parse(regionesGuardadas));//Se llama la funcion renderizarRegiones con un Json
        } else {//si no
            fetch('https://restcountries.com/v3.1/all')//Se llama la Api
                .then(respuesta => respuesta.json())//Se guarda y se convierte en un Json
                .then(datos => {//cuando tengamos los datos
                    const regiones = {};//se hace un arreglo vacio

                    datos.forEach(pais => {//Recorremos con un ForEach cada pais

                        const region = pais.region;// Extrae el nombre de la región del país actual en el bucle.

                        if (region && !regiones[region]) {//Si un pais tiene una region que no se haya hecho se añade
                            regiones[region] = [];//se anade en una lista vacia
                        }
                        if (region) {// Si el país tiene una región definida, se agrega ese país al array
                            regiones[region].push(pais);
                        }
                    });

                    localStorage.setItem('regions', JSON.stringify(regiones));// Una vez que se ha procesado todos los países y
                    //  las regiones, se guarda el objeto regiones en el localStorage
                    renderizarRegiones(regiones);//Se llama la funcion con regiones adentro
                })
                .catch(error => {
                    console.error('Error al obtener las regiones:', error);//Si hay un error se llama
                    contenedor.innerHTML = '<p>Hubo un error al cargar las regiones.</p>';
                });
        }
    }

    function renderizarRegiones(regiones) {
        const contenedor = document.querySelector('.regions-container');//Se llama el contenedeor 
        const fragmento = document.createDocumentFragment();//se crea un objeto temporal en el que podemos 
        // agregar elementos antes de insertarlos en el DOM.

        const iconosRegiones = {
            "Asia": "fa-solid fa-earth-asia",          
            "Europe": "fa-solid fa-earth-europe", 
            "Africa": "fa-solid fa-earth-africa",       
            "Americas": "fa-solid fa-earth-americas",
            "Oceania": "fa-solid fa-earth-oceania",    
            "Antarctic":"fa-solid fa-igloo"   
        };//Se crea un objeto con los iconos de cada region dependiendo del nombre

        
        contenedor.innerHTML = '';//Se limpia el html

        for (const region in regiones) {//Recorre cada región en el objeto regiones.
            const tarjetaRegion = document.createElement('div');//Se crea un div

            tarjetaRegion.classList.add('region-card', region.toLowerCase());//Agrega las clases region-card y el nombre de la región con el nombre de la region
    
            const iconoRegion = iconosRegiones[region] || "fas fa-map-marker-alt";  //Asigna el icono correspondiente a la región. 
            // Si no existe un icono para la región, usa un icono por defecto.
    
            const regionHTML = `
                <a href="paisesRe.html?regions=${encodeURIComponent(region)}" class="region-link">
                    <h3><i class="${iconoRegion}"></i> ${region}</h3>
                </a>
            `;//Se crea un objeto con un a que contiene el enlace a paisesRe

            tarjetaRegion.innerHTML = regionHTML;//Asigna el regionHTML generado a la tarjeta de la región.

            fragmento.appendChild(tarjetaRegion);//Añade la tarjeta de la región al fragmento temporal.
        }

        contenedor.appendChild(fragmento); //Agrega todas las tarjetas de regiones al contenedor en la página.
    }


    obtenerRegiones();// Llama a la función obtenerRegiones para iniciar el proceso de carga de las regiones.
});
