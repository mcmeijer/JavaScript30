// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
// for this one, either play or pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause' ;
  video[method]();
}
// to change the button, we'll listen to the video
function updateButton() {
  // we can use this because it's bound to the video itself
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
// skip buttons now(take the date skip and nb of secs)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}
// progress bar to be updated in real time
// should update the video with that place
// calculate in percentage so it corresponds with the flex-basis
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
// scrub bar, make it clickable
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
}

// TO BE FINISHED
// space bar to play and pause (to be finished)
// function spaceBar(event) {
//   const method = video.paused ? 'play' : 'pause' ;
//   video[method]();
//   const key = event.which || event.keyCode;
//   if (key === 32) {
//     event.preventDefault();
//     video.paused ? video.play() : video.pause();
//   }
// }
//
// function spaceBarPlay(e) {
//   if ((e || window.event).keyCode === 32) {
//     video.paused ? video.play() : video.pause();
//   }
// }
//
// const spaceBar = (event) => {
//   if (event.keyCode === 32) {
//     // togglePlay();
//     console.log('ca marche ou bien');
//   }
// };

// TO BE FINISHED
// make the video go full screen (to be continued)



// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
// COMPLETE HERE
//  add a player with space bar (to be finished)
// video.addEventListener('keyup', spaceBar);
// toggle.addEventListener('keyup', spaceBar);

// AND COMPLETE THIS
// add full screen possibily (to be finished)

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false; //when so mouses down we'll set it to true
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousedown', () => mousedown = false);
