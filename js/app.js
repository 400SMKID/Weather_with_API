const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>  {
    formulario.addEventListener('submit', searchWeather);
})

function searchWeather(e) {
    e.preventDefault();

    // Validate
    const city = document.querySelector('#ciudad').value;
    const country = document.querySelector('#pais').value;

    if(city === '' || country === ''){
        // There was an error
        showError ('Both fields are required');

        return; 
    }

    // Consult the API here
    consultAPI(city, country);
}

function showError(message) {
    const alert = document.querySelector('.bg-red-100')
    
    if(!alert) {
        // Create an Alert
        const alert = document.createElement('div');

        alert.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;
        container.appendChild(alert);

        // Alert timeout configuration
        setTimeout(() => {
            alert.remove();
        }, 2000);

    }
}

function consultAPI(city, country){
    const appId = 'd6de22d9cbd0a4b53173db942e6cff5d'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
    
    Spinner();

    fetch(url)
        .then( response => response.json())
        .then( data => {
            clearHTML(); // Clear previous html
            if(data.cod === "404"){
                showError('City not found')
                return;
            }

            // Print the response in the HTML.
            showWeather(data);
        })
}





function showWeather(data) {
    const { main: { temp, temp_max, temp_min, humidity, pressure }, 
            wind: { speed },
            visibility,
            sys: { sunrise, sunset }
    } = data;

    const centigrade = Math.floor(temp - 273.15); // Round down

    const currentTemp = document.createElement('p');
    currentTemp.innerHTML = `${centigrade} &#8451;`;
    currentTemp.classList.add('font-bold', 'text-6xl');

    const humidityElement = document.createElement('p');
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    humidityElement.classList.add('text-lg');

    // Convert wind speed to kilometers per hour
    const windSpeedKPH = Math.round(speed * 3.6);
    const windSpeed = document.createElement('p');
    windSpeed.innerHTML = `Wind Speed: ${windSpeedKPH} km/h`;
    windSpeed.classList.add('text-lg');

    // Convert visibility to kilometers
    const visibilityKM = (visibility / 1000).toFixed(1);
    const visibilityElement = document.createElement('p');
    visibilityElement.innerHTML = `Visibility: ${visibilityKM} km`;
    visibilityElement.classList.add('text-lg');

    // Convert pressure to millibars (mb)
    const pressureMB = pressure;
    const pressureElement = document.createElement('p');
    pressureElement.innerHTML = `Pressure: ${pressureMB} mb`;
    pressureElement.classList.add('text-lg');

    // Convert sunrise time to AM/PM format
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

    // Convert sunset time to AM/PM format
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

    const sunriseElement = document.createElement('p');
    sunriseElement.innerHTML = `Sunrise Time: ${sunriseTime}`;
    sunriseElement.classList.add('text-lg');

    const sunsetElement = document.createElement('p');
    sunsetElement.innerHTML = `Sunset Time: ${sunsetTime}`;
    sunsetElement.classList.add('text-lg');

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white');
    resultDiv.appendChild(currentTemp);
    resultDiv.appendChild(humidityElement);
    resultDiv.appendChild(windSpeed);
    resultDiv.appendChild(visibilityElement);
    resultDiv.appendChild(pressureElement);
    resultDiv.appendChild(sunriseElement);
    resultDiv.appendChild(sunsetElement);

    resultado.appendChild(resultDiv);
}

function clearHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    clearHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}
