window.addEventListener('load',()=>{
    //long er breddegrad i geosentriske koordinater
    let long;
    //let er lengdegrad i geosentriske koordinater
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = ${proxy}'https://api.darksky.net/forecast/808c9c2e3194f68a4ce5057fdc94d44a/37.8267,-122.4233';
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log(data);
            });
        });

        
    }else{
        h1.textContent = "hey, this is not working... please enable geolocation thingy"
    }
});