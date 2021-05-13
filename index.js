let rotatePerInterval;
let totalRotation = 0;


const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const secondsInput = document.querySelector('.seconds-input');

const leftBlocker = document.querySelector('.left-blocker');
const rightBlocker = document.querySelector('.right-blocker');

const leftTimerBox = document.querySelector('.left-timer-box');
const rightTimerBox = document.querySelector('.right-timer-box');

//Helper Functions

const controlRotation = function () {
  if (totalRotation <= 180) {
    leftTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  } else if ((totalRotation >= 180) && (totalRotation < 190)) {
    leftTimerBox.style.transform = 'rotate(180deg)';
    leftTimerBox.style.zIndex = 60;
    rightTimerBox.style.zIndex = 59;
    rightBlocker.style.zIndex = 58;
    rightTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  } else if (totalRotation < 359.9) {
    rightTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  }
}

const resetRotation = function () {
  leftTimerBox.style.transform = `rotate(${totalRotation}deg)`;
  rightTimerBox.style.transform = `rotate(180deg)`;
  leftTimerBox.style.zIndex = 30;
  rightTimerBox.style.zIndex = 20;
  leftBlocker.style.zIndex = 50;
  rightBlocker.style.zIndex = 25;
}

const timer = new Timer(playButton, pauseButton, secondsInput, {
  reset() {
    rotatePerInterval = 360 / (secondsInput.value * 100);
    totalRotation = 0;
    resetRotation();
  },
  onTick() {
    totalRotation += rotatePerInterval;
    controlRotation();
  },
  onFinish() {
    rightTimerBox.style.transform = `rotate(180deg)`;
    leftTimerBox.style.transform = 'none';
  },
});



