let inc = 0.01;
let noiseFactor = 0;
class Obstacle {
    constructor() {
        this.obsW = 50;
        this.pos = createVector(noise(noiseFactor) * width, -this.obsW);
        this.color = color(0, 255, 0);
        this.opening = 0.5;
        this.ballSize = 0;
        this.offset = 500;
        noiseFactor += inc;
    }

    show(ballSize) {
        this.ballSize = ballSize;
        fill(this.col);
        rect(0, this.pos.y, this.pos.x - (this.ballSize * this.opening), this.obsW);
        rect((this.pos.x + this.ballSize * this.opening), this.pos.y, width, this.obsW);
    }
    update(ballPos) {
        this.pos.y += 10;
        let d = abs(ballPos.y - this.pos.y);
        this.opening = map(d, 0, height * 0.75, 0.5, 0);
        this.offestFactor = map(d, 0, height / 2, -0.2, 1);
    }
    setColor(col) {
        this.col = col;
    }
    outOfCanvas() {
        return this.pos.y > height;
    }
    hit(ball) {
        if (ball.pos.y > this.pos.y && ball.pos.y < this.pos.y + this.obsW) {
            return !((this.pos.x - (this.ballSize * this.opening)) < ball.pos.x - (ball.r / 2)
                && (this.pos.x + this.ballSize * this.opening) > ball.pos.x + (ball.r / 2));
        }else return null;
    }
}

