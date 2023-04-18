
let songs = [
    {
        title: 'Alone Pt. 2',
        artist: 'Alan Walker',
        img: 'img/alone pt.2.jpg',
        music: 'music/Alone Pt.2.mp3',
        docTitle: 'Alone Pt. 2 | Alan Walker'
    },
    {
        title: 'Falling Down',
        artist: 'Wild Cards',
        img: 'img/fallingdown.jpg',
        music: 'music/Falling Down.mp3',
        docTitle: 'Falling Down | Wild Cards'
    },
    {
        title: 'On My Way',
        artist: 'Alan Walker',
        img: 'img/on my way.jpg',
        music: 'music/ON MY WAY.mp3',
        docTitle: 'On My Way| Alan Walker'
    },
    {
        title: 'The Spectre',
        artist: 'Alan Walker',
        img: 'img/the spectre.jpg',
        music: 'music/The Spectre.mp3',
        docTitle: 'The Spectre | Alan Walker'
    },
]


let play = document.getElementById('play');
let music = document.querySelector('audio');
let image = document.querySelector('img');


let vol = document.getElementById('volume');
let time = document.getElementById('seekRange');


let title = document.getElementById('title');
let artist = document.getElementById('artist');

//music control buttons
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let shuffleBtn = document.getElementById('shuffle');
let repeatBtn = document.getElementById('repeat');


// current Song Index
let songIndex = 0;
let isPlayin = false;


let playMsuic = () => {
    isPlayin = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    image.classList.add('animation');
}

let pauseMusic = () => {
    isPlayin = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    image.classList.remove('animation');
}

play.addEventListener('click', () => {
    isPlayin ? pauseMusic() : playMsuic();
})

//set Volume of music
let setVolume = () => {
    music.volume = vol.value;
}

let setDuration = () => {
    music.currentTime = music.duration * (time.value / 100);
}

//update time at which music is playing
let updateTimer;
let currentSong;

let startSong = (index) => {
    setTimeout(updateTimer);
    reset();
    currentSong = songs[index];
    title.innerHTML = currentSong.title;
    artist.innerHTML = currentSong.artist;
    image.src = currentSong.img;
    music.src = currentSong.music;
    music.volume = vol.value;
    time.value = 0;
    document.title = currentSong.docTitle;
    updateTimer = setInterval(setUpdate, 1000);
    music.addEventListener('ended', playNext);
    random_bg_color();
}


let shufflePlay = () => {
    songIndex = Math.floor(Math.random() * 3);
    console.log(songIndex)
    startSong(songIndex);
    playMsuic();
}
shuffleBtn.addEventListener('click', () => {
    shufflePlay();
})

let repeatPlay = () => {
    const repeat = songIndex;
    startSong(repeat);
    playMsuic();
}
repeatBtn.addEventListener('click', repeatPlay);

let reset = () => {
    current_Time.innerHTML = '00:00'
    music.classList.remove('animation');
    pauseMusic();
}

let playNext = () => {
    songIndex = (songIndex + 1) % songs.length;
    startSong(songIndex);
    playMsuic();
}

let playPrev = () => {
    songIndex < 0 ? songIndex = songs.length - 1 : songIndex = (songIndex - 1) % songs.length;
    startSong(songIndex);
    playMsuic();
}

next.addEventListener('click', playNext)
prev.addEventListener('click', playPrev)


let current_Time = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration')

//update the time of music at which you want to play it
let setUpdate = () => {
    let seekPosition = 0;
    if (!isNaN(music.duration)) {
        seekPosition = music.currentTime * (100 / music.duration);
        time.value = seekPosition;

        let currentMinutes = pad(Math.floor(music.currentTime / 60));
        let currentSeconds = pad(Math.floor(music.currentTime - currentMinutes * 60));
        let durationMinutes = pad(Math.floor(music.duration / 60));
        let durationSeconds = pad(Math.floor(music.duration - durationMinutes * 60));

        current_Time.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
//to make 2 zeros in number
let pad = (unit) => {
    return ('0' + unit).length > 2 ? unit : '0' + unit;
}

//for random color in background
let random_bg_color = () => {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
startSong(0);