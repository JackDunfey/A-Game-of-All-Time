class Player{
    static DIAMETER = 50;
    static RADIUS = Player.DIAMETER / 2;
    static GRAVITY = 0.5;
    constructor(){
        this.pos = createVector(this.worldX = 100,100);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0.5);
        this.deaths = this.jumps = 0;
        this.won = false;
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
                this.vel.set(this.vel.x,0);
                this.pos.y = objects[i].pos.y - Player.RADIUS;
                this.jumpCount = 0;
                objects[i]?.activate?.()
            }
        }
    }
    checkDeath(){
        if(this.pos.y - Player.RADIUS >= height + 30){
            // Player died
            ++this.deaths;
            // Move outside of player
            initLevel(level); 
            this.pos.set(100, 300);
        }
    }
    checkVictory(flag, callback){
        if(!flag.completed && this.pos.x >= flag.pos.x){
            flag.completed = true;
            callback();
        }
    }
    update(level_data, victoryCallback=null){
        if(victoryCallback == null){
            if(nextLevel)
                victoryCallback = nextLevel
            else 
                throw new Error("?");
        }
        // gravity
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.worldX += VELOCITY;
        this.checkDeath();
        this.checkVictory(level_data.flag, victoryCallback);
        this.handleLanded(level_data.platforms);
        // Other?
    }
    jump(){
        if(this.jumpCount < 2){
            this.vel.set(this.vel.x, this.jumpCount ? -10 : -12);
            ++this.jumpCount;
            if(!this.won)
                ++this.jumps;
        }
    }
    draw(){
        push();
        fill("red");
        translate(this.pos.x, this.pos.y);
        circle(0, 0, Player.DIAMETER);
        pop();
    }
}