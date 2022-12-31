class Player{
    static DIAMETER = 50;
    static RADIUS = Player.DIAMETER / 2;
    static GRAVITY = 0.5;
    constructor(){
        this.pos = createVector(100,100);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0.5);
        this.hp = 100;
    }
    handleLanded(objects){
        if(this.vel.y < 0)
            return;
        for(let i = 0; i < objects.length; i++){
            if(this.pos.x + Player.RADIUS < objects[i].pos.x || this.pos.x - Player.RADIUS > objects[i].pos.x + objects[i].w)
                continue;
            if(this.pos.y - Player.RADIUS > objects[i].pos.y + objects[i].h/2)
                continue;
            if(this.pos.y + Player.RADIUS >= objects[i].pos.y){
                this.vel.set(0,0);
                this.pos.y = objects[i].pos.y - Player.RADIUS;
                this.jumpCount = 0;
            }
        }
    }
    checkDeath(){
        if(player.pos.y - Player.RADIUS >= height + 30){
            gameOver();
        }
    }
    checkVictory(){
        if(player.pos.x >= flag.pos.x && level == 1) // FIXME: remove (for demo)
            nextLevel();
    }
    update(){
        // gravity
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.checkDeath();
        this.checkVictory();
        this.handleLanded(platforms);
        // console.log(this.vel);
        // Other?
    }
    jump(){
        if(this.jumpCount < 2){
            this.vel.set(0,this.jumpCount ? -10 : -12);
            this.jumpCount++;
        }
    }
    draw(){
        push();
        fill("red");
        translate(this.pos.x,this.pos.y);
        circle(0, 0, Player.DIAMETER);
        pop();
    }
}