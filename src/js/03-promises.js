import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formField = document.querySelector('.form');
let timerId = null;
// let counter = 0;

formField.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let del = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, del)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    del += Number(step.value);
  }

  // while (counter < amount.value) {
  //   counter++;

  //   createPromise(counter, del)
  //     .then(({ position, delay }) => {
  //       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //     })
  //     .catch(({ position, delay }) => {
  //       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  //     });

  //   del += Number(step.value);
  // }
  // counter = 0;
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
