class Platform extends Moving{
    constructor(x,y,w,h,color="#71797E"){
        super(x, y);
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw(){
        push();
        fill(this.color);
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}