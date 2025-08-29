const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keyCheckbox = document.querySelector(".keys-checkbox input");

let AllKeys = [],
    audio = new Audio("tunes/a.wav");

const playtune = (key) => {
  audio.src = `tunes/${key}.wav`;
  audio.play();
  const clikedkey = document.querySelector(`[data-key="${key}"]`);
  clikedkey.classList.add("active");
  setTimeout(() => clikedkey.classList.remove("active"), 150);
};

// collect keys + click events
pianoKeys.forEach((key) => {
  AllKeys.push(key.dataset.key);
  key.addEventListener("click", () => playtune(key.dataset.key));
});

// volume slider
const handleVolume = (e) => {
  audio.volume = e.target.value;
};
volumeSlider.addEventListener("input", handleVolume);

// show/hide keys
const showHidekeys = () => {
  pianoKeys.forEach(key => key.classList.toggle("hide"));
};
keyCheckbox.addEventListener("click", showHidekeys);

// prevent repeated keydown firing
const pressedKeys = new Set();
document.addEventListener("keydown", e => {
  if (AllKeys.includes(e.key) && !pressedKeys.has(e.key)) {
    pressedKeys.add(e.key);
    playtune(e.key);
  }
});
document.addEventListener("keyup", e => pressedKeys.delete(e.key));
