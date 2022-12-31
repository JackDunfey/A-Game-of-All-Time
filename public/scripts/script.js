let level = 1;
let player, sky, flag, level_text_start = 0;
let platforms = [];
function setup(){
    createCanvas(width,height);
    player = new Player();
    sky = new Sky();
    platforms = level1_data.platforms.map(platform=>{
        if(platform.type == "G")
            return new Ground(platform.start, platform.end)
        else if(platform.type == "P")
            return new Platform(platform.x, platform.y, platform.w, platform.h);
    });
    flag = new Flag(...level1_data.flag);
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
    noStroke();
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

    if(level > MAX_LEVEL){
        push();
        textSize(50);
        textAlign(CENTER);
        rectMode(CENTER);
        text(`You Won!`, width/2, height/2);
        pop();
        window.setTimeout(noLoop, 300);
    } else if(frameCount - level_text_start < 150){
        push();
        textSize(50);
        textAlign(CENTER);
        rectMode(CENTER);
        text(`Level ${level}`, width/2, height/2);
        pop();
    } else if (frameCount - level_text_start == 150 && frameCount != 150) {
        let level_data = eval?.(`level${level}_data`);
        platforms = level_data.platforms.map(platform=>{
            if(platform.type == "G")
                return new Ground(platform.start, platform.end)
            else if(platform.type == "P")
                return new Platform(platform.x, platform.y, platform.w, platform.h);
        });
        flag = new Flag(...level_data.flag);
    }
}

function keyPressed(){
    if(keyCode == 32){
        player.jump();
    }
}