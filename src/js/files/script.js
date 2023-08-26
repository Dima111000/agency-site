// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const html = document.querySelector('html');
const header = document.querySelector('header.header');

window.addEventListener('load', loadFunc);
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);

function loadFunc () {
    resizeFunc();
    scrollFunc();
}

function resizeFunc () {
    if (window.innerWidth > 767.98) {
        html.classList.contains('menu-open', 'lock') && html.classList.remove('menu-open', 'lock');
    }
}
resizeFunc();

function scrollFunc () {
    getHeaderHeight();

    scrollY >= 1 ? header.classList.add('_header-scroll') : header.classList.remove('_header-scroll')
}

scrollFunc();

function getHeaderHeight() {
    let headerHeight = header.clientHeight;

    html.style.setProperty('--header-height', `${headerHeight}px`);
}

const commentText = document.querySelector('.main-page-comment-block__comment p');

const trimmedText = commentText.textContent.replace('/\s+/g', ' ').trim();

commentText.textContent = trimmedText;