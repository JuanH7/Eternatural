const pantalla = document.querySelector("#num");
const btnAdd = document.querySelector("#btnAdd");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const nextChapterBtn = document.querySelector("#next-chapter-btn");
let count = 0;  // Inicia el contador en 0

/* let todosCapitulos = JSON.parse(localStorage.getItem('todosCapitulos'));
localStorage.setItem('todosCapitulos', JSON.stringify(todosCapitulos)); */

console.log(JSON.parse(localStorage.todosCapitulos));

function updateCounter() {
    count++;
    pantalla.textContent = count;  // Actualiza el contenido de la pantalla

    if (count === 2) {
        console.log('Habilitaste el cap 2');
        let cap2 = JSON.parse(localStorage.getItem('todosCapitulos'));
        cap2[1].habilitado = true;
        localStorage.setItem('todosCapitulos', JSON.stringify(cap2)); 
        console.log(cap2);
    }
}

btnAdd.addEventListener("click", updateCounter);

nextBtn.addEventListener("click", function() {
    if (!nextBtn.disabled) {
        changeSlide(1); // Mover al siguiente slide
        updateCounter();
    }
});

nextChapterBtn.addEventListener("click", function() {
    window.location.href = "cap_2.html"; // Redirigir al siguiente capítulo
});

prevBtn.addEventListener("click", function() {
    changeSlide(-1); // Mover al slide anterior
    // Permitir la reproducción nuevamente al retroceder
    if (videos[currentSlide]) {
        videos[currentSlide].button.style.display = 'block';
        videos[currentSlide].watched = false;
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const carouselContainer = document.querySelector('.carousel-container');

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Controlar la visibilidad de los botones
    if (currentSlide === slides.length - 1 && videos[currentSlide].watched) {
        nextBtn.style.display = 'none';
        nextChapterBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        nextChapterBtn.style.display = 'none';
    }

    // Deshabilitar el botón next cuando cambia de slide
    nextBtn.disabled = true;
    nextBtn.classList.remove("enabled");
}

// Control del video para múltiples videos
let videos = [
    { video: document.querySelector("#miVideo1"), button: document.querySelector("#reproducir1"), watched: false },
    { video: document.querySelector("#miVideo2"), button: document.querySelector("#reproducir2"), watched: false },
    { video: document.querySelector("#miVideo3"), button: document.querySelector("#reproducir3"), watched: false },
    { video: document.querySelector("#miVideo4"), button: document.querySelector("#reproducir4"), watched: false },
    { video: document.querySelector("#miVideo5"), button: document.querySelector("#reproducir5"), watched: false },
    { video: document.querySelector("#miVideo6"), button: document.querySelector("#reproducir6"), watched: false }
];

videos.forEach((videoObj, index) => {
    videoObj.button.addEventListener('click', function() {
        videoObj.button.style.display = 'none';
        videoObj.video.play();
    });

    videoObj.video.addEventListener('ended', function() {
        videoObj.watched = true; // Marca el video como visto
        videoObj.button.style.display = 'none'; // Asegura que el botón no vuelva a aparecer
        nextBtn.disabled = false; // Habilita el botón next cuando el video finaliza
        nextBtn.classList.add("enabled"); // Añade estilo iluminado al botón next
        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = 'none';
            nextChapterBtn.style.display = 'block'; // Mostrar el botón de "Siguiente Capítulo"
        }
    });

    videoObj.video.addEventListener('pause', function() {
        if (!videoObj.watched) {
            videoObj.button.style.display = 'block';
        } else {
            nextBtn.disabled = false; // Habilita el botón next si el video ya fue visto
            nextBtn.classList.add("enabled"); // Añade estilo iluminado al botón next
            if (currentSlide === slides.length - 1) {
                nextBtn.style.display = 'none';
                nextChapterBtn.style.display = 'block'; // Mostrar el botón de "Siguiente Capítulo"
            }
        }
    });

    videoObj.video.addEventListener('play', function() {
        videoObj.button.style.display = 'none';
    });

    // Asegura que el botón de reproducción no vuelva a aparecer al hacer clic en el video
    videoObj.video.addEventListener('click', function() {
        videoObj.button.style.display = 'none';
    });
});

// Posición inicial del slide
changeSlide(0);
