const fetchData = (val) => {
    let url = 'http://localhost:3000/weather?address=' + val;
    fetch(url).then((response) => {
        console.log(response.headers);
        response.json().then((data) => {
            console.log(data);
            if(data.error) {
                msg1.textContent = data.error;
                msg1.style.color = 'red';
                msg2.innerHTML = '';
            } else {
                msg1.textContent = 'Location: ' + data.location + ', timezone: ' + data.timezone;
                msg2.textContent = data.forecast + 'The temperature is ' + data.temperature + ' with ' + data.rainChances + ' of rain.';
                msg1.style.color = '#000';
                msg2.style.color = '#000';
            }
        })
    })
}

// form function
const weatherForm = document.forms['weather'];
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    msg2.innerHTML = 'Loading...';
    console.log(weatherForm['search'].value);
    fetchData(weatherForm['search'].value);
})