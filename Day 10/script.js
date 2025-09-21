const images = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4"
];

const slider = document.querySelector('.slider');
const container = document.querySelector('.slider-container');
const overlay = document.querySelector('#body-overlay'); // fixed
const prevBtn = document.querySelector('#prev');         // fixed
const nextBtn = document.querySelector('#next');         // fixed


let currentIndex = 1;
let interval = null;
// let isDragging = false;
// let startX = 0;

// Create Slides //
images.forEach(src => {
    const div = document.createElement('div');
    div.className = 'slide';
    const img = document.createElement('img');
    img.src = src;
    div.appendChild(img)
    slider.appendChild(div);
});

// clone first and last for seamless loop //
const slides = document.querySelectorAll('.slide');
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.slide');

// Helper function //
function updateTransformX() {
    slider.style.transform =  `translateX(-${currentIndex * 100}%)`
}
function updateOverlay() {
    overlay.style.backgroundImage = `url('${allSlides[currentIndex].querySelector('img').src}')`;
}

function showSlide(index) {
    slider.style.transition = 'transform 0.5s ease-in-out';
    updateTransformX();
    updateOverlay();
}


// Set initial position //
updateTransformX();
updateOverlay();

// Loop fix on transition end //
slider.addEventListener('transitionend', () => {
    if(allSlides[currentIndex].id === 'first-clone') {
        slider.style.transition = 'none';
        currentIndex = 1;
        updateTransformX();
    }
    if(allSlides[currentIndex].id === 'last-clone') {
        slider.style.transition = 'none';
        currentIndex = allSlides.length - 2;
        updateTransformX();
    }
} );

// Interval Management //
function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
        currentIndex++;
        showSlide(currentIndex);
    }, 2000)
}
function pauseAutoplay () {
    clearInterval(interval);
}
function resumeAutoplay () {
    startInterval()
}

// Next/Prev buttons //
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

// Pause on hover //
slider.addEventListener('mouseenter', pauseAutoplay);
slider.addEventListener('mouseleave', resumeAutoplay);

// Drag Image //
container.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    pauseAutoplay();
    slider.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', e => {
    if(!isDragging) return;
    const diff = startX - e.clientX;
    if(diff > 50) currentIndex++;
    else if(diff < -50) currentIndex--;
    showSlide(currentIndex);
    isDragging = false;
    slider.style.cursor = 'grab';
    resumeAutoplay();
    
});
container.addEventListener('mouseleave', e => {
    if(isDragging){
        isDragging = false;
        slider.style.cursor = 'grab';
        showSlide(currentIndex);
        resumeAutoplay();    
    }
});
container.addEventListener('mousemove', e => { if(!isDragging) return; });

container.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    pauseAutoplay();
});
container.addEventListener('touchend', e => {
    if(!isDragging) return;
    const diff = startX - e.chnagedTouches[0].clientX;
    if(diff > 50) currentIndex++;
    else if (diff < -50) currentIndex--;
    showSlide(currentIndex);
    isDragging = false;
    resumeAutoplay();
});
container.addEventListener('touchmove', e => { if (!isDragging) return; });


startInterval();
