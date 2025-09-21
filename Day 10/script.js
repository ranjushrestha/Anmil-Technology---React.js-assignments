const images = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1021/600/400",
  "https://picsum.photos/id/1035/600/400",
  "https://picsum.photos/id/1043/600/400"
];

const slider = document.querySelector('.slider');
const container = document.querySelector('.slider-container');
const overlay = document.querySelector('#body-overlay');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let currentIndex = 1;
let interval = null;
let isDragging = false;
let startX = 0;

//  Create Slides 
images.forEach(src => {
  const div = document.createElement('div');
  div.className = 'slide';
  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);
  slider.appendChild(div);
});

//  Clone first and last slides for seamless loop 
const slides = document.querySelectorAll('.slide');
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');

//  Helpers 
function updateTransformX() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function updateOverlay() {
  if (allSlides[currentIndex]) { 
    overlay.style.backgroundImage = `url('${allSlides[currentIndex].querySelector('img').src}')`;
  }
}

function showSlide(index) {
  slider.style.transition = 'transform 0.5s ease-in-out';
  if (index < 0) currentIndex = 0;
  if (index >= allSlides.length) currentIndex = allSlides.length - 1;

  updateTransformX();
  updateOverlay();
}

// Set initial position
updateTransformX();
updateOverlay();

//  Loop fix on transition end 
slider.addEventListener('transitionend', () => {
  if (allSlides[currentIndex].id === 'first-clone') {
    slider.style.transition = 'none';
    currentIndex = 1;
    updateTransformX();
  }
  if (allSlides[currentIndex].id === 'last-clone') {
    slider.style.transition = 'none';
    currentIndex = allSlides.length - 2;
    updateTransformX();
  }
});

//  Autoplay 
function startInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
  }, 2000);
}

function pauseAutoplay() {
  clearInterval(interval);
}

function resumeAutoplay() {
  startInterval();
}

// ----- Buttons -----
nextBtn.addEventListener('click', () => {
  pauseAutoplay();
  currentIndex++;
  showSlide(currentIndex);
  resumeAutoplay();
});

prevBtn.addEventListener('click', () => {
  pauseAutoplay();
  currentIndex--;
  showSlide(currentIndex);
  resumeAutoplay();
});

//  Pause on hover 
slider.addEventListener('mouseenter', pauseAutoplay);
slider.addEventListener('mouseleave', resumeAutoplay);

//  Drag 
function dragStart(x) {
  isDragging = true;              
  startX = x;                   
  pauseAutoplay();                
  slider.style.cursor = 'grabbing'; 
}

function dragEnd(x) {
  if (!isDragging) return;        
  const diff = startX - x;       
  if (diff > 50) currentIndex++;  
  else if (diff < -50) currentIndex--; 
  showSlide(currentIndex);        
  isDragging = false;             
  slider.style.cursor = 'grab';  
  resumeAutoplay();               
}

//  Mouse Events  
container.addEventListener('mousedown', e => dragStart(e.clientX));
container.addEventListener('mouseup', e => dragEnd(e.clientX));
container.addEventListener('mouseleave', e => {
  if (isDragging) dragEnd(e.clientX);
});
container.addEventListener('mousemove', e => { if (!isDragging) return; });

//  Start 
startInterval();
