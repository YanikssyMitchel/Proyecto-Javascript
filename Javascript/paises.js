document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');//cuadro de búsqueda donde escribir el nombre de un país.

    const regionsContainer = document.getElementById('regionsContainer');//área donde aparecerán las regiones y los países.

    let allCountries = []; //array vacío donde vamos a guardar todos los países más tarde.
    
   
    const loadCountriesByRegion = () => {
        const storedCountries = localStorage.getItem('countries');// Primero revisa si ya tenemos una lista guardada.
        
        if (storedCountries) {//Si la lista de países ya está guardada, la usamos.
           
            allCountries = JSON.parse(storedCountries);//Convertimos esa lista en formato JSON a un formato que podamos usar

            const regions = groupCountriesByRegion(allCountries);//la agrupamos por región con funcion group countries

            displayRegions(regions);//La mostramos con la funcion displayRegions

        } else {//Si no
           
            fetch('https://restcountries.com/v3.1/all')//Llamamos la Api
                .then(response => response.json())//Si responde lo pasamos a una Json para poder usarla
                .then(data => {//Despues lo guardamos
                    allCountries = data;
                    localStorage.setItem('countries', JSON.stringify(allCountries));//Guardamos countries en el local storage

                    const regions = groupCountriesByRegion(allCountries);//Llamamos la funcion para agrupar los paises segun la region

                    displayRegions(regions);//Mostramos los paises
                })
                .catch(error => {
                    console.error('Error cargando los países:', error);//Si hay un error lo mandamos a la consola
                });
        }
    };
    
    
    const groupCountriesByRegion = (countries) => {
        //reduce es un método que recorre cada país de la lista, va construyendo un objeto que agrupa los países por región.

        return countries.reduce((acc, country) => {//Es un "acumulador", que empieza vacio y se va llenando con regiones y países.

                                        //Country es cada pais que se recorre en el reduce

            const region = country.region || 'Sin región';// Se obtiene la region de cada pais, si no tiene, no disponible

            if (!acc[region]) {//Si la region no existe

                acc[region] = [];//Se crea un array vacio para esa region
            }
            acc[region].push(country);//Se agrega el pais al grupo de esa region
            return acc;
        }, {});
    };
    
    
    const displayRegions = (regions) => {
        regionsContainer.innerHTML = ''; //Limpia el area para que no se acumulen las regiones y paises
    
        for (const [region, countries] of Object.entries(regions)) {//convierte el objeto de regiones en una lista de pares clave-valor.
            //El for of lleva el nombre de la region con el array de paises 

            const regionDiv = document.createElement('div');//Luego hace un div para la region

            regionDiv.classList.add(region.toLowerCase()); //y hace una clase para cada region
    
            const regionTitle = document.createElement('h2');//Crea un h2 para el titulo de la region

            regionTitle.textContent = region;//Y le asigna el h2 el nombre de la region

            regionDiv.appendChild(regionTitle);
    
            const countriesDiv = document.createElement('div');//Se crea un contenedor para los paises

            countriesDiv.classList.add('countries');//Se hace una clase de paises
    
            countries.forEach(country => {//se recorrre cada pais

                const countryDiv = document.createElement('div');//Se hace un div para el pais

                countryDiv.classList.add('country');//Se anade en una clase
    
                const countryName = country.name.common;//Se extrae el nombre del pais
                const countryFlag = country.flags.png;//Se estrae la bandera
    
                const countryLink = document.createElement('a');//Se hace un link para cada pais

                countryLink.href = `pais.html?country=${countryName}`; //La url lo manda a pais.html

                countryLink.title = countryName;//El titulo del pais es el nombre del pais
    
                countryLink.innerHTML = `
                    <img src="${countryFlag}" alt="${countryName}">
                    <p>${countryName}</p>
                `;//Se anade la imagen, con el nombre del pais 
                
                countryDiv.appendChild(countryLink);//Lo agregamos a a countryDiv

                countriesDiv.appendChild(countryDiv);
            });
    
            regionDiv.appendChild(countriesDiv);
            regionsContainer.appendChild(regionDiv);
        }
    };
    
    
    const displayCountries = (countries) => {
        regionsContainer.innerHTML = '';
    
        const regions = groupCountriesByRegion(countries); //Llama la funcion agrupar paises por region
        displayRegions(regions); //Llama a la funcion display regions
    };
    
  
    searchInput.addEventListener('input', () => {//filtrar los paises por input
        const query = searchInput.value.toLowerCase();//Obtiene lo que se escribe y lo pasa a minusculas 
        
        const filteredCountries = allCountries.filter(country =>//Filtra los paises para que solo muestre lo que uno escribe
            country.name.common.toLowerCase().includes(query)//Lo pasa a minuscula el nombre del paises
        );
    
        displayCountries(filteredCountries);//Muestra los paises filtrados
    });
    
   
    loadCountriesByRegion();//al cargar la página, se ejecuta la función para cargar y mostrar los países organizados por región.
    
});




