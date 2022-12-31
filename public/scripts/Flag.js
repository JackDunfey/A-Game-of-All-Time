class Flag extends Moving{
    constructor(x, y){
        super(x, y);
        // Victory box = 
        // (x,y-150) - (x+60,y-150)
        // |                      |
        // (x,y) - - - - - (x+60,y)
    }
    draw(){
        push();
        fill("#afc0ca");
        translate(this.pos.x, this.pos.y);
        rect(0,0,10,-150);
        let flag_height = 50;
        let flag_width = 70;
        fill("red");
        triangle(10, -150, 10 + flag_width, -150 + flag_height/2, 10, -150 + flag_height);
        pop();
    }
}