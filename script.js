// Carrusel Principal
let currentIndex = 0;
let interval;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  // Si el índice está fuera del rango, reiniciamos
  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  // Mover el carrusel según el índice
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Función para avanzar al siguiente slide
function nextSlide() {
  showSlide(currentIndex + 1);
}

// Función para retroceder al slide anterior
function prevSlide() {
  showSlide(currentIndex - 1);
}

// Iniciar el carrusel para que pase automáticamente cada 5 segundos
function startCarousel() {
  interval = setInterval(() => {
    nextSlide();
  }, 5000); // 5000ms = 5 segundos
}

// Detener el carrusel automático cuando el usuario interactúa
function stopCarousel() {
  clearInterval(interval);
}

// Iniciar el carrusel automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  startCarousel();

  // Verifica si los botones existen antes de agregar el evento
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      stopCarousel();
      prevSlide();
      startCarousel();
    });
  
    nextBtn.addEventListener('click', () => {
      stopCarousel();
      nextSlide();
      startCarousel();
    });
  }
}); 

// Carrusel Trendy
let currentTrendyIndex = 0;
let trendyInterval;

function showTrendySlide(index) {
  const slides = document.querySelectorAll('.trendy-slide');
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    currentTrendyIndex = 0;
  } else if (index < 0) {
    currentTrendyIndex = totalSlides - 1;
  } else {
    currentTrendyIndex = index;
  }

  document.querySelector('.trendy-carousel-inner').style.transform = `translateX(-${currentTrendyIndex * 100}%)`;
}

// Función para avanzar al siguiente slide del carrusel Trendy
function nextTrendySlide() {
  showTrendySlide(currentTrendyIndex + 1);
}

// Función para retroceder al slide anterior del carrusel Trendy
function prevTrendySlide() {
  showTrendySlide(currentTrendyIndex - 1);
}

// Iniciar el carrusel Trendy para que pase automáticamente cada 5 segundos
function startTrendyCarousel() {
  trendyInterval = setInterval(() => {
    nextTrendySlide();
  }, 5000); // 5000ms = 5 segundos
}

// Detener el carrusel Trendy cuando el usuario interactúa
function stopTrendyCarousel() {
  clearInterval(trendyInterval);
} 

// Iniciar el carrusel Trendy automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  startTrendyCarousel();

  // Verifica si los botones existen antes de agregar el evento
  const prevBtn = document.querySelector('.trendy-carousel .carousel-control.prev');
  const nextBtn = document.querySelector('.trendy-carousel .carousel-control.next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      stopTrendyCarousel();
      prevTrendySlide();
      startTrendyCarousel();
    });
  
    nextBtn.addEventListener('click', () => {
      stopTrendyCarousel();
      nextTrendySlide();
      startTrendyCarousel();
    });
  }
});

