class WeightedPlatform extends Platform{
    constructor(x,y,w,h,color="#71797E"){
        super(x, y, w, h, color);
        this.activated = false;
    }
    activate(){
        this.activated = true;
    }
    draw(){
        push();
        fill(this.color);
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}