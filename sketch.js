let minBallSize = 70;
let maxBallSize = 150;
let ellipseSize = 0;
let colorVal = 0;
let score = 0;
let alpha = 1;
let hitCount = 0;
// let xpos, ypos, xposp, yposp;
let pos;
let obstacles = [];
let ball;
const rectW = minBallSize;
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  pos = createVector(width / 2, height / 2)
  colorMode(HSB);
  ball = new Ball();
  obstacles.push(new Obstacle());
}

function draw() {
  if (frameCount % 30 == 0) obstacles.push(new Obstacle());
  // pos.x += sx * 2; // sx
  // pos.y -= sy * 2; // sy
  pos.x = mouseX;
  pos.y = mouseY;
  edges();
  colorVal = map(pos.x, 0, width, 0, 255);
  let angle = map(pos.y, 0, height, 0, PI);
  let verices = floor(abs(cos(angle) * 10)) + 3;
  ellipseSize = abs(cos(angle) * maxBallSize) + minBallSize;
  background(colorVal / 2, 255, 255, alpha);
  fill(0);
  textSize(32);
  textAlign(CENTER)
  text(score, width / 2, height / 2);

  ball.setRadius(ellipseSize * 0.75);
  ball.update(pos);
  ball.show(color(255 - colorVal, 50, 200));

  noStroke();
  // fill(colorVal, 155, 200);

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obstacle = obstacles[i];
    obstacle.setColor(color(colorVal, 155, 200));
    obstacle.show(ellipseSize);
    obstacle.update(pos);
    if (obstacle.hit(ball)) {
      console.log(alpha);
      textSize(300);
      text('HIT', width / 2, height / 2);
      alpha -= 0.01;
      if (alpha < 0.07) {
        alpha = 0.07;
      }
    }
    if (obstacle.outOfCanvas()) {
      obstacles.splice(i, 1);
      score++;
      if (score % 25 == 0 && score > 1) {
        inc += 0.01;
      }
    }
  }
  // fill();
  // // polygon(verices, pos.x, pos.y, ellipseSize * 0.85);
  // ellipse(pos.x, pos.y, ellipseSize * 0.85);

}
function polygon(vert, x, y, r) {
  beginShape();
  for (let i = 0; i < vert; i++) {
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