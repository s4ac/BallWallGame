class Obstacle {
    constructor() {
        this.obsW = 50;
        this.pos = createVector(width / 2, -this.obsW);
        this.color = color(0, 255, 0);
        this.opening = 0.5;
        this.ballSize = 0;
        this.offset = 500;
        this.offestFactor = 0;
    }

    show(ballSize) {
        fill(this.col);
        rect(0, this.pos.y, this.pos.x - (ballSize * this.opening), this.obsW);
        rect((this.pos.x + ballSize * this.opening), this.pos.y, width, this.obsW);
    }
    update(ballPos) {
        this.pos.x = ballPos.x;
        this.pos.y += 10;
        let d = p5.Vector.dist(ballPos, this.pos);
        this.opening = map(d, 0, height / 2, 0.5, 0);
        this.offestFactor = map(d, 0, height / 2, -0.2, 1);
    }
    setColor(col) {
        this.col = col;
    }
    outOfCanvas() {
        return this.pos.y + this.obsW > height;
    }
}

