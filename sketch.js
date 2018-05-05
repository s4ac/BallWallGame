let minBallSize = 70;
let maxBallSize = 150;
let ellipseSize = 0;
let colorVal = 0;
// let xpos, ypos, xposp, yposp;
let pos;
let obstacles = [];
const rectW = minBallSize;
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  pos = createVector(width / 2, height / 2)
  // xpos = width / 2;
  // ypos = height / 2;
  colorMode(HSB);
  obstacles.push(new Obstacle());
}

function draw() {
  if (frameCount % 10 == 0) obstacles.push(new Obstacle());
  pos.x += sx * 2; // sx
  pos.y -= sy * 2; // sy
  edges();
  colorVal = map(pos.x, 0, width, 0, 255);
  let angle = map(pos.y, 0, height, 0, PI);
  let verices = floor(abs(cos(angle) * 10)) + 3;
  ellipseSize = abs(cos(angle) * maxBallSize) + minBallSize;
  background(colorVal / 2, 255, 255)
  noStroke();
  fill(colorVal, 155, 200);
  
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obstacle = obstacles[i];
    obstacle.setColor(color(colorVal, 155, 200));
    obstacle.show(ellipseSize);
    obstacle.update(pos);
    if(obstacle.outOfCanvas())obstacles.splice(i, 1);

  }
  fill(255 - colorVal, 50, 200);
  // polygon(verices, pos.x, pos.y, ellipseSize * 0.85);
  ellipse(pos.x, pos.y, ellipseSize * 0.85);

}
function polygon(vert, x, y, r){
  beginShape();
  for(let i = 0; i < vert; i++){
    let angle = map(i, 0, vert, 0, TWO_PI);
    let posX = x + cos(angle) * (r / 2);
    let posY = y + sin(angle) * (r / 2);
    vertex(posX, posY)
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function edges() {
  if (pos.x > width) pos.x = 0;
  if (pos.x < 0) pos.x = width;
  if (pos.y > height) pos.y = 0;
  if (pos.y < 0) pos.y = height;
}

/* PREFS */
const easing = 0.5; // set between 0 - 1

/* VARS */
let rx, ry, rz, sx, sy, sz;
rx = ry = rz = sx = sy = sz = 0;

/* ONDEVICEMOTION */
// https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
window.ondevicemotion = event => {
  /* RAW VALUES */
  rx = event.accelerationIncludingGravity.x;
  ry = event.accelerationIncludingGravity.y;
  rz = event.accelerationIncludingGravity.z;

  /* SMOOTHED VALUES */
  sx = smoothVal(rx, sx);
  sy = smoothVal(ry, sy);
  sz = smoothVal(rz, sz);
};

/* VALUE MAPPING */
function mapVal(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}