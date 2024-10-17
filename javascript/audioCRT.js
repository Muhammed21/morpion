setTimeout(function () {}, 0);

const musicTracks = [
  "../assets/audio/Terminal_intro.mp3",
  "../assets/audio/TerminalLoop.mp3",
];

let currentTrackIndex = 0;
const audioElement = document.getElementById("bg-musique");
let overlapTime = 0.4;

function playNextTrack() {
  audioElement.src = musicTracks[currentTrackIndex];
  audioElement.play();

  if (currentTrackIndex === 0) {
    audioElement.loop = false;
    audioElement.addEventListener(
      "ended",
      function () {
        currentTrackIndex++;
        playNextTrack();
      },
      { once: true }
    );
  } else if (currentTrackIndex === 1) {
    audioElement.loop = false;

    audioElement.addEventListener(
      "playing",
      function () {
        const duration = audioElement.duration;
        setTimeout(loopWithOverlap, (duration - overlapTime) * 1000);
      },
      { once: true }
    );
  }
}

function loopWithOverlap() {
  const newAudio = new Audio(musicTracks[1]);
  newAudio.play();

  newAudio.addEventListener("playing", function () {
    const duration = newAudio.duration;
    setTimeout(loopWithOverlap, (duration - overlapTime) * 1000);
  });
}

window.onload = function () {
  playNextTrack();
};
