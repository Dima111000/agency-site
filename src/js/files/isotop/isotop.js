import Isotope from 'isotope-layout';

export function next() {
    function imagesInit() {
        const images = document.querySelectorAll('.page__item-image-block');
        if (images.length > 0) {
            images.forEach( function (image) {
                const imageItem = image.querySelector('img');
                const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
                image.style.paddingBottom = padding + '%';
                imageItem.classList.add('init');
            });
        }
    }

    window.addEventListener("load", function () {
        imagesInit();
    })
}