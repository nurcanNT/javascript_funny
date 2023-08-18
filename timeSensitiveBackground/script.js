import * as SunCalc from  "https://cdn.skypack.dev/suncalc@1.9.0";

const r = document.querySelector(':root');
const clockElement = document.getElementById('Clock');
const nightToggleElement = document.getElementById('NightToggle');

/*when checkbow is clicked*/
nightToggleElement.addEventListener('change', ()=>{
    const isCheched = nightToggleElement.checked;
    const colorValue = isCheched ? "#eee" : "#111";
    const brightnessValue = isCheched ? "0.5" : "2.4";
    const hueRotateValue = isCheched ? "179deg" : "168deg";

    /*update CSS variables (immediately and after 2.5s)*/
    r.style.setProperty('filter-opacity', "0");
    setTimeout(() => {
        r.style.setProperty('--color', colorValue);
        r.style.setProperty('--filter-brightness', brightnessValue);
        r.style.setProperty('--filter-hue-rotate', hueRotateValue);
        r.style.setProperty('--filter-opacity', "1");
    }, 2500);
   
});
//time sensitive

function getPrecision(value, min, max) {
    const interval = max - min;
    const distanceValue = value - min;
    return Math.abs(Math.round(100 - distanceValue / (interval /2) * 100));
}

//fetch the geographical coordinates of the user
navigator.geolocation.getCurrentPosition((position) => {
    const {latitude, longitude}= position.coords;

    //use UseCalc to Calculate Sunrise Time

    const now = new Date();
    const times = SunCalc.getTimes(new Date(), latitude, longitude);
    const sunrise = new Date(times.sunrise);
    const sunset = new Date(times.sunset);
    const delayTime = 30 * 60 * 1000; 
    const sunriseStart = new Date(sunrise.getTime() - delayTime);
    const sunriseEnd = new Date(sunrise.getTime()+delayTime);
    const sunsetStart = new Date(sunset.getTime() - delayTime);
    const sunsetEnd = new Date(sunset.getTime()+ delayTime);
    const interval = delayTime * 2;
    const sunriseDistance = now - sunriseStart;
    const sunsetDistance = now - sunsetStart;
    const isNight = now < sunrise || now > sunset;

    const colorValue = isNight ? '#eee' : '#111';
    const brightnessValue = isNight ? "0.5" : "2.4";
    const hueRotateValue = isNight ? "179deg" : "168deg";
    const opacityValue = now > sunriseStart && now < sunriseEnd 
    ? getPrecision(now, sunriseStart, sunriseEnd)
    : now > sunsetStart && now < sunsetEnd
    ? getPrecision(now, sunsetStart, sunsetEnd): 100;

    console.log({
        isNight: now < sunrise || now > sunset,
        sunriseStart,
        sunriseEnd,
        now,
        opacityValue
    });

    r.style.setProperty('--color', colorValue);
    r.style.setProperty('--filter-brightness', brightnessValue);
    r.style.setProperty('--filter-hue-rotate', hueRotateValue);
    r.style.setProperty('--filter-opacity', opacityValue + "%");
});

function clock() {
    const now = new Date();

    const formatDateOptios = {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    clockElement.innerHTML = now.toLocaleTimeString('en-GB', formatDateOptios);

    clock();
    setInterval(clock,1000);
}
