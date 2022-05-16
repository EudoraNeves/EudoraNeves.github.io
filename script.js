$(document).ready(() => {

    /*if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {

        })
    } else {
        console.log("Geolocation not available!");
    }*/

//     $("#share").jsSocials({
//         shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
//     });

    function doSearch() {
        $(".loadingContainer").css("display", "block");

        let cityName = $("#searchInput").val();
        let endPointWeather = "https://api.apixu.com/v1/forecast.json?key=0bb7f08c12204735b81134532191605&days=7&q=" + cityName;

        $("#day0").css("border", "0").addClass("forecastItem_clicked").siblings().removeClass("forecastItem_clicked");
        $(".container").addClass("container_after_search");
        $(".searchLeft").addClass("searchLeft_after_search");

        $(window).resize(function () {
            let screenWidth = $(window).width();
            if (screenWidth <= 768) {
                $(".container").css("margin", "8% 10%");
            }
        });

        let inputWidth = $("#searchInput").width();
        $("#searchSubmit").css("width", 100 % - inputWidth);
        inputWidth = 83 + '%';

        $.getJSON(endPointWeather, ((data) => {
            let city = data.location.name;
            let region = data.location.region;
            let country = data.location.country;
            let tempC = data.current.temp_c;
            let tempF = data.current.temp_f;
            let weatherType = data.current.condition.text;
            let weatherIcon = data.current.condition.icon;
            let windSpeedKph = data.current.wind_kph;
            let windSpeedMph = data.current.wind_mph;
            let humidity = data.current.humidity;
            let localTime = data.location.localtime;
            let uv = data.current.uv;
            $("#city").text(city);
            $("#region").text(region);
            $("#flags").attr("src", 'imgs/flags/' + country + '.png');
            $("#country").text(country);
            $("#temperature_c").text(tempC + "°C");
            $("#temperature_f").text(tempF + "°F");
            $("#weatherType").text(weatherType);
            $("#weatherIcon").attr("src", 'http:' + weatherIcon);
            $("#windSpeed_kph").text(windSpeedKph + "kph");
            $("#windSpeed_mph").text(windSpeedMph + "mph");
            $("#humidity").text(humidity);
            $("#uv").text(uv);
            $("#localTime").text(localTime);

            switch (weatherType) {
                case "Sunny": $("body").css("background-image", "url(imgs/sunny.jpg)");
                    break;
                case "Cloudy":
                case "Partly cloudy":
                    $("body").css("background-image", "url(imgs/cloudy.jpeg)");
                    break;
                case "Overcast": $("body").css("background-image", "url(imgs/overcast.jpg)");
                    break;
                case "Mist": $("body").css("background-image", "url(imgs/mist.jpg)");
                    break;
                case "Patchy rain possible":
                case "Patchy light rain":
                case "Light rain":
                case "Light freezing rain":
                    $("body").css("background-image", "url(imgs/rainy.jpeg)");
                case "Moderate rain at times":
                case "Moderate rain":
                case "Heavy rain":
                case "Heavy rain at times":
                case "Moderate or heavy freezing rain":
                case "Light rain shower":
                case "Moderate or heavy rain shower":
                case "Torrential rain shower":
                    $("body").css("background-img", "url(imgs/heavy-rain.jpg)");
                    break;
                case "Patchy snow possible": $("body").css("background-image", "url(imgs/snowy.jpeg)");
                    break;
                case "Patchy sleet possible":
                case "Light sleet":
                case "Moderate or heavy sleet":
                case "Light sleet showers":
                case "Moderate or heavy sleet showers":
                    $("body").css("background-image", "url(imgs/sleet.jpg)");
                    break;
                case "Patchy freezing drizzle possible":
                case "Patchy light drizzle":
                case "light drizzle":
                case "Freezing drizzle":
                case "Heavy freezing drizzle":
                    $("body").css("background-image", "url(imgs/drizzle.jpg)");
                    break;
                case "Thundery outbreaks possible": $("body").css("background-image", "url(imgs/outbreaks.jpg)");
                    break;
                case "Blowing snow":
                case "blizzard":
                case "Patchy light snow":
                case "Patchy moderate snow":
                case "Patchy heavy snow":
                case "light snow":
                case "Moderate snow":
                case "Heavy snow":
                case "Light snow showers":
                case "Moderate or heavy snow showers":
                    $("body").css("background-image", "url(imgs/snowy.jpg)");
                    break;
                case "Freezing fog":
                case "fog":
                    $("body").css("background-image", "url(imgs/fog.jpeg)");
                    break;
                case "Ice pellets":
                case "Light showers of ice pellets":
                case "Moderate or heavy showers of ice pellets":
                    $("body").css("background-image", "url(imgs/ice-pellets.jpg)");
                    break;
                case "Patchy light rain with thunder":
                case "Moderate or heavy rain with thunder":
                    $("body").css("background-image", "url(imgs/stormy.jpeg)");
                    break;
                case "Patchy light snow with thunder": $("body").css("background-image", "url(imgs/snow-thunder.jpg)");
                    break;
            }

            $(".loadingContainer").css("display", "none");
            $(".weatherContainer").css("display", "block");
            $(".imperial").css("visibility", "visible");
            /*
                        let daysStr = data.forecast.forecastday;
                        $("#day1 > .date").text(daysStr[1].date.substr(5, 11));
                        $("#day1 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[1].day.condition.icon);
                        $("#day1 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[1].day.mintemp_c);
                        $("#day1 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[1].day.maxtemp_c + "°C");
                        $("#day1 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[1].day.mintemp_f);
                        $("#day1 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[1].day.maxtemp_f + "°F");
                        $("#day2 > .date").text(daysStr[2].date.substr(5, 11));
                        $("#day2 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[2].day.condition.icon);
                        $("#day2 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[2].day.mintemp_c);
                        $("#day2 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[2].day.maxtemp_c + "°C");
                        $("#day2 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[2].day.mintemp_f);
                        $("#day2 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[2].day.maxtemp_f + "°F");
                        $("#day3 > .date").text(daysStr[3].date.substr(5, 11));
                        $("#day3 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[3].day.condition.icon);
                        $("#day3 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[3].day.mintemp_c);
                        $("#day3 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[3].day.maxtemp_c + "°C");
                        $("#day3 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[3].day.mintemp_f);
                        $("#day3 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[3].day.maxtemp_f + "°F");
                        $("#day4 > .date").text(daysStr[4].date.substr(5, 11));
                        $("#day4 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[4].day.condition.icon);
                        $("#day4 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[4].day.mintemp_c);
                        $("#day4 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[4].day.maxtemp_c + "°C");
                        $("#day4 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[4].day.mintemp_f);
                        $("#day4 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[4].day.maxtemp_f + "°F");
                        $("#day5 > .date").text(daysStr[5].date.substr(5, 11));
                        $("#day5 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[5].day.condition.icon);
                        $("#day5 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[5].day.mintemp_c);
                        $("#day5 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[5].day.maxtemp_c + "°C");
                        $("#day5 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[5].day.mintemp_f);
                        $("#day5 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[5].day.maxtemp_f + "°F");
                        $("#day6 > .date").text(daysStr[6].date.substr(5, 11));
                        $("#day6 > .forecastWeatherTypeIcon > img").attr("src", 'http:' + daysStr[6].day.condition.icon);
                        $("#day6 > .tempRange > .forecast_c > .forecastMin_c").text(daysStr[6].day.mintemp_c);
                        $("#day6 > .tempRange > .forecast_c > .forecastMax_c").text(daysStr[6].day.maxtemp_c + "°C");
                        $("#day6 > .tempRange > .forecast_f > .forecastMin_f").text(daysStr[6].day.mintemp_f);
                        $("#day6 > .tempRange > .forecast_f > .forecastMax_f").text(daysStr[6].day.maxtemp_f + "°F");
            */

            let daysStr = data.forecast.forecastday;
            for (i = 0; i < daysStr.length; i++) {
                let days = daysStr[i];
                let forecastWeatherIcon = days.day.condition.icon;
                let minTemp_c = days.day.mintemp_c;
                let maxTemp_c = days.day.maxtemp_c;
                let minTemp_f = days.day.mintemp_f;
                let maxTemp_f = days.day.maxtemp_f;
                let maxWind_mph = days.day.maxwind_mph;
                let maxWind_kph = days.day.maxwind_kph;
                let forecastHumidity = days.day.avghumidity;
                let forecastUv = days.day.uv;
                $("#day" + i + " > .date").text(days.date.substr(5, 11));
                $("#day" + i + " > .forecastWeatherTypeIcon > img").attr("src", "http:" + forecastWeatherIcon);
                $("#day" + i + " > .tempRange >  .forecast_c > .forecastMin_c").text(minTemp_c);
                $("#day" + i + " > .tempRange >  .forecast_c > .forecastMax_c").text(maxTemp_c + "°C");
                $("#day" + i + " > .tempRange >  .forecast_f > .forecastMin_f").text(minTemp_f);
                $("#day" + i + " > .tempRange >  .forecast_f > .forecastMax_f").text(maxTemp_f + "°F");

                /*
                                $("#day" + i).on("click", function forecastDay() {
                                    $("#weatherIcon > img").attr("src", "http:" + forecastWeatherIcon);
                                    $("#temperature_c").text(minTemp_c + "~" + maxTemp_c + "°C");
                                    $("#temperature_f").text(minTemp_f + "~" + maxTemp_f + "°F");
                                    $("#windSpeed_kph").text(maxWind_mph + "kph");
                                    $("#windSpeed_mph").text(maxWind_kph + "mph");
                                    $("#humidity").text(forecastHumidity);
                                    $("#uv").text(forecastUv);
                                    $(".localTime").css("visibility", "hidden");
                                    $(this).css("border", "0").removeClass("forecastItem_hover").addClass("forecastItem_clicked").siblings().removeClass("forecastItem_clicked").addClass("forecastItem_hover");
                                })
                            }
                */
                $("#day" + i).on({
                    mouseover: function () {
                        $(this).addClass("forecastItem_hover");
                    },

                    click: function () {
                        $("#weatherIcon > img").attr("src", "http:" + forecastWeatherIcon);
                        $("#temperature_c").text(minTemp_c + "~" + maxTemp_c + "°C");
                        $("#temperature_f").text(minTemp_f + "~" + maxTemp_f + "°F");
                        $("#windSpeed_kph").text(maxWind_mph + "kph");
                        $("#windSpeed_mph").text(maxWind_kph + "mph");
                        $("#humidity").text(forecastHumidity);
                        $("#uv").text(forecastUv);
                        $(".localTime").css("visibility", "hidden");
                        $(this).css("border", "0").addClass("forecastItem_clicked").siblings().removeClass("forecastItem_clicked");
                    },


                })
            }






        }))
    }

    $("#searchSubmit").on("click", doSearch)
    $("#searchInput").keyup(function (key) {
        if (key.keyCode == 13) {
            doSearch();
        }
    })


    $(".imperial").on("click", function () {

        var imperialText = $(".imperial").text();
        if (imperialText == "imperial") {
            $("#temperature_c").css("display", "none").siblings().css("display", "block");
            $("#windSpeed_kph").css("display", "none").siblings().css("display", "inline");
            $(".forecast_c").css("display", "none").siblings().css("display", "block");
            $(".imperial").text("metric")
        }
        else {
            $("#temperature_c").css("display", "block").siblings().css("display", "none");
            $("#windSpeed_kph").css("display", "inline").siblings().css("display", "none");
            $(".forecast_c").css("display", "inline").siblings().css("display", "none");
            $(".imperial").text("imperial")
        }
    })


    $(".wechat >img").on("click", (() => {
        alert("Please add me on wechat: (+86)15355156713")
    }))

/*
    $(".modalCloseSpan").bind({
        mouseenter: function () {
            $(this).css("background-color", "#FFFFFF");
        }

        mouseleave: function () {
            $(this).unbind('mouseenter');
        }
    })
    */

$(".modalCloseSpan").mouseenter(function(){
    $(this).css("background-color", "#FFFFFF");
}).mouseleave(function(){
    $(this).mouseenter(function(){;})
}).click(function(){
    $(".modal").css("display", "none");
})


// $(".arrowRight").click(function(){
    
//     let sliderImgs = $.makeArray(document.getElementsByClassName("sliderImg"));

//     for (i = 0; i <= sliderImgs.length; i++){
//         sliderImgs[i].show().siblings().hide();
//         if(i>sliderImgs.length){
//             i=0;
//         }
//     }
// })


var slideIndex = 1;
showDivs(slideIndex);


$(".arrowLeft").on("click", plusDivs(-1));
$(".arrowRight").on("click", plusDivs(1));


function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = $(".sliderImg");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";  
  }



})
