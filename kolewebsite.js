let vid;
let has_played = false;
let is_playing = false;
let revealSize;

const dripmatrix = [ [ 0, 0, 0, 0, 0 ],
                 [ 0,  0, 0, 0, 0 ],
                 [ 0, 0, 1, 0, 0 ] ,
                 [ 0, 0, 0.5, 0, 0 ],
                 [ 0, 0.05, 0.15, 0.05, 0 ] ]; 

function setup() {
	createCanvas(windowWidth/2, windowHeight/2);
  revealSize = min(width, height)/4;
	// specify multiple formats for different browsers
	vid = createVideo("yougotme_vid.mov");
	vid.hide(); // by default video shows up in separate dom
	// element. hide it and draw it to the canvas
	// instead
  noStroke();
  background(0);
}

function draw() {
	if (is_playing) {
		image(vid, mouseX - revealSize / 2, mouseY - revealSize / 2, revealSize, revealSize, mouseX - revealSize / 2, mouseY - revealSize / 2, revealSize, revealSize); // draw the video frame to canvas
    //translate(mouseX, mouseY);
    //beginShape();
    //// Exterior part of shape, clockwise winding
    //vertex(-width, -height);
    //vertex(width, -height);
    //vertex(width, height);
    //vertex(-width, height);
    //// Interior part of shape, counter-clockwise winding
    //beginContour();
    //vertex(-revealSize, -revealSize);
    //vertex(-revealSize, revealSize);
    //vertex(revealSize, revealSize);
    //vertex(revealSize, -revealSize);
    //endContour();
    //endShape(CLOSE);
	}
	else {
		textAlign(CENTER);
    fill(255, 255, 255);
		text('press anywhere, and keep on pressing', width/2, height/2);
	}
}

function mousePressed() {
	if (is_playing) {
		vid.pause();
	}
	else {
		vid.loop();
	}
	has_played = true;
	is_playing = !is_playing;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  revealSize = min(width, height)/6;
}
