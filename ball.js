class Ball{
    constructor(){
        this.pos = createVector(width / 2, height);
        this.r = 0;
    }

    show(col){
        fill(col);
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    update(position){
        this.pos = position;
    }

    setRadius(val){
        this.r = val;
    }
}