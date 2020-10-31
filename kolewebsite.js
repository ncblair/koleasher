let vid;
//let sound;
let has_played = false;
let is_playing = false;
let revealSize;
let revealVSize;
//let analyzer;

const vwidth = 640;
const vheight = 468;

var coordX = 0;
var coordY = 0;
 
window.onmousemove = coordHandler;
window.ontouchstart = coordHandler;
window.ontouchmove = coordHandler;

function preload() {
  vid = createVideo("yougotme_vid.mov");
  //sound = createAudio('yougotme_vid.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  revealSize = min(width, height)/2;
  if (revealSize == width / 2) {
    revealVSize = revealSize * vwidth / width;
  }
  else {
    revealVSize = revealSize * vheight / height;
  }

	vid.hide(); // by default video shows up in separate dom

	// element. hide it and draw it to the canvas
	// instead
  analyzer = new p5.Amplitude();
  //vid.connect(analyzer);
  noStroke();
  background(0);
}

function draw() {
	if (is_playing) {
    vol = 0.85;
    let s = revealSize * vol;
    let vs = revealVSize * vol;
    //draw portion of video
		image(vid, coordX - s / 2, coordY - s / 2, s, s,
    (coordX - s / 2)*vwidth / width, (coordY - s / 2)*vheight/height, vs, vs);
  }
	if (!has_played) {
		textAlign(CENTER);
    fill(255, 255, 255);
		text('press anywhere to play/pause', width/2, height/2);
	}
}

function mousePressed() {
	if (is_playing) {
		vid.pause();
    cursor();
	}
	else {
		vid.loop();
    noCursor();
	}
	has_played = true;
	is_playing = !is_playing;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  revealSize = min(width, height)/2;
  if (revealSize == width / 2) {
    revealVSize = revealSize * vwidth / width;
  }
  else {
    revealVSize = revealSize * vheight / height;
  }
}


 
function coordHandler(event) {
    switch (event.type) {
        case 'mousemove':
            coordX = event.clientX;
            coordY = event.clientY;
            break;
        case 'touchstart':
        case 'touchmove':
            var firstTouch = event.touches[0];
            coordX = firstTouch.clientX;
            coordY = firstTouch.clientY;
            break;
    }
}
