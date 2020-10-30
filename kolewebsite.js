let vid;
let has_played = false;
let is_playing = false;
let revealSize;
let revealVSize;
let analyzer;

const vwidth = 640;
const vheight = 468;

function preload() {
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
  vid = createVideo(["yougotme_vid.mp4", "yougotme_vid.mov"]);
	vid.hide(); // by default video shows up in separate dom
	// element. hide it and draw it to the canvas
	// instead
  analyzer = new p5.Amplitude();
  vid.connect(analyzer);
  noStroke();
  background(0);

}

function draw() {
	if (is_playing) {
    let vol = analyzer.getLevel();
    vol = 0.65 + 0.9*vol;
    let s = revealSize * vol;
    let vs = revealVSize * vol;
    //draw portion of video
		image(vid, mouseX - s / 2, mouseY - s / 2, s, s,
    (mouseX - s / 2)*vwidth / width, (mouseY - s / 2)*vheight/height, vs, vs);
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
