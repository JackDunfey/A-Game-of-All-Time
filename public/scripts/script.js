let gaming = inTutorial = false, onMenu = true;
let level, level_data;
try{
    level = parseInt(location.query.level) || 1;
} catch {
    level = 1;
}
let player, sky, level_text_start = 0;

function setup(){
    createCanvas(width,height);
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    showMenu();
}

function start(){
    createCanvas(width,height);
    player = new Player();
    sky = new Sky();
    initLevel(level);
    // window.gameOver = function(){
    //     noLoop();
    //     push();
    //     textSize(50);
    //     textAlign(CENTER);
    //     rectMode(CENTER);
    //     text("Game Over", width/2, height/2);
    //     pop();
    // }
    window.nextLevel = function(){
        ++level;
        level_text_start = frameCount;
    }
    noStroke();
    gaming = true;
}

function draw(){
    if(inTutorial)
        return tutorial();
    if(!gaming)
        return;
    
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    // background("#87CEEB");
    sky.update();
    sky.draw();

    level_data.platforms.forEach(p=>p.update());
    level_data.platforms.forEach(p=>p.draw());

    level_data.flag.update();
    level_data.flag.draw();

    player.update(level_data);
    player.draw();

    updateScoreDisplay();

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
        initLevel(level);
    }
}

function keyPressed(){
    if(!gaming && !inTutorial)
        return;
    if(keyCode == 32){
        (gaming ? player : tut_player).jump();
    }
}

function mouseClicked(e){
    if(onMenu){
        if(checkClicked(startButton) + checkClicked(tutorialButton))
            onMenu = false;
    }
}

function initLevel(levelNumber=level){
    level_data = Object.assign({},eval?.(`level${levelNumber}_data`));
    platforms = level_data.platforms = level_data.platforms.map(platform=>{
        if(platform.type == "G")
            return new Ground(platform.start, platform.end)
        else if(platform.type == "P")
            return new Platform(platform.x, platform.y, platform.w, platform.h);
        else if(platform.type == "FP")
            return new FallingPlatform(platform.x, platform.y, platform.w, platform.h, platform?.activateAtPlayerX || 0);
        else if(platform.type == "FWP")
            return new FallingWeightedPlatform(platform.x, platform.y, platform.w, platform.h);
    });
    flag = level_data.flag = new Flag(...level_data.flag);
}

function updateScoreDisplay(){
    push();
    textSize(16);
    stroke(0);
    strokeWeight(1);
    fill(0);
    rectMode(CORNER);
    textAlign(LEFT);
    text("Jumps: " + player.jumps, 0, 0, 100, 100);
    text("Deaths: " + player.deaths, 0, 20, 100, 100);
    pop();
}