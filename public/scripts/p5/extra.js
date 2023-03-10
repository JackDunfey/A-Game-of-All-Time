// https://p5js.org/examples/color-linear-gradient.html
const Y_AXIS = 1;
const X_AXIS = 2;
function setGradient(x, y, w, h, c1, c2, axis) {
    c1 = color(c1);
    c2 = color(c2);
    push();
    noFill();
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
    pop();
}