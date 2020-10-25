import getQuote from '../quote';
import setGreet from '../greeting';
import setQuestion from '../focus';
import { setSearch, getWeather } from '../search';

const BTN_EN = document.querySelector('.button--first');
const BTN_RU = document.querySelector('.button--last');
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';

function changeLang(prLang) {
  localStorage.setItem('lang', prLang);

  if (prLang === 'ru') {
    BTN_EN.classList.remove('button--active');
    BTN_RU.classList.add('button--active');
  } else {
    BTN_EN.classList.add('button--active');
    BTN_RU.classList.remove('button--active');
  }

  getQuote();
  setGreet();
  setQuestion();
  setSearch();
  getWeather();
}

document.addEventListener('DOMContentLoaded', changeLang(lang));
BTN_EN.addEventListener('click', () => changeLang('en'));
BTN_RU.addEventListener('click', () => changeLang('ru'));
