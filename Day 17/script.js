
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

// Options for Intersection Observer
const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px" 
};

// Observer for fade-in and slide-in elements
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    } else {
      entry.target.classList.remove("appear"); 
    }
  });
}, appearOptions);


// Observe all fade-in and slide-in elements
[...faders, ...sliders].forEach(el => appearOnScroll.observe(el));
