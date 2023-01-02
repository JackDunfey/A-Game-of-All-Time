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
        if(this.w == Infinity){
            rect(0, this.pos.y, width, this.h);
        } else {
            rect(this.pos.x, this.pos.y, this.w, this.h);
        }
        pop();
    }
}