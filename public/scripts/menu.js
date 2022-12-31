const startButton = {
    x: width/2,
    y: 200,
    w: 300,
    h: 75,
    onClick: function(){
        start();
    },
};
const tutorialButton = {
    x: width/2,
    y: 350,
    w: 300,
    h: 75,
    onClick: function(){
        tutorial();
    },
};
function showMenu(){
    push();
    textSize(40);
    rectMode(CENTER);
    textAlign(CENTER);
    stroke(255);
    fill("#90979B");
    // Button 1
    rect(startButton.x, startButton.y, startButton.w, startButton.h);
    push();
    fill(255);
    text("START", width/2, 200+75/4);
    pop();
    // Button 2
    rect(tutorialButton.x, tutorialButton.y, tutorialButton.w, tutorialButton.h);
    push();
    fill(255);
    text("How to Play", width/2, 350+75/4);
    pop();
    // Button 3
    pop();
}
function checkClicked(button){
    // NOTE rectMode is CENTER
    if(mouseX < button.x - button.w/2 || mouseX > button.x + button.w/2)
        return;
    if(mouseY < button.y - button.h/2 || mouseY > button.y + button.h/2)
        return;
    button.onClick();
}