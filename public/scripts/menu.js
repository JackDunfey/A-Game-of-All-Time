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
    y: 325,
    w: 300,
    h: 75,
    text: "How to Play",
    onClick: function(){
        tutorialSetup();
    },
};
const leaderboardButton = {
    x: width/2,
    y: 450,
    w: 300,
    h: 75,
    text: "Leaderboard",
    onClick: function(){
        location.assign("/leaderboard");
    },
};
let main_menu_buttons = [startButton, tutorialButton, leaderboardButton];
function showMenu(){
    setGradient(0,0,width,height,"#87ceeb","#a0d8ef",Y_AXIS);
    push();
    textSize(40);
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(255);
    fill("#90979B");
    // Button 1
    main_menu_buttons.forEach(renderButton);
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
const restartButton = {
    x: width/2,
    y: 325,
    w: 300,
    h: 75,
    text: "Restart",
    onClick: function(){
        unpause();
        start();
    }
};
const exitButton = {
    x: width/2,
    y: 450,
    w: 300,
    h: 75,
    text: "EXIT",
    onClick: function(){
        onMenu = true;
        unpause();
    },
};
let pause_menu_buttons = [resumeButton, restartButton, exitButton];
function showPauseMenu(){
    push();
    textSize(40);
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(255);
    fill("#90979B");
    // Button 1
    pause_menu_buttons.forEach(renderButton);
    pop();
}
function renderButton(button){
    rect(button.x, button.y, button.w, button.h);
    push();
    fill(255);
    text(button.text, button.x, button.y+button.h/4); // adjust y thing later (and textsize)
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