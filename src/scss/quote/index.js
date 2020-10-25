const BLOCKQUOTE = document.querySelector('blockquote');
const FIGCAPTION = document.querySelector('figcaption');
const BTN_QUOTE = document.querySelector('.button--quote');
const ERRORS = document.querySelector('.errors');

async function getQuote() {
  if (!BTN_QUOTE.classList.contains('button--disabled')) {
    ERRORS.textContent = '';
    BTN_QUOTE.classList.add('button--refresh-rotate');
    BTN_QUOTE.classList.add('button--disabled');
    const url = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=${localStorage.getItem('lang')}`;
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36', 'sec-fetch-site': 'none' }, mode: 'cors' });
      if (res.status !== 200) {
        throw new Error('Error');
      }
      const data = await res.json();
      BLOCKQUOTE.textContent = data.quoteText;
      FIGCAPTION.textContent = data.quoteAuthor;
    } catch (e) {
      ERRORS.textContent = 'Ошибка получение цитаты! Попробуйте получить новую цитату, кликнув по кнопке цитат.';
      console.log(e);
    }
    BTN_QUOTE.classList.remove('button--refresh-rotate');
    BTN_QUOTE.classList.remove('button--disabled');
  }
}

document.addEventListener('DOMContentLoaded', getQuote);
BTN_QUOTE.addEventListener('click', getQuote);

export default getQuote;
