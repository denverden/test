import phrase from './i18n';

const GREETING = document.querySelector('.greeting__text');
const NAME = document.querySelector('.greeting__name');
if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'ru');
}

function setGreet() {
  const today = new Date();
  const hour = today.getHours();

  if (NAME.value === '') {
    NAME.setAttribute('size', NAME.getAttribute('placeholder').length + 1);
  } else {
    NAME.setAttribute('size', NAME.value.length + 1);
  }

  if (localStorage.getItem('name') === null) {
    NAME.setAttribute('placeholder', phrase[localStorage.getItem('lang')].placeholder);
  }

  if ((hour >= 6) && (hour < 12)) {
    GREETING.textContent = phrase[localStorage.getItem('lang')].morning;
  } else if (hour >= 12 && (hour < 18)) {
    GREETING.textContent = phrase[localStorage.getItem('lang')].afternoon;
  } else if ((hour >= 18) && (hour < 24)) {
    GREETING.textContent = phrase[localStorage.getItem('lang')].evening;
  } else {
    GREETING.textContent = phrase[localStorage.getItem('lang')].night;
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    NAME.value = '';
    NAME.setAttribute('placeholder', phrase[localStorage.getItem('lang')].placeholder);
  } else {
    NAME.value = '';
    NAME.setAttribute('placeholder', localStorage.getItem('name'));
  }
}

function setName(e) {
  NAME.setAttribute('size', NAME.value.length + 1);
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      if (NAME.value !== '') {
        localStorage.setItem('name', e.target.value);
        NAME.value = '';
        NAME.setAttribute('placeholder', localStorage.getItem('name'));
      }
      NAME.blur();
    }
  } else {
    NAME.setAttribute('size', NAME.getAttribute('placeholder').length + 1);
    NAME.value = '';
  }
}

document.addEventListener('DOMContentLoaded', setGreet);
NAME.addEventListener('keypress', setName);
NAME.addEventListener('blur', setName);
getName();

export default setGreet;
