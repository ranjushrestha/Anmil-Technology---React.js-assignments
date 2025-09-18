// Select elements
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const sliderBgOverlay = document.getElementById('slider-bg-overlay');
const sliderContainer = document.querySelector('.slider-container');

let index = 1; // Start at 1 because of clones
const slideInterval = 2000;
let interval;
let isTransitioning = false; // Prevent multiple clicks during transition
let isPaused = false;        // Track hover pause

// Clone first and last slides for seamless loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');
const totalSlides = allSlides.length;

// Set initial position
slider.style.transform = `translateX(-${index * 100}%)`;

// Update background overlay
function updateBackground() {
  const imgSrc = allSlides[index].querySelector('img').src;
  sliderBgOverlay.style.backgroundImage = `url('${imgSrc}')`;
}
updateBackground();

// Show slide function
function showSlide(i) {
  if (isTransitioning) return;
  isTransitioning = true;
  index = i;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateBackground();
}

// After transition, reset if at clone
slider.addEventListener('transitionend', () => {
  if (allSlides[index].id === 'first-clone') {
    slider.style.transition = 'none';
    index = 1;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
  if (allSlides[index].id === 'last-clone') {
    slider.style.transition = 'none';
    index = totalSlides - 2;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
  isTransitioning = false;
});

// Move slides
function moveSlide(step) {
  showSlide(index + step);
}

// Buttons
nextBtn.addEventListener('click', () => {
  moveSlide(1);
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  moveSlide(-1);
  resetInterval();
});

// Auto-slide
function startInterval() {
  clearInterval(interval); // clear any existing interval
  if (!isPaused) {
    interval = setInterval(() => moveSlide(1), slideInterval);
  }
}

// Reset interval after manual navigation
function resetInterval() {
  clearInterval(interval);
  if (!isPaused) {
    startInterval();
  }
}

// Pause on hover
sliderContainer.addEventListener('mouseenter', () => {
  clearInterval(interval);
  isPaused = true;
});

sliderContainer.addEventListener('mouseleave', () => {
  isPaused = false;
  startInterval();
});

// Start slider
startInterval();
