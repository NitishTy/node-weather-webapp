const request = require('request');
const getWeather = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/5f6d8846f872c58db380714451d19376/' + lat + ',' + long + '?units=si';
    // request method to get data
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback({error: error});
        } else {
            // console.log(body.daily.data[0]);
            callback({timezone: body.timezone, summary: body.daily.data[0].summary, temp: body.currently.temperature, precPr: body.currently.precipProbability, sunriseTime: body.daily.data[0].sunriseTime, sunsetTime: body.daily.data[0].sunsetTime});
        }
    });
}

// request to get the latitude and longitude using mapbox api
const getLatLong = (city,country,callback) => {
    console.log('city: ' + city);
    var mapUrl;
    if(country != undefined) {
        mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ city +'.json?access_token=pk.eyJ1Ijoibml0c3R5YWdpIiwiYSI6ImNqeXQxb3lwaTAxNWUzZHN5ZmsxY3B1enUifQ.M1nm_TOvCuoWGeysg3C5SQ&country=' + country + '&limit=1'; 
    }
    else {
        mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ city +'.json?access_token=pk.eyJ1Ijoibml0c3R5YWdpIiwiYSI6ImNqeXQxb3lwaTAxNWUzZHN5ZmsxY3B1enUifQ.M1nm_TOvCuoWGeysg3C5SQ&limit=1';
    }
    request({url: mapUrl, json: true}, (error, {body}) => {
        //console.log(response.body);
        if(error) {
            callback({error: error});
        } else if(body.features.length < 1) {
            callback({error: 'unable to find the location, search for a different city'});
        } else {
            callback({'lat':body.features[0].center[1],'long':body.features[0].center[0]});
        }
    })
}

module.exports = {
    getLatLong: getLatLong,
    getWeather: getWeather
};