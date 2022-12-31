let level = 1;
let player, sky, flag, level_text_start = 0;
const platforms = [];
function setup(){
    createCanvas(800,600);
    noStroke();
    player = new Player();
    sky = new Sky();
    platforms.push(new Ground(0, width+200), new Platform(width, height - Ground.HEIGHT - 100, 200, 20), new Platform(width+150, height - Ground.HEIGHT - 250, 200, 20), new Platform(width + 150 + 500, height - Ground.HEIGHT - 200, 200, 20), new Ground(width + 650 + 200 + 75, 10000));
    flag = new Flag(width+1225, height-Ground.HEIGHT);
    window.gameOver = function(){
        noLoop();
        push();
        textSize(50);
        textAlign(CENTER);
        rectMode(CENTER);
        text("Game Over", width/2, height/2);
        pop();
    }
    window.nextLevel = function(){
        ++level;
        level_text_start = frameCount;
    }
}

function draw(){
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS)
    // background("#87CEEB");
    sky.update();
    sky.draw();

    platforms.forEach(p=>p.update());
    platforms.forEach(p=>p.draw());

    flag.update();
    flag.draw();

    player.update();
    player.draw();

    if(frameCount - level_text_start < 150){
        push();
        textSize(50);
        textAlign(CENTER);
        rectMode(CENTER);
        text(`Level ${level}`, width/2, height/2);
        pop();
    }
}

function keyPressed(){
    if(keyCode == 32){
        player.jump();
    }
}