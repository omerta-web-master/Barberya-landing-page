
// Scrolled header
(function scrollHeader() {
    const topHeader = document.querySelector('.top_header')
    const mainHeader = document.querySelector('.main_header')
    const header = document.querySelector('.header')
    const TRIGGER_POINT = 50;
    window.addEventListener('scroll', () => {
        if (pageYOffset > TRIGGER_POINT) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    })

}());


// Menu toggler
(function menuToggler() {
    const toggler = document.querySelector('#menu_toggler');
    const menu = document.querySelector('.main_nav');
    const links = menu.querySelectorAll('a');
    toggler.addEventListener('click', () => {
        menu.classList.toggle('show');
    })

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
        })
    })
}());

// Modal gallery
(function modalGallery() {
    const modalGallery = document.getElementById('modal_gallery');
    const galleryItems = document.querySelectorAll('.gallery_item');
    const modalImg = document.querySelector('#modal_img');
    const nextBtn = document.querySelector('#next_btn');
    const prevBtn = document.querySelector('#prev_btn');
    const imagesSrcArr = Array.from(document.querySelectorAll('.gallery_item img')).map((img) => {
        return img.getAttribute('src')
    })
    let current = 0;

    // Close modal
    const closeModalBtn = document.querySelector('#close_gallery')
    closeModalBtn.addEventListener('click', () => {
        modalGallery.classList.remove('show');
    })

    // Show modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modalGallery.classList.add('show');
            current = index;
            modalImg.setAttribute('src', imagesSrcArr[current])
        })
    })

    // Next img
    nextBtn.addEventListener('click', () => {
        current++;
        if (current > imagesSrcArr.length - 1) {
            current = 0;
        }
        modalImg.setAttribute('src', imagesSrcArr[current])
    })

    prevBtn.addEventListener('click', () => {
        current--;
        if (current < 0) {
            current = imagesSrcArr.length - 1;
        }
        modalImg.setAttribute('src', imagesSrcArr[current])
    })

}());

// Testimonials slider
(function testimonialsSlider() {
    const slidesContainer = document.querySelector('.t_inner');
    const slides = document.querySelectorAll('.t_slide');
    const t_buttons = document.querySelectorAll('.t_button');
    let count = 1;

    let t_interval = setInterval(moveContainer, 3000)

    slidesContainer.addEventListener('transitionend', () => {
        if (count === slides.length) {
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(0)`;
            setTimeout(() => {
                slidesContainer.style.transition = 'all .3s ease';
            }, 50)
            count = 1;
        }
    })

    // Buttons
    t_buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            count = index;
            moveContainer();
            clearInterval(t_interval);
            t_interval = setInterval(moveContainer, 3000);
        })
    })

    function moveContainer() {
        if (count >= t_buttons.length) {
            updateButtonClass(0, t_buttons);
        } else {
            updateButtonClass(count, t_buttons);
        }
        slidesContainer.style.transform = `translateX(-${count * 100}%)`
        count++;
    }
}());

// Global functions
function updateButtonClass(activeIndex, array) {
    array.forEach((button, index) => {
        if (index !== activeIndex) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    })
}