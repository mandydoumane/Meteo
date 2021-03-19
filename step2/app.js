let output = document.querySelector("#output ul");
let element = document.querySelector("#weather-icon ul");
// console.log(output);

function buttonClickGET() {
    var query = document.getElementById("queryloc").value;
    $("input[type=text]").val("");
    // console.log(query);
    //récupération lat et long par le nom de la ville
    var myurl = 'https://api.opencagedata.com/geocode/v1/json?q='+query+'&key=2cc3e4d545f54367a2aa2141eb1337d0';
    //récupération données
    var request = new XMLHttpRequest();
    request.open('GET', myurl, true);   
    request.onload = function(){
        if (request.status === 200){
            var data = JSON.parse(request.responseText);
            var lattitude = data.results[0].geometry.lat;
            var longitude = data.results[0].geometry.lng;
            //récupérer la météo par la long et lat
            var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&exclude=current,minutely,hourly,alerts&appid=2a1199b344dec7496132949d793bf54c&units=metric&lang=fr';
            fetch(url).then((response) => 
                response.json().then((data) => {
                    // console.log(data);

                    // récupère les jours
                    var dailys = data.daily;
                    // console.log(dailys)
                    for(i=1; i < dailys.length - 2; i++){
                        
                        var clouds = dailys[i].clouds;
                        console.log(clouds);
                        var jour = dailys[i].dt * 1000;
                        let d = new Date(jour).getDay();
                        
                        var weather = dailys[i].weather[0].main;
                        console.log(weather);
                        date(d);
                        switch (weather) {
                            case "Rain":
                                element.innerHTML += '<li><img class="img" src="css/weathericons/rain.svg" alt="rain" /></li>';
                                break;
                            case "Clear":
                                element.innerHTML += '<li><img class="img" src="css/weathericons/sun.svg" alt="clear" /></li>';
                                break;
                            case "Snow":
                                element.innerHTML += '<li><img class="img" src="css/weathericons/snow.svg" alt="snow" /></li>';
                                break;
                            default:
                                if (clouds < 50) {
                                   element.innerHTML += '<li><img class="img" src="css/weathericons/cloudy.svg" alt="cloudy" /></li>';
                    
                                } else {
                                    element.innerHTML += '<li><img class="img" src="css/weathericons/clouds.svg" alt="clouds" /></li>';
                                }
                                break;
                        }

                    }
                })); 
        }    
    }

    request.send();
}
  
//Récupère le jour de la semaine réel
function date(chiffrejour){
    switch (chiffrejour){
        case 0:
            output.innerHTML += "<li class='day'>Sunday</li>";
            break;
        case 1:
            output.innerHTML += "<li class='day'>Monday</li>";
            break;
        case 2:
            output.innerHTML += "<li class='day'>Tuesday</li>";
            break;
        case 3:
            output.innerHTML += "<li class='day'>Wednesday</li>";
            break;
        case 4:
            output.innerHTML += "<li class='day'>Thursday</li>";
            break;
        case 5:
            output.innerHTML += "<li class='day'>Friday</li>";
            break;
        case 6:
            output.innerHTML += "<li class='day'>Saturday</li>";
            break;
    }
}


