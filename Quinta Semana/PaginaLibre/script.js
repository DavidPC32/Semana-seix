// Inicializar AOS (Animacion Scroll)
AOS.init({
    duration: 1000,       // Duración de la animación
    once: true,           // Animación solo una vez
    easing: 'ease-in-out' // Tipo de animación
});

// Efecto de escritura automática en el hero
const heroTitle = document.querySelector('header h1');
const text = "Explora el Mundo";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// Efecto de scroll suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación al enviar el formulario
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        alert('¡Mensaje enviado!');
        this.reset();
        this.classList.remove('animate__animated', 'animate__bounce');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar todos los botones de categoría
    const botonesCategoria = document.querySelectorAll('.categoria-btn');
    const carrusel = document.getElementById('carouselOfertas');
    const items = document.querySelectorAll('.carousel-item');
    
    // 2. Añadir evento click a cada botón
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.getAttribute('data-categoria');
            
            // 3. Filtrar ofertas
            items.forEach(item => {
                const itemCategoria = item.getAttribute('data-categoria');
                
                if (categoria === 'todas' || itemCategoria === categoria) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // 4. Mostrar la primera oferta disponible
            const carousel = new bootstrap.Carousel(carrusel);
            const firstVisible = document.querySelector('.carousel-item[style="display: block;"]');
            
            if (firstVisible) {
                const index = [...items].indexOf(firstVisible);
                carousel.to(index);
            }
            
            // 5. Scroll a la sección de ofertas
            document.getElementById('ofertas').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});