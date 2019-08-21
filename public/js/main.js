const fetchData = (val) => {
    let url = '/weather?address=' + val;
    fetch(url).then((response) => {
        // console.log(response.headers);
        response.json().then((data) => {
            console.log(data);
            let sunriseTime = getFormatTime(data.sunriseTime);
            let sunsetTime = getFormatTime(data.sunsetTime);
            if(data.error) {
                msg1.textContent = data.error;
                msg1.style.color = 'red';
                msg2.innerHTML = '';
                msg3.innerHTML = '';
            } else {
                msg1.textContent = 'Location: ' + data.location + ', timezone: ' + data.timezone;
                msg2.textContent = data.forecast + 'The temperature is ' + data.temperature + ' with ' + data.rainChances + ' of rain.';
                msg3.textContent = 'The sun rises at ' + sunriseTime + ' and sun sets at ' + sunsetTime + ' according to your country time in ' + data.location + '.';
                msg1.style.color = '#000';
                msg2.style.color = '#000';
                msg3.style.color = '#000';
            }
        })
    })
}

// form function
const weatherForm = document.forms['weather'];
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const msg3 = document.querySelector('#msg-3');
weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    msg2.innerHTML = 'Loading...';
    console.log(weatherForm['search'].value);
    fetchData(weatherForm['search'].value);
})
// format time for sunrise and sunset
let getFormatTime = (epoc) => {
    let date = new Date(0);
    date.setUTCSeconds(epoc);
    let format;
    if(date.getHours() > 12) {
        format = (date.getHours() - 12) + ":" + date.getMinutes() + "pm";
    }
    else if(date.getHours() === 12) {
        format = date.getHours() + ":" + date.getMinutes() + "pm";
    }
    else {
        format = date.getHours() + ":" + date.getMinutes() + "am";
    }
    return format;
}