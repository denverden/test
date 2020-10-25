const BTN_IMG = document.querySelector('.button--refresh');
const TODAY = new Date();
const IMAGES = [];
let hour = TODAY.getHours();

function resetImages() {
  IMAGES.splice(0, IMAGES.length);
  for (let i = 0; i < 24; i += 1) {
    let prefix;
    if (i < 6) {
      prefix = 'night';
    } else if (i < 12) {
      prefix = 'morning';
    } else if (i < 18) {
      prefix = 'day';
    } else if (i < 24) {
      prefix = 'evening';
    }
    let rand = Math.floor(Math.random() * 20) + 1;
    while (IMAGES.includes(`${prefix}/${rand}.jpg`)) {
      rand = Math.floor(Math.random() * 20) + 1;
    }
    IMAGES.push(`${prefix}/${rand}.jpg`);
  }
  console.log('Массив изображений на сутки:', IMAGES);
}

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
    setTimeout(() => {
      BTN_IMG.classList.remove('button--refresh-rotate');
      BTN_IMG.classList.remove('button--disabled');
    }, 1000);
  };
}

function getImage() {
  if (!BTN_IMG.classList.contains('button--disabled')) {
    const index = hour % IMAGES.length;
    const imageSrc = `./assets/${IMAGES[index]}`;
    viewBgImage(imageSrc);
    hour += 1;
    BTN_IMG.classList.add('button--refresh-rotate');
    BTN_IMG.classList.add('button--disabled');
  }
}

function reset() {
  hour = TODAY.getHours() === 23 ? 0 : TODAY.getHours() + 1;
}

document.addEventListener('DOMContentLoaded', getImage);
BTN_IMG.addEventListener('click', getImage);

resetImages();

export {
  reset,
  viewBgImage,
  IMAGES,
  resetImages,
};
