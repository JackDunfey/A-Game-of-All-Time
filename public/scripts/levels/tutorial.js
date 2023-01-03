let tut_data = {}, tut_step = 1;
let tut_itr;
let tut_4_wp, tut_6_fwp;
let tut_completed = false;
function tutorialSetup(){
    inTutorial = true;
    player = new Player();
    tut_data.platforms = [
        new Ground(0, Infinity),
    ];
    tut_data.flag = new Flag(Infinity, height-Ground.HEIGHT);
    document.body.addEventListener("keypress", function(e){
        if(tut_step == 1 && e.key == " ")
            tut_step = 2;
    });
    tut_4_wp = new WeightedPlatform(width, height - Ground.HEIGHT - 100, 200, 20);
    tut_6_fwp = new FallingWeightedPlatform(width, height - Ground.HEIGHT - 200, 200, 20);
}
function *timeout_maker(next_step, timer=1000){
    console.log(`Timeout created for step: ${next_step}`);
    window.setTimeout(function(){
        tut_step = next_step
    }, timer);
    yield 1;
}
let tut_2_timer = timeout_maker(3), tut_5_timer = timeout_maker(6);
let tut_generator_3 = (function *(){
    window.setTimeout(function(){
        tut_itr = window.setInterval(function(){
            if(player.jumpCount == 2)
                tut_step = 4;
        }, 100);
    }, 300);
})();
let tut_generator_4 = (function *(){
    clearInterval(tut_itr);
    tut_data.platforms = [
        new Ground(0, Infinity),
        tut_4_wp,
    ];
    yield 1;
})();
let tut_generator_6 = (function *(){
    tut_data.platforms = [
        new Ground(0, Infinity),
        tut_6_fwp,
    ];
    yield 1;
})();
let tut_generator_7 = (function *(){
    tut_data.platforms = [new Ground(0, Infinity)]
    tut_data.flag.pos.x = width;
})();
function tutorial(){
    noStroke();
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    tut_sky.update();
    tut_sky.draw();
    tut_data.platforms.forEach(p=>p.update());
    tut_data.platforms.forEach(p=>p.draw());
    tut_data.flag.update();
    tut_data.flag.draw();
    push();
    fill(0);
    stroke(0);
    textSize(20);
    textAlign(CENTER);
    switch(tut_step){
        case 1:
            text("Press \"SPACE\" to jump", 200, 100);
            break;
        case 2:
            text("Good job!", 200, 100);
            tut_2_timer.next();
            break;
        case 3:
            text("Now try a double jump", 200, 100);
            tut_generator_3.next();
            break;
        case 4:
            text("Now jump to this platform", 200, 100);
            tut_generator_4.next();
            if(tut_4_wp.pos.x < -tut_4_wp.w){
                if(tut_4_wp.activated){
                    tut_step = 5;
                } else {
                    tut_4_wp.pos.x = width;
                }
            }
            break;
        case 5:
            text("Great work!", 200, 100);
            tut_5_timer.next();
            break;
        case 6:
            text("Be careful of platforms you're too heavy for", 200, 100);
            tut_generator_6.next();
            if(tut_6_fwp.pos.x < -tut_6_fwp.w){
                if(tut_6_fwp.activated){
                    tut_step = 7;
                } else {
                    tut_4_wp.pos.x = width;
                }
            }
            break;
    }
    pop();
    player.update(tut_data, ()=>{
        tut_completed = true;
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
    player.draw();
    if(tut_step == 7 && !tut_completed){
        push();
        fill(0);
        stroke(0);
        textSize(20);
        textAlign(CENTER);
        text("Collect the flag to complete the tutorial", 200, 100);
        pop();
        tut_generator_7.next();
    }
}