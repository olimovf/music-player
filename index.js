/* ========== Selectors ========== */
const wrapper = document.querySelector('.wrapper');
const cover = document.getElementById('cover');
const title = document.querySelector('.title');
const start = document.getElementById('start');
const end = document.getElementById('end');
const progressContainer = document.querySelector('.progress-container');
const progressEl = document.querySelector('.progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const volume = document.getElementById('volume');


/* ========== Songs ========== */
const songs = [
    'Aleksandr Rybak – Fairytale',
    'Dima Bilan – Believe me',
    'Tones And I – Dance Monkey',
    'Максим – Знаешь ли ты'
];


/* ========== Variables ========== */
let songIndex = 0;


/* ========== Events ========== */
playBtn.addEventListener('click', checkSong);
nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);

audio.addEventListener('timeupdate', progress);
audio.addEventListener('ended', nextMusic);

progressContainer.addEventListener('click', setProgress);

volume.addEventListener('input', changeVolume);

document.addEventListener('keyup', (e) => {
    if(e.key === 'ArrowRight')
        nextMusic();
    if(e.key === 'ArrowLeft')
        prevMusic();
    if(e.key === ' ')
        checkSong();
});

/* ========== Call Functions ========== */
loadSong(songs[songIndex]);


/* ========== Functions ========== */
function checkSong() {
    const isPlaying = wrapper.classList.contains('play');
    
    if(isPlaying)   pauseSong();
    else    playSong();
}

function loadSong(song) {
    title.textContent = song;
    audio.src = `musics/${song}.mp3`;
    cover.src = `album/${song}.jpg`;
}

function playSong() {
    wrapper.classList.add('play');
    title.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    wrapper.classList.remove('play');
    title.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

function nextMusic() {
    songIndex ++;
    if(songIndex > songs.length - 1)
        songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

function prevMusic() {
    songIndex --;
    if(songIndex < 0)
        songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    pauseSong();
    wrapper.classList.add('play');
    title.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function progress(e) {
    let duration = e.srcElement.duration;
    let curTime = e.srcElement.currentTime;

    const persentageWidth = (curTime / duration) * 100;
    progressEl.style.width = `${persentageWidth}%`;

    // end time
    audio.addEventListener('loadeddata', () => {
        let audioDuration = audio.duration;

        let endMinutes = Math.floor(audioDuration / 60);
        let endSeconds = Math.floor(audioDuration % 60);
        end.textContent = `${endMinutes < 10 ? '0'+endMinutes : endMinutes}:${endSeconds < 10 ? '0'+endSeconds : endSeconds}`;
    });

    // start time
    let startMinutes = Math.floor(curTime / 60);
    let startSeconds = Math.floor(curTime % 60);
    start.textContent = `${startMinutes < 10 ? '0'+startMinutes : startMinutes}:${startSeconds < 10 ? '0'+startSeconds : startSeconds}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const widthX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (widthX / width) * duration;
}

function changeVolume() {
    audio.volume = volume.value / volume.max;
    volume.style.background = `linear-gradient(to right, rgb(142, 243, 10) ${volume.value}%, rgb(255,255,255) ${volume.value}%)`;
}