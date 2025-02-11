document.addEventListener("DOMContentLoaded", () => {//Cuando la pagina se haya cargado por completo
   
    const obtenerYAlmacenarDatos = () => {//Creamos la funcion obtener datos almacenados
        const regionesGuardadas = localStorage.getItem('regions');//Se busca en el almacenamiento local
        const paisesGuardados = localStorage.getItem('countries');//
        
        if (regionesGuardadas && paisesGuardados) {
            console.log('Datos de regiones y países ya cargados en localStorage.');//Si ya los tenemos, 
            // mostramos un mensaje y dejamos de ejecutar el resto del código.
            return; 
        }

        
        fetch('https://restcountries.com/v3.1/all')//Si no con el fetch se pide la informacion en la API

            .then(response => response.json())//Al obtenerla, usamos .json() para convertirla en un formato que entendemos (un objeto).

            .then(data => {//Guardamos la informacion en data

                const regiones = {};//Este objeto será donde vamos a guardar la información de las regiones de los países.

                data.forEach(country => {//Recorrer cada país dentro de los datos. 

                    const region = country.region;//Para cada país, estamos guardando su "región" en la variable region.
                    
                    if (region && !regiones[region]) {//Si el país tiene una región  

                        regiones[region] = [];//aún no hemos guardado esa región, la agregamos al objeto regiones como una lista vacía.
                    }
                    if (region) {
                        regiones[region].push({//Si el país tiene una región, vamos a guardar toda su información dentro de la lista de
                                              //  esa región en el objeto regiones.
                            nombre: country.name,
                            capital: country.capital || 'No disponible',//Sino hay, se ponen no disponibles
                            poblacion: country.population,
                            area: country.area || 'No disponible',
                            region: country.region,
                            banderas: country.flags,
                            idiomas: country.languages ? Object.values(country.languages).join(', ') : 'No disponible',
                            monedas: country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'No disponible'
                        });
                    }
                });

                
                localStorage.setItem('regions', JSON.stringify(regiones));//Cuando se tenga toda la informacion se guarda en el local
                localStorage.setItem('countries', JSON.stringify(data));
                console.log('Datos de regiones y países guardados en localStorage');//Mostrar en la consola
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);//Si algo sale mal al pedir la información mostramos un mensaje de error en la consola.
            });
    };

    obtenerYAlmacenarDatos();//llamamos a la función que acabamos de crear para que se ejecute y empiece a obtener y guardar los datos.
});
