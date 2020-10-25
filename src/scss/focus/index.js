import phrase from './i18n';

const QUESTION = document.querySelector('.focus__question');
const TEXT = document.querySelector('.focus__text');
if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'ru');
}

function setQuestion() {
  if (localStorage.getItem('text') === null) {
    TEXT.setAttribute('placeholder', phrase[localStorage.getItem('lang')].placeholder);
  }

  QUESTION.textContent = phrase[localStorage.getItem('lang')].question;
}

function getText() {
  if (localStorage.getItem('text') === null) {
    TEXT.value = '';
    TEXT.setAttribute('placeholder', phrase[localStorage.getItem('lang')].placeholder);
  } else {
    TEXT.value = '';
    TEXT.setAttribute('placeholder', localStorage.getItem('text'));
  }
}

function setText(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      if (TEXT.value !== '') {
        localStorage.setItem('text', e.target.value);
        TEXT.value = '';
        TEXT.setAttribute('placeholder', localStorage.getItem('text'));
      }
      TEXT.blur();
    }
  } else {
    TEXT.value = '';
  }
}

document.addEventListener('DOMContentLoaded', setQuestion);
TEXT.addEventListener('keypress', setText);
TEXT.addEventListener('blur', setText);

getText();

export default setQuestion;
