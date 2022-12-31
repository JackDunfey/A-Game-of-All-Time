class Moving{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vx = VELOCITY;
    }
    update(){
        this.pos.add(-this.vx, 0);
    }
}