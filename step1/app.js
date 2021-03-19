function buttonClickGET() {
    var query = document.getElementById("queryloc").value;
    console.log(query);
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=2a1199b344dec7496132949d793bf54c&units=metric';
    
    $("input[type=text]").val("");

    $.get(url, callBackGetSuccess).done(function() {
        //alert( "second success" );
      })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
        //alert( "finished" );
      });
}

//Récupère le jour de la semaine réel
function date(){
    let output = document.getElementById("output");
    let d = new Date();
    let day = d.getDay();
    switch (day){
        case 0:
            output.innerHTML = "Sunday";
            break;
        case 1:
            output.innerHTML = "Monday";
            break;
        case 2:
            output.innerHTML = "Tuesday";
            break;
        case 3:
            output.innerHTML = "Wednesday";
            break;
        case 4:
            output.innerHTML = "Thursday";
            break;
        case 5:
            output.innerHTML = "Friday";
            break;
        case 6:
            output.innerHTML = "Saturday";
            break;
    }
}


var callBackGetSuccess = function(data) {
    console.log("donnees api", data);
    var element = document.getElementById("weather-icon");
    var meteo = data.weather[0].main;
    var nuage = data.clouds.all;
    date();  
    switch (meteo) {
        case "Rain":
            element.innerHTML = '<img id="rain" class="img" src="css/weathericons/rain.svg" alt="rain" />';
            break;
        case "Clear":
            element.innerHTML = '<img id="clear" class="img" src="css/weathericons/sun.svg" alt="clear" />';
            break;
        case "Snow":
            element.innerHTML = '<img id="snow" class="img" src="css/weathericons/snow.svg" alt="snow" />';
            break;
        default:
            if (nuage < 50) {
               element.innerHTML = '<img id="cloudy" class="img" src="css/weathericons/cloudy.svg" alt="cloudy" />';

            } else {
                element.innerHTML = '<img id="clouds" class="img" src="css/weathericons/clouds.svg" alt="clouds" />';
            }
            break;
    }
}
