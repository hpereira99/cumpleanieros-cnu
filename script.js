const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);
const $prev = $g(".prev");
const $next = $g(".next");
const $list = $g(".carousel__list");
let auto;
let pauser;

const getActiveIndex = () => {
  const $active = $g("[data-active]");
  return getSlideIndex($active);
};

const getSlideIndex = ($slide) => {
  return [...$q(".carousel__item")].indexOf($slide);
};

const prevSlide = () => {
  const index = getActiveIndex();
  const $slides = $q(".carousel__item");
  const $last = $slides[$slides.length - 1];
  $last.remove();
  $list.prepend($last);
  activateSlide($q(".carousel__item")[index]);
};
const nextSlide = () => {
  const index = getActiveIndex();
  const $slides = $q(".carousel__item");
  const $first = $slides[0];
  $first.remove();
  $list.append($first);
  activateSlide($q(".carousel__item")[index]);
};

const chooseSlide = (e) => {
  const max = window.matchMedia("screen and ( max-width: 600px)").matches
    ? 5
    : 8;
  const $slide = e.target.closest(".carousel__item");
  const index = getSlideIndex($slide);
  if (index < 3 || index > max) return;
  if (index === max) nextSlide();
  if (index === 3) prevSlide();
  activateSlide($slide);
};

const activateSlide = ($slide) => {
  if (!$slide) return;
  const $slides = $q(".carousel__item");
  $slides.forEach((el) => el.removeAttribute("data-active"));
  $slide.setAttribute("data-active", true);
  $slide.focus();
};

const autoSlide = () => {
  nextSlide();
};

const pauseAuto = () => {
  clearInterval(auto);
  clearTimeout(pauser);
};

const handleNextClick = (e) => {
  pauseAuto();
  nextSlide(e);
};

const handlePrevClick = (e) => {
  pauseAuto();
  prevSlide(e);
};

const handleSlideClick = (e) => {
  pauseAuto();
  chooseSlide(e);
};

const handleSlideKey = (e) => {
  switch (e.keyCode) {
    case 37:
    case 65:
      handlePrevClick();
      break;
    case 39:
    case 68:
      handleNextClick();
      break;
  }
};

const startAuto = () => {
  auto = setInterval(autoSlide, 3000);
};

startAuto();

$next.addEventListener("click", handleNextClick);
$prev.addEventListener("click", handlePrevClick);
$list.addEventListener("focusin", handleSlideClick);
$list.addEventListener("keyup", handleSlideKey);

window.onload = function() {

  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 60, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  // ##########################################################################

  var end = Date.now() + (2 * 1000);
  // go Buckeyes!
  var colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};