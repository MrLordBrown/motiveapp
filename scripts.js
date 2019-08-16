document.getElementById("audio").addEventListener("ended", next2);
var items = [
    "Boarding.mp3",
    "NightTrain.mp3",
    "JAvenueSubject.mp3",
    "Keiko.mp3",
    "JekyllChorus.mp3",
    "ArrangedForErasure.mp3",
    "CarToCar.mp3",
    "WarningWickedFool.mp3",
    "NextEndLine.mp3",
    "Deboarding.mp3"
];


var current = 0;

var playlistPlayer = document.querySelector("#audio");

document.getElementById("playz").addEventListener("click", playIt2);


function next2() {
    if (current === items.length - 1) {
	current = 0;
    } else {
	current ++
    }
    playlistPlayer.src = items[current];
    playlistPlayer.play();
    document.getElementById("nowPlaying").innerHTML = items[current];
    document.getElementById("nowPlaying").classList.remove("typewriter");
    void document.getElementById("nowPlaying").offsetWidth;
    document.getElementById("nowPlaying").classList.add("typewriter");    
    document.getElementById("playz").innerHTML = "PAUSE";
    document.getElementById("playz").style.visibility = "hidden";
    document.getElementById("pauze").style.visibility = "visible";
    jump();
};

function jump() {
    var jumpTo = items.indexOf(items[current]);
    window.location.href = "#i"+jumpTo;
}


function previous2() {
    if (current === 0) {
	current = items.length-1;
    } else {
	current --;
    }
    playlistPlayer.src = items[current];
    playlistPlayer.play();
    document.getElementById("nowPlaying").innerHTML = items[current];
    document.getElementById("nowPlaying").classList.remove("typewriter");
    void document.getElementById("nowPlaying").offsetWidth;
    document.getElementById("nowPlaying").classList.add("typewriter");
    document.getElementById("playz").innerHTML = "PAUSE";
    document.getElementById("playz").style.visibility = "hidden";
    document.getElementById("pauze").style.visibility = "visible";
       jump();
};


function muteIt2() {
    if(playlistPlayer.muted === true) {
	playlistPlayer.muted = false;
	document.getElementById("mutez").innerHTML = "MUTE";
    } else {
	playlistPlayer.muted = true;
	document.getElementById("mutez").innerHTML = "UNMUTE";
    }
};


function playIt2() {
    playlistPlayer.src = items[current];
    playlistPlayer.play();
    document.getElementById("nowPlaying").innerHTML = items[current];
    document.getElementById("playz").innerHTML = "PAUSE";
    document.getElementById("nowPlaying").classList.remove("typewriter");
    void document.getElementById("nowPlaying").offsetWidth;
    document.getElementById("nowPlaying").classList.add("typewriter"); 
    document.getElementById("playz").style.visibility = "hidden";
    document.getElementById("pauze").style.visibility = "visible";
    jump();
}


function pauseIt2() {
    playlistPlayer.pause();
    document.getElementById("nowPlaying").classList.remove("typewriter");
    void document.getElementById("nowPlaying").offsetWidth;
    document.getElementById("nowPlaying").classList.add("typewriter");
    document.getElementById("nowPlaying").innerHTML = "PAUSED";
    document.getElementById("playz").innerHTML = "PLAY";
    document.getElementById("playz").style.visibility = "visible";
    document.getElementById("pauze").style.visibility = "hidden";
}
