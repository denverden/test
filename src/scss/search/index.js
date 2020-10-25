import phrase from './i18n';

const INPUT = document.querySelector('.search__input');
const BTN_SEARCH = document.querySelector('.search__btn-search');
const ERRORS = document.querySelector('.errors');
const WEATHER = document.querySelector('.weather');
const ICON = document.querySelector('.weather__icon');
const TEMP = document.querySelector('.weather__temp');
const DESC = document.querySelector('.weather__desc');

if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'ru');
}

function setSearch() {
  if (localStorage.getItem('city') === null) {
    INPUT.value = '';
    INPUT.setAttribute('placeholder', phrase[localStorage.getItem('lang')].placeholder);
  } else {
    INPUT.value = '';
    INPUT.setAttribute('placeholder', localStorage.getItem('city'));
  }
  BTN_SEARCH.value = phrase[localStorage.getItem('lang')].btn;
}

async function getWeather() {
  if ((INPUT.value === null || INPUT.value === '') && phrase[localStorage.getItem('lang')].placeholder !== INPUT.getAttribute('placeholder')) {
    INPUT.value = localStorage.getItem('city');
  }
  if (INPUT.value !== null && INPUT.value !== '') {
    ERRORS.textContent = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${INPUT.value}&lang=${localStorage.getItem('lang')}&appid=27eeda52c9ddbc73ff0a7b4bb4b1fd75&units=metric`;
    try {
      const val = INPUT.value;
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        TEMP.innerHTML = `${Math.round(data.main.temp)}&deg;`;
        DESC.innerHTML = `${data.weather[0].description}<br>${phrase[localStorage.getItem('lang')].humidity} ${data.main.humidity}%<br>${phrase[localStorage.getItem('lang')].wind} ${data.wind.speed} ${phrase[localStorage.getItem('lang')].itm}`;
        ICON.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
        localStorage.setItem('city', val);
        INPUT.setAttribute('placeholder', localStorage.getItem('city'));
        INPUT.value = '';
        WEATHER.style.backgroundColor = '#9999';
      } else {
        throw new Error('Error');
      }
    } catch (e) {
      WEATHER.style.backgroundColor = '#0000';
      INPUT.value = '';
      ICON.style = '';
      TEMP.innerHTML = '';
      DESC.innerHTML = '';
      ERRORS.textContent = 'Ошибка получение погоды! Попробуйте изменить название и поищите еще раз.';
      console.log(e);
    }
  }
}

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      getWeather();
      INPUT.blur();
    }
  } else {
    INPUT.value = '';
  }
}

document.addEventListener('DOMContentLoaded', setSearch);
INPUT.addEventListener('keypress', setCity);
BTN_SEARCH.addEventListener('click', getWeather);

export { setSearch, getWeather };
