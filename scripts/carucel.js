// Función para inicializar Glide con las configuraciones especificadas
function initializeGlide() {
    const glide = new Glide('.glide', {
        type: 'carousel',
        perView: 3,
        gap: 3,
        autoplay: 3000,
        hoverpause: true,
        rewind: true,
        breakpoints: {
            768: {
                perView: 2
            },
            480: {
                perView: 2
            }
        }
    }).mount();
}

// Cargar imágenes desde el archivo JSON
fetch('imagenes.json')
    .then(response => response.json())
    .then(data => {
        const slidesContainer = document.getElementById('slides-container');
        const bulletsContainer = document.querySelector('.glide__bullets');

        if (data.length === 0) {
            console.error('No hay imágenes para mostrar.');
            return;
        }

        // Crear las diapositivas y los bullets
        data.forEach((item, index) => {
            const slide = document.createElement('li');
            slide.classList.add('glide__slide');
            slide.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
            slidesContainer.appendChild(slide);

            const bullet = document.createElement('button');
            bullet.classList.add('glide__bullet');
            bullet.setAttribute('data-glide-dir', `=${index}`);
            bulletsContainer.appendChild(bullet);
        });

        // Iniciar Glide
        initializeGlide();

        // Actualizar los bullets al cambiar de imagen
        glide.on(['mount.after', 'run.after'], () => {
            const activeIndex = glide.index;
            const bullets = document.querySelectorAll('.glide__bullet');
            bullets.forEach((bullet, index) => {
                bullet.classList.toggle('glide__bullet--active', index === activeIndex);
            });
        });

        // Funcionalidad táctil para los bullets
        bulletsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('glide__bullet')) {
                const index = Array.from(bulletsContainer.children).indexOf(event.target);
                glide.go(`=${index}`);
            }
        });
    })
    .catch(error => console.error('Error loading the JSON data:', error));