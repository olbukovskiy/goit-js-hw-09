import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
require('flatpickr/dist/themes/dark.css');

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

const { dateInput, day, hour, min, sec, startBtn, stopBtn } = refs;
let intervalId = null;
let isActive = false;
let deltaTime = 0;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Report.failure(
        'Invalid data!',
        'Please choose a date in the future.',
        'Okay'
      );
    }

    if (selectedDates[0] > Date.now()) {
      startBtn.removeAttribute('disabled');
      startBtn.classList.add('active');

      startBtn.addEventListener('click', () => {
        timerCreator(selectedDates[0]);
      });
    }
  },
};

const calendars = flatpickr(dateInput, options);

function timerCreator(time) {
  if (!isActive) {
    isActive = true;

    intervalId = setInterval(() => {
      const currentTime = Date.now();
      deltaTime = time - currentTime;
      const convertedTime = convertMs(deltaTime);
      clockFaceUpdate(convertedTime);
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(time) {
  return time.toString().padStart(2, '0');
}

function clockFaceUpdate({ days, hours, minutes, seconds }) {
  day.textContent = days;
  hour.textContent = hours;
  min.textContent = minutes;
  sec.textContent = seconds;
}
