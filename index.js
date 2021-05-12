let totalSeconds = 60;
let seconds = totalSeconds;
let rotatePerInterval = 360 / (totalSeconds * 100)
let totalRotation = 0;

const secondsContainer = document.querySelector(".seconds-container");
const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");

const leftBlocker = document.querySelector('.left-blocker');
const rightBlocker = document.querySelector('.right-blocker');

const leftTimerBox = document.querySelector('.left-timer-box');
const rightTimerBox = document.querySelector('.right-timer-box');

const secondsInput = document.querySelector('.seconds-input');

secondsContainer.innerText = seconds;

const countdown = () => {
  if (seconds <= 0) {
    pauseHandler();
    playButton.removeEventListener('click', playHandler);
    rightTimerBox.style.transform = `rotate(180deg)`;
    leftTimerBox.style.transform = 'none';
    alert('DING DING DING!');
  }

  if (totalRotation <= 180) {
    leftTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  } else if ((totalRotation >= 180) && (totalRotation < 190)) {
    leftTimerBox.style.zIndex = 60;
    rightTimerBox.style.zIndex = 59;
    rightBlocker.style.zIndex = 58;
    rightTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  } else if (totalRotation < 359.9) {
    rightTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  }
  seconds -= .01;
  totalRotation += rotatePerInterval;
  secondsContainer.innerText = Math.ceil(seconds);

}

let intervalVar

const playHandler = (e) => {
  intervalVar = setInterval(countdown, 10);
  playButton.removeEventListener('click', playHandler);
  pauseButton.addEventListener('click', pauseHandler);
}

const pauseHandler = (e) => {
  clearInterval(intervalVar);
  pauseButton.removeEventListener('click', pauseHandler);
  playButton.addEventListener('click', playHandler);
}

const inputHandler = (e) => {
  e.preventDefault();

  secondsContainer.style.display = 'none';
  secondsInput.style.display = 'block';
  secondsInput.value = '';
  secondsInput.focus();
  secondsInput.addEventListener('keypress', keyHandler);

  secondsContainer.style.boxShadow = "0 15px 15px black";
  secondsInput.style.boxShadow = "0 15px 15px black";

  pauseHandler();
  playButton.removeEventListener('click', playHandler);
}

const keyHandler = (e) => {
  if (e.key === '0' && secondsInput.value.length === 0) {
    e.preventDefault();
    return;
  } else if (e.key === 'Enter' && secondsInput.value === '') {
    e.preventDefault();

    secondsInput.style.display = 'none';
    secondsInput.style.boxShadow = 'none';

    secondsContainer.style.display = 'block';
    secondsContainer.style.boxShadow = 'none';

    playButton.addEventListener('click', playHandler);
    secondsInput.removeEventListener('keypress', keyHandler);

    playHandler();

  } else if (e.key === 'Enter') {
    e.preventDefault();
    totalSeconds = parseInt(secondsInput.value);
    seconds = totalSeconds;
    rotatePerInterval = 360 / (totalSeconds * 100)
    totalRotation = 0;
    leftTimerBox.style.transform = `rotate(${totalRotation}deg)`;
    rightTimerBox.style.transform = `rotate(180deg)`;
    leftTimerBox.style.zIndex = 30;
    rightTimerBox.style.zIndex = 20;
    leftBlocker.style.zIndex = 50;
    rightBlocker.style.zIndex = 25;

    secondsContainer.innerText = seconds;

    secondsInput.style.display = 'none';
    secondsInput.style.boxShadow = 'none';

    secondsContainer.style.display = 'block';
    secondsContainer.style.boxShadow = 'none';

    playButton.addEventListener('click', playHandler);
    secondsInput.removeEventListener('keypress', keyHandler);

    playHandler();
  } else if (isNaN(parseInt(e.key))) {
    e.preventDefault();
    return;
  }
}

playButton.addEventListener('click', playHandler);
secondsContainer.addEventListener('dblclick', inputHandler);

