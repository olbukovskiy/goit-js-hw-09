
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  colorArea: document.querySelector('body'),
};

const { startBtn, stopBtn, colorArea } = refs;
let intervalId = null;
let isActive = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.setAttribute('disabled', 'true');

function onStartBtnClick() {
  if (!isActive) {
    intervalId = setInterval(() => {
      let currentColor = getRandomHexColor();

      colorArea.style.backgroundColor = currentColor;
    }, 1000);

    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');

    isActive = true;
  }
}

function onStopBtnClick() {
  if (isActive) {
    clearInterval(intervalId);

    isActive = false;
  }

  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
}
