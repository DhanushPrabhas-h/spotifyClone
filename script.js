// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs\x01.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Naa Ready", filePath: "songs\x01.mp3", coverPath: "covers/1.jpg"},
    {songName: "Samayama", filePath: "songs\x02.mp3", coverPath: "covers/2.jpg"},
    {songName: "College Papa", filePath: "songs\x03.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chalore", filePath: "songs\x04.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Dum Masala", filePath: "songs\x05.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Gandara Bhai", filePath: "songs\x06.mp3", coverPath: "covers/6.jpeg"},
    {songName: "Hukum", filePath: "songs\x07.mp3", coverPath: "covers/7.jpg"},
    {songName: "Naa Roja Nuvve", filePath: "songs\x08.mp3", coverPath: "covers/8.jpg"},
    {songName: "Hungry Cheetah", filePath: "songs\x09.mp3", coverPath: "covers/9.jpg"},
    {songName: "BadAss", filePath: "songs\x010.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        e.target.style.color = 'your-desired-color';
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


myProgressBar.addEventListener('mousedown', (e) => {
    const clickPosition = e.clientX - myProgressBar.getBoundingClientRect().left;
    const percentage = (clickPosition / myProgressBar.clientWidth) * 100;
    audioElement.currentTime = (percentage / 100) * audioElement.duration;
});

const volumeControl = document.getElementById('volumeControl');

volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value;
});
