import setGreet from '../greeting';
import {
  reset,
  viewBgImage,
  IMAGES,
  resetImages,
} from '../page';
import { days, months } from './i18n';

const DATE = document.querySelector('.date-time__date');
const TIME = document.querySelector('.date-time__time');

function showTime() {
  const TODAY = new Date();
  const HOUR = TODAY.getHours();
  const MIN = TODAY.getMinutes() < 10 ? `0${TODAY.getMinutes()}` : TODAY.getMinutes();
  const SEC = TODAY.getSeconds() < 10 ? `0${TODAY.getSeconds()}` : TODAY.getSeconds();

  TIME.innerHTML = `${HOUR}:${MIN}:${SEC}`;
  DATE.innerHTML = `${days[localStorage.getItem('lang')][TODAY.getDay()]} ${TODAY.getDate()} ${months[localStorage.getItem('lang')][TODAY.getMonth()]}`;
  setGreet();
  if (TODAY.getHours() === 0 && TODAY.getMinutes() === 0 && TODAY.getSeconds() === 0) {
    resetImages();
    reset();
    viewBgImage(`./assets/${IMAGES[HOUR]}`);
  }
  if (TODAY.getHours() !== 0 && TODAY.getMinutes() === 0 && TODAY.getSeconds() === 0) {
    reset();
    viewBgImage(`./assets/${IMAGES[HOUR]}`);
  }
}

document.addEventListener('DOMContentLoaded', showTime);
setInterval(() => showTime(), 1000);
