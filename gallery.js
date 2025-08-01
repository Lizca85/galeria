const images = [
    {
        src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Hermoso paisaje montañoso con picos nevados',
        title: 'Vista de Montaña'
    },
    {
        src: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Lago sereno reflejando montañas al amanecer',
        title: 'Reflejo del Lago'
    },
    {
        src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Bosque denso con árboles altos y luz solar filtrada',
        title: 'Sendero del Bosque'
    },
    {
        src: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Olas del océano rompiendo en la costa rocosa',
        title: 'Olas del Océano'
    },
    {
        src: 'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Campo de trigo dorado bajo cielo azul con nubes',
        title: 'Campo de Trigo'
    },
    {
        src: 'https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Paisaje desértico con dunas de arena al atardecer',
        title: 'Atardecer en el Desierto'
    }
];

let currentLightboxIndex = 0;

// Función para actualizar la imagen principal
function upDate(previewPic) {
    console.log('upDate function called with:', previewPic.alt);
    
    const imageDiv = document.getElementById('image');
    const imageText = document.getElementById('imageText');
    
    // Cambiar el fondo de la imagen
    imageDiv.style.backgroundImage = `url('${previewPic.src.replace('w=400', 'w=1200')}')`;
    
    // Actualizar el texto
    imageText.textContent = previewPic.alt;
}

// Función para restaurar el estado original
function unDo() {
    console.log('unDo function called');
    
    const imageDiv = document.getElementById('image');
    const imageText = document.getElementById('imageText');
    
    // Restaurar el fondo original
    imageDiv.style.backgroundImage = 'none';
    
    // Restaurar el texto original
    imageText.textContent = 'Pasa el ratón sobre una imagen para mostrarla aquí.';
}

// Función para abrir el lightbox
function openLightbox(index) {
    console.log('Opening lightbox for image index:', index);
    
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxAlt = document.getElementById('lightbox-alt');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Configurar la imagen del lightbox
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightboxTitle.textContent = images[index].title;
    lightboxAlt.textContent = images[index].alt;
    lightboxCounter.textContent = `${index + 1} de ${images.length}`;
    
    // Mostrar el lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar el lightbox
function closeLightbox() {
    console.log('Closing lightbox');
    
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Función para navegar en el lightbox
function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    // Manejar los límites del array
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = images.length - 1;
    } else if (currentLightboxIndex >= images.length) {
        currentLightboxIndex = 0;
    }
    
    // Actualizar el lightbox con la nueva imagen
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxAlt = document.getElementById('lightbox-alt');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    lightboxImg.src = images[currentLightboxIndex].src;
    lightboxImg.alt = images[currentLightboxIndex].alt;
    lightboxTitle.textContent = images[currentLightboxIndex].title;
    lightboxAlt.textContent = images[currentLightboxIndex].alt;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} de ${images.length}`;
}

// Función para añadir tabindex usando bucle for
function addTabIndex() {
    console.log('Component loaded - adding tabindex attributes with for loop');
    
    const previewImages = document.querySelectorAll('.preview');
    
    // Usando bucle for tradicional para añadir tabindex a todas las imágenes
    for (let i = 0; i < previewImages.length; i++) {
        const img = previewImages[i];
        img.setAttribute('tabindex', '0');
        console.log(`Added tabindex to image ${i + 1} using for loop`);
        
        // Añadir event listeners para teclado
        img.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(i);
            }
        });
    }
}

// Event listener para cuando se carga la página
window.addEventListener('load', function() {
    console.log('Page loaded - calling addTabIndex function');
    addTabIndex();
});

// Event listeners para navegación con teclado en el lightbox
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox.style.display === 'block') {
        switch(event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }
});

// Prevenir que el lightbox se cierre al hacer clic en la imagen
document.querySelector('.lightbox-content').addEventListener('click', function(event) {
    event.stopPropagation();
});