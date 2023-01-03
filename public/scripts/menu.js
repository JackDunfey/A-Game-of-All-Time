const startButton = {
    x: width/2,
    y: 200,
    w: 300,
    h: 75,
    text: "START",
    onClick: function(){
        start();
    },
};
const tutorialButton = {
    x: width/2,
    y: 350,
    w: 300,
    h: 75,
    text: "How to Play",
    onClick: function(){
        tutorialSetup();
    },
};
let main_menu_buttons = [startButton, tutorialButton];
function showMenu(){
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    push();
    textSize(40);
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(255);
    fill("#90979B");
    // Button 1
    main_menu_buttons.forEach(button=>{
        rect(button.x, button.y, button.w, button.h);
        push();
        fill(255);
        text(button.text, button.x, button.y+button.h/4); // adjust y thing later (and textsize)
        pop();
    });
    // Button 2
    pop();
}
const resumeButton = {
    x: width/2,
    y: 200,
    w: 300,
    h: 75,
    text: "Resume",
    onClick: function(){
        unpause();
    },
};
const exitButton = {
    x: width/2,
    y: 350,
    w: 300,
    h: 75,
    text: "EXIT",
    onClick: function(){
        onMenu = true;
        unpause();
    },
};
let pause_menu_buttons = [resumeButton, exitButton];
function showPauseMenu(){
    push();
    textSize(40);
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(255);
    fill("#90979B");
    // Button 1
    pause_menu_buttons.forEach(button=>{
        rect(button.x, button.y, button.w, button.h);
        push();
        fill(255);
        text(button.text, button.x, button.y+button.h/4); // adjust y thing later (and textsize)
        pop();
    });
    pop();
}
function checkClicked(button){
    // NOTE rectMode is CENTER
    if(mouseX < button.x - button.w/2 || mouseX > button.x + button.w/2)
        return 0;
    if(mouseY < button.y - button.h/2 || mouseY > button.y + button.h/2)
        return 0;
    button.onClick();
    return 1;
}