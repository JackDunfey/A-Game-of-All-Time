let tut_player, tut_sky;
let tut_data = {}
function tutorialSetup(){
    inTutorial = true;
    tut_player = new Player();
    tut_sky = new Sky();
    tut_data.platforms = [
        new Ground(0, width * 2),
    ];
    tut_data.flag = new Flag(width*1.5, height-Ground.HEIGHT);
}
function tutorial(){
    noStroke();
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    tut_sky.update();
    tut_sky.draw();
    tut_data.platforms.forEach(p=>p.update());
    tut_data.platforms.forEach(p=>p.draw());
    tut_data.flag.update();
    tut_data.flag.draw();
    tut_player.update(tut_data, ()=>{
        noLoop();
        push();
        fill(0);
        stroke(0);
        textSize(30);
        textAlign(CENTER);
        rectMode(CENTER);
        text("You did it!", width/2, height/2);
        pop();
    });
    tut_player.draw();
}