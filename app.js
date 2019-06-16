window.addEventListener('load',()=>{
    //long er breddegrad i geosentriske koordinater
    let long;
    //let er lengdegrad i geosentriske koordinater
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
  
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            //bytt ut API lenken, husk på å forandre de bakerste tallene med ${long} og ${kat}
            const api = `${proxy}https://api.darksky.net/forecast/808c9c2e3194f68a4ce5057fdc94d44a/${long},${lat}`;
  
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                const{temperature, summary, icon} = data.currently
                //set DOM elementer fra API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formel for celsius
                let celsius = (temperature - 32) * (5 / 9);
                //Set Icon
                setIcons(icon, document.querySelector("icon")); 
                //Change temperature from farenheit too celsius
                temperature.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor (celsius);
                    } else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });
  
  
    }else{
        h1.textContent = "hey, this is not working... please enable geolocation thingy"
    }

    function setIcons (icon, iconID){
        const skycon = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
  });
