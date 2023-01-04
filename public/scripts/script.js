let gaming = inTutorial = paused = false, onMenu = true;
let level, level_data;
try{
    level = parseInt(location.query.level) || 1;
} catch {
    level = 1;
}
let player, sky, level_text_start = 0;

function setup(){
    let cnv = createCanvas(width,height);
    cnv.parent("container");
    // Check for pug flag
    if(document.querySelector("flag[value=authenticated]") && document.querySelector("info[key=username]")){
        let p = document.createElement("p");
        p.id = "loggedin";
        p.textContent = `Welcome back, ${document.querySelector("info[key=username]").textContent}`;
        document.getElementById("container").append(p);
    } else {
        let a = document.createElement("a");
        a.href = "/login";
        a.id = "login";
        a.textContent = "Login to save your score";
        document.getElementById("container").append(a);
    }
}

function start(){
    player = new Player();
    sky = new Sky();
    initLevel(level=1);
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
    if(onMenu){
        noLoop();
        return showMenu();
    } if(inTutorial)
        return tutorial();
    if(paused){
        return pause();
    }
    background("#87CEEB");
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    
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
        player.won = true;
        pop();
        if(frameCount - level_text_start == 100){
            player.vel.x = 2;
            level_data = {
                "platforms": [
                    new Ground(0, Infinity),
                ],
                "flag": new Flag(Infinity, 0)
            }
        }
        // TODO: transition to end screen (credits/leaderboard/score?)
    } else{
        if(frameCount - level_text_start < 150){
            push();
            textSize(50);
            textAlign(CENTER);
            rectMode(CENTER);
            text(`Level ${level}`, width/2, height/2);
            pop();
        } 
        if (frameCount - level_text_start == 100 && frameCount != 100) {
            initLevel(level);
        }
    }
}

function pause(){
    paused = true;
    showPauseMenu();
    noLoop();
}
function unpause(){
    paused = false;
    loop();
}
function togglePause(){
    paused ? unpause() : pause();
}

function keyPressed(){
    if(keyCode == ESCAPE){
        togglePause();
    }
    if(gaming || inTutorial){
        // In game
        if(keyCode == 32){
            player.jump();
        }
    }
}

function mouseClicked(e){
    if(onMenu){
        if(checkClicked(startButton) || checkClicked(tutorialButton)){
            onMenu = false;
            loop();
        }
    } else if (paused){
        pause_menu_buttons.forEach(button=>checkClicked(button));
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