class FallingWeightedPlatform extends WeightedPlatform{
    constructor(x,y,w,h,color="#71797E"){
        super(x, y, w, h, color);
        this.vy = 2;
    }
    update(){
        super.update();
        if(this.activated)
            this.pos.add(0, this.vy);
    }
    draw(){
        push();
        fill(this.color);
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}