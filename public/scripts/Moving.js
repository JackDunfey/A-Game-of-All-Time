class Moving{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vx = 3;
    }
    update(){
        this.pos.add(-this.vx, 0);
    }
}