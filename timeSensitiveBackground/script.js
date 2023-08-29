const r = document.querySelector(':root');
const clockElement = document.getElementById('Clock');
const nightToggleElement = document.getElementById('NightToggle');

/* Saat güncelleme mekanizması */
function clock() {
    const now = new Date();

    const formatDateOptions = {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    clockElement.innerHTML = now.toLocaleTimeString('en-GB', formatDateOptions);
}

clock(); // Saati başlatın
setInterval(clock, 1000); // Saati her saniye güncelleyin

/* Night Toggle */
nightToggleElement.addEventListener('change', () => {
    const isChecked = nightToggleElement.checked;
    const colorValue = isChecked ? "#eee" : "#111";
    const brightnessValue = isChecked ? "0.5" : "2.4";
    const hueRotateValue = isChecked ? "179deg" : "168deg";

    r.style.setProperty('filter-opacity', "0");
    setTimeout(() => {
        r.style.setProperty('--color', colorValue);
        r.style.setProperty('--filter-brightness', brightnessValue);
        r.style.setProperty('--filter-hue-rotate', hueRotateValue);
        r.style.setProperty('--filter-opacity', "1");
    }, 3500);
});

/* Geolocation ve Saat Güncelleme */
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    const now = new Date();
    const times = SunCalc.getTimes(now, latitude, longitude);
    const sunrise = new Date(times.sunrise);
    const sunset = new Date(times.sunset);
    const delayTime = 30 * 60 * 1000;
    const sunriseStart = new Date(sunrise.getTime() - delayTime);
    const sunriseEnd = new Date(sunrise.getTime() + delayTime);
    const sunsetStart = new Date(sunset.getTime() - delayTime);
    const sunsetEnd = new Date(sunset.getTime() + delayTime);

    const isNight = now < sunrise || now > sunset;
    const colorValue = isNight ? '#eee' : '#111';
    const brightnessValue = isNight ? "0.5" : "2.4";
    const hueRotateValue = isNight ? "179deg" : "168deg";

    let opacityValue = 100;
    if (now > sunriseStart && now < sunriseEnd) {
        opacityValue = getPrecision(now, sunriseStart, sunriseEnd);
    } else if (now > sunsetStart && now < sunsetEnd) {
        opacityValue = getPrecision(now, sunsetStart, sunsetEnd);
    }

    console.log({
        isNight: isNight,
        sunriseStart: sunriseStart,
        sunriseEnd: sunriseEnd,
        now: now,
        opacityValue: opacityValue
    });

    r.style.setProperty('--color', colorValue);
    r.style.setProperty('--filter-brightness', brightnessValue);
    r.style.setProperty('--filter-hue-rotate', hueRotateValue);
    r.style.setProperty('--filter-opacity', opacityValue + "%");
});
