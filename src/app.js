const path = require('path');
const express = require('express');
const requests = require('./requests.js');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);
// setting up routes
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nitish Tyagi'
    });
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Nitish Tyagi'
    });
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'Lets help you out',
        name: 'Nitish Tyagi'
    });
})
app.get('/weather',(req,res) => {
    console.log(req.query);
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    requests.getLatLong(req.query.address,undefined, ({lat, long}) => {
        // console.log(data);
        if(lat === undefined || long === undefined) {
            return res.send({error: 'search for a different city'});
        }
        requests.getWeather(lat,long, (data) => {
            console.log(data);
            if(data.error) {
                return res.send({error: error});
            }
            res.send({
                location: req.query.address,
                timezone: data.timezone,
                forecast: data.summary,
                temperature: data.temp,
                rainChances: data.precPr + '%',
                sunriseTime: data.sunriseTime,
                sunsetTime: data.sunsetTime
            })
        });
    })
})
app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 Not Found',
        name: 'Nitish Tyagi',
        message: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('error', {
        title: '404 Not Found',
        name: 'Nitish Tyagi',
        message: 'Page not found'
    })
})
// listen to port 3000
app.listen(port, () => {
    console.log('server is up on ' + port);
})