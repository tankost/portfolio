import i18Obj from './translate.js';

const burgerItem = document.querySelector('.header-burger');
const menu = document.querySelector('.header-nav');
const linkCloseItem = document.querySelectorAll('.header-nav-link');
const menuCloseItem = document.querySelector('.header-nav-close');

burgerItem.addEventListener('click', () => {
    menu.classList.add('header-nav-active');
});

menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('header-nav-active');
});

linkCloseItem.forEach((el) => el.addEventListener('click', () => {
        menu.classList.remove('header-nav-active');
    })
);


const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioButtons = document.querySelector('.portfolio-buttons');
const portfolioButton = document.querySelectorAll('.portfolio-button');

function changeImage(event) {
    const season = event.target.dataset.season;
    if (event.target.classList.contains('portfolio-button')) {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }
}

portfolioButtons.addEventListener('click', changeImage);


function changeClassActive(event) {
    if (event.target.classList.contains('portfolio-button')) {
        portfolioButton.forEach((elem) => elem.classList.remove('active'));
        event.target.classList.add('active');
    }
}

portfolioButtons.addEventListener('click', changeClassActive);


const english = document.querySelector('.en');
const russian = document.querySelector('.ru');

function getTranslate(lang) {
    const langArr = document.querySelectorAll('[data-i18]');
    langArr.forEach((elem) => elem.textContent = i18Obj[lang][elem.dataset.i18]);
}

english.addEventListener('click', () => getTranslate('en'));
russian.addEventListener('click', () => getTranslate('ru'));


const languages = document.querySelector('.lang');
const language = document.querySelectorAll('.language');

function changeLangActive(event) {
    if (event.target.classList.contains('language')) {
        language.forEach((elem) => elem.classList.remove('active'));
        event.target.classList.add('active');
    }
}

languages.addEventListener('click', changeLangActive);


const themeButton = document.querySelector('.themeButton');
const lightSections = ['.wrapper', '.skills', '.portfolio', '.video', '.section-price'];

themeButton.addEventListener('click', () => {
    lightSections.forEach((elem) => document.querySelector(elem).classList.toggle('light-theme'));
});

const player = document.querySelector('.video-player');
const video = player.querySelector('.video');
const bigPlayBtn = player.querySelector('.video-player-button');
const playBtn = player.querySelector('.play-button');
const playBtnImg = player.querySelector('.play-btn-img');
const stopBtn = player.querySelector('.stop-button')
const progress = player.querySelector('.progress');
const volume = player.querySelector('.volume');
const currentTimeElement = player.querySelector('.current');
const durationTimeElement = player.querySelector('.duration');
const volumeBtn = player.querySelector('.volume-button');
const volumeBtnImg = player.querySelector('.volume-btn-img');


function togglePlay() {
    if (video.paused) {
        video.play();
        bigPlayBtn.classList.add('played');
        playBtnImg.src = "assets/svg/pause.svg";
    } else {
        video.pause();
        bigPlayBtn.classList.remove('played');
        playBtnImg.src = "assets/svg/play.svg";
    }
}

video.addEventListener('click', togglePlay);
bigPlayBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);


function stopVideo() {
    video.currentTime = 0;
    video.pause();
    playBtnImg.src = "assets/svg/play.svg";
    bigPlayBtn.classList.remove('played');
}

stopBtn.addEventListener('click', stopVideo);


function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    progress.style.background = `linear-gradient(to right, #000 0%, #000 ${progress.value}%, #fff ${progress.value}%, white 100%)`;

    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    let durationMinutes = Math.floor(video.duration / 60);
    if (durationMinutes < 10) {
        durationMinutes = '0' + durationMinutes;
    }
    let durationSeconds = Math.floor(video.duration % 60);

    currentTimeElement.innerHTML = `${minutes}:${seconds}`;
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
}

video.addEventListener('timeupdate', updateProgress);


function setProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}

progress.addEventListener('change', setProgress);


function setVolume() {
    video.volume = volume.value / 100;
    video.currentVolume = video.volume;
    volume.style.background = `linear-gradient(to right, #000 0%, #000 ${volume.value}%, #fff ${volume.value}%, white 100%)`
    curVolume = video.volume;
    if (video.currentVolume === 0) {
        volumeBtnImg.src = "assets/svg/mute.svg";
        video.muted = true;
    } else {
        volumeBtnImg.src = "assets/svg/volume.svg";
        video.muted = false;
    }
}

volume.addEventListener('change', setVolume);


let curVolume;

function videoMute() {
    if (video.muted) {
        volume.value = curVolume;
        video.muted = false;
        volumeBtnImg.src = "assets/svg/volume.svg";
        volume.style.background = `linear-gradient(to right, #000 0%, #000 ${volume.value}%, #fff ${volume.value}%, white 100%)`;
    } else {
        curVolume = volume.value;
        video.muted = true;
        volumeBtnImg.src = "assets/svg/mute.svg";
        volume.value = 0;

        volume.style.background = `linear-gradient(to right,#fff 0%, white 100%)`;
    }
}

volumeBtn.addEventListener('click', videoMute);

