console.log("welcome to spotify");

//Initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
// let songItemPlay = document.getElementsByClassName("songItemPlay");

let songs = [
    {
        songName: "divine azadi",
        filePath: "songs/1.mp3",
        coverPath: "covers/1download.jpg",
    },
    {
        songName: "3.59 AM",
        filePath: "songs/2.mp3",
        coverPath: "covers/2download.jpg",
    },
    {
        songName: "mere gully main",
        filePath: "songs/3.mp3",
        coverPath: "covers/3download.jpg",
    },
    {
        songName: "level up",
        filePath: "songs/4.mp3",
        coverPath: "covers/4download.jpg",
    },
    {
        songName: "mirchi",
        filePath: "songs/5.mp3",
        coverPath: "covers/5download.jpg",
    },
    {
        songName: "paintra",
        filePath: "songs/6.mp3",
        coverPath: "covers/6download.jpg",
    },
    {
        songName: "satya",
        filePath: "songs/7.mp3",
        coverPath: "covers/7download.jpg",
    },
    {
        songName: "teesari manzil",
        filePath: "songs/8.mp3",
        coverPath: "covers/8download.jpg",
    },
];

songItem.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

//Handel play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

//Listen to event
audioElement.addEventListener("timeupdate", () => {
    // console.log("timeupdate");
    //update seekbar
    //calculating the progress on seekbar in percentage formula
    progress = parseInt(
        (audioElement.currentTime / audioElement.duration) * 100
    );
    // console.log(progress);
    myProgressBar.value = progress;
});

//when we change the seek bar on particular position we want to listen that seek part song
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
        (element) => {
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
        }
    );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
        element.addEventListener("click", (e) => {
            // console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        });
    }
);

document.getElementById("next").addEventListener("click", () => {
    if (songIndex > 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
