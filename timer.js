class Timer {
  constructor(playButton, pauseButton, secondsInput, callbacks) {

    this.totalSeconds = 60;
    this.secondsLeft = 60;

    this.playButton = playButton;
    this.pauseButton = pauseButton;
    this.secondsInput = secondsInput;

    if (callbacks) {
      this.reset = callbacks.reset;
      this.onTick = callbacks.onTick;
      this.onFinish = callbacks.onFinish;
      this.reset = callbacks.reset;
    }

    this.playButton.addEventListener('click', this.start);
    this.secondsInput.addEventListener('focus', this.inputClick);
    this.secondsInput.addEventListener('blur', this.inputBlur);
    this.secondsInput.value = this.secondsLeft;
  }

  start = () => {
    if (this.totalSeconds === this.secondsLeft && this.reset) {
      this.reset();
    }

    this.intervalVar = setInterval(this.tick, 10);
    this.playButton.removeEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  pause = () => {
    clearInterval(this.intervalVar);
    this.pauseButton.removeEventListener('click', this.pause);
    this.playButton.addEventListener('click', this.start);
  }

  tick = () => {
    //If timer is done
    if (this.secondsLeft <= 0) {
      if (this.onFinish) {
        this.onFinish();
      }
      this.pause();
      this.playButton.removeEventListener('click', this.start);
      alert('DING DING DING!');
    }

    //If timer is ticking once
    if (this.onTick) {
      this.onTick();
    }
    this.secondsLeft -= .01;
    this.secondsInput.value = Math.ceil(this.secondsLeft);
  }

  inputClick = () => {
    this.secondsInput.value = '';
    this.secondsInput.addEventListener('keypress', this.keyPress);
    this.pause();
    this.playButton.removeEventListener('click', this.start);
  }

  inputBlur = () => {
    if (this.secondsInput.value === '') {
      // Defensive: Handle user clicking on and off finished timer
      if (this.secondsLeft <= 0) {
        this.secondsInput.value = 0;
        this.secondsInput.removeEventListener('keypress', this.keyPress);
        // Defensive: Handle user blurring timerInput when page first loads
      } else if (this.totalSeconds === this.secondsLeft) {
        this.secondsInput.value = this.secondsLeft;
        this.secondsInput.removeEventListener('keypress', this.keyPress);
        this.playButton.addEventListener('click', this.start);
        // Defensive: Handle user blurring timerInput without inputting; Continue running timer
      } else {
        this.playButton.addEventListener('click', this.start);
        this.secondsInput.removeEventListener('keypress', this.keyPress);
        this.start();
      }
      // Handle user inputting seconds and then clicking elsewhere (blurring)
    } else {
      this.reset();
      this.totalSeconds = parseInt(this.secondsInput.value);
      this.secondsLeft = this.totalSeconds;
      this.playButton.addEventListener('click', this.start);
    }
  }

  keyPress = (e) => {

    // Disallow leading 0's
    if (e.key === '0' && this.secondsInput.value === '') {
      e.preventDefault();
      return;

      // Handle 'Enter' press with no given number
    } else if (e.key === 'Enter' && this.secondsInput.value === '') {
      e.preventDefault();
      this.secondsInput.blur();

      //Handle input of numbers and reset of timer
    } else if (e.key === 'Enter') {
      e.preventDefault();
      secondsInput.blur();

      if (this.reset) {
        this.reset();
      }

      this.totalSeconds = parseInt(this.secondsInput.value);
      this.secondsLeft = this.totalSeconds;

      this.playButton.addEventListener('click', this.start);
      this.secondsInput.removeEventListener('keypress', this.keyPress);

      this.start();

      //Handle incorrect non-numeric entry
    } else if (isNaN(parseInt(e.key))) {
      e.preventDefault();
      return;
    }
  }
}