class FallingPlatform extends Platform{
    constructor(x,y,w,h,activateAtPlayerX=200,color="#71797E"){
        super(x, y, w, h, color);
        this.activateAtPlayerX = activateAtPlayerX;
        this.vy = 2;
    }
    update(){
        super.update();
        if(player.worldX >= this.activateAtPlayerX)
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