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

// Carrito de compras
let cart = [];

function increaseQuantity(button) {
    let label = button.previousElementSibling;
    let quantity = parseInt(label.innerText);
    label.innerText = quantity + 1;
}

function decreaseQuantity(button) {
    let label = button.nextElementSibling;
    let quantity = parseInt(label.innerText);
    if (quantity > 0) {
        label.innerText = quantity - 1;
    }
}

function addToCart(button, productName, price) {
    let quantityLabel = button.previousElementSibling.querySelector(".quantity");
    let quantity = parseInt(quantityLabel.innerText);

    if (quantity > 0) {
        // Obtén la imagen del producto
        let imgSrc = button.closest('.product').querySelector('img').src;

        // Verificar si ya existe en el carrito y actualizar la cantidad si es así.
        let existingProductIndex = cart.findIndex(item => item.name === productName);

        if (existingProductIndex !== -1) { // Si existe en el carrito
            cart[existingProductIndex].quantity += quantity; // Aumentar cantidad existente
        } else { // Si no existe, agregar nuevo producto al carrito
            cart.push({name: productName, price: price, quantity: quantity, imgSrc: imgSrc});
        }

        quantityLabel.innerText = "0"; // Reiniciar cantidad después de añadir
        updateCart();
        // showCart(); // Remove this line to prevent auto-opening
    } else {
        alert("Por favor, selecciona al menos un producto antes de añadirlo al carrito.");
    }
}

function updateCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    cart.forEach((item, index) => {

        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-product">
                <img src="${item.imgSrc}" class="cart-img">
                <div class="cart-details">
                    <p>${item.name}</p>
                    <span>${item.quantity} × <span class="price">$${item.price.toFixed(2)}</span></span>
                </div>
                <div class="cart-controls">
                    <button onclick="decreaseCartQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseCartQuantity(${index})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${index})">×</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`; // Update cart total in header
}

function increaseCartQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseCartQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
        return;
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    document.getElementById("cart-container").style.display = "block";
}

function toggleCart() {
    let cartContainer = document.getElementById("cart-container");

    // Cambia entre mostrar y ocultar el carrito.
    cartContainer.style.display =
        (cartContainer.style.display === "none" || cartContainer.style.display === "") ? "block" : "none";
}

// Brand selection functionality
let selectedBrand = null;

function selectBrand(button, brandName) {
    // Remove 'selected' class from the previously selected button
    if (selectedBrand) {
        selectedBrand.classList.remove('selected');
    }

    // Add 'selected' class to the clicked button
    button.classList.add('selected');

    // Update the selected brand
    selectedBrand = button;

    // You can add additional logic here to filter products by brand if needed
    console.log(`Selected brand: ${brandName}`);
}


// Obtener el nombre de la marca desde la URL
const params = new URLSearchParams(window.location.search);
const nombreMarca = params.get('nombre');

// Mostrar el nombre de la marca en el título
if (nombreMarca) {
    document.getElementById('titulo-marca').innerText = nombreMarca;
}

    // Función para mostrar/ocultar el modal de inicio de sesión
    function toggleLogin() {
        const modal = document.getElementById("login-modal");
        const overlay = document.getElementById("modal-overlay");
        if (modal.style.display === "block") {
            modal.style.display = "none";
            overlay.style.display = "none";
        } else {
            modal.style.display = "block";
            overlay.style.display = "block";
        }
    }
    // Función para mostrar/ocultar el modal de inicio de sesión
    function toggleLogin() {
      const modal = document.getElementById("login-modal");
      const overlay = document.getElementById("modal-overlay");
      if (modal.style.display === "block") {
          modal.style.display = "none";
          overlay.style.display = "none";
      } else {
          modal.style.display = "block";
          overlay.style.display = "block";
      }
  }

  // Función para mostrar/ocultar el carrito de compras
  function toggleCart() {
      const cart = document.getElementById("cart-container");
      cart.style.display = cart.style.display === "none" ? "block" : "none";
  }

