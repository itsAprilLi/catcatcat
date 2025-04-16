
let ribbonPositions = [];
let spacedText = "H E L L O   W O R L D";
let mice = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(72);
  fill(255);

  for (let i = 0; i < spacedText.length; i++) {
    ribbonPositions.push(createVector(width / 2, height / 2));
  }
}

function draw() {
  background('#F4343D');
  noStroke();

  let cx = width / 2;
  let cy = height / 2;

  drawCatHead(cx, cy);
  drawRibbonText(spacedText);

  for (let i = 0; i < mice.length; i++) {
    drawMouse(mice[i].x, mice[i].y);
  }
}

function drawCatHead(x, y) {
  push();
  translate(x, y);

  fill('#4E63FC');
  ellipse(0, 0, 300, 200);

  fill('#4E63FC');
  triangle(-80, -60, -50, -140, -20, -60);
  triangle(80, -60, 50, -140, 20, -60);

  drawEye(-70, -10);
  drawEye(70, -10);
  drawMouth(0, 50);

  pop();
}

function drawEye(x, y) {
  push();
  translate(x, y);

  let eyeW = 100;
  let eyeH = 60;
  fill(255);
  ellipse(0, 0, eyeW, eyeH);

  let dx = mouseX - (width / 2 + x);
  let dy = mouseY - (height / 2 + y);
  let angle = atan2(dy, dx);

  let offset = 15;
  let px = cos(angle) * offset;
  let py = sin(angle) * offset;

  fill('#111111');
  ellipse(px, py, 25, 25);

  pop();
}

function drawMouth(x, y) {
  push();
  stroke('#111111');
  strokeWeight(4);
  noFill();
  arc(x - 8, y, 16, 16, 0, 180);
  arc(x + 8, y, 16, 16, 0, 180);
  pop();
}

function drawRibbonText(txt) {
  let speed = 0.2;
  for (let i = 0; i < txt.length; i++) {
    if (i === 0) {
      ribbonPositions[i].x = mouseX;
      ribbonPositions[i].y = mouseY;
    } else {
      ribbonPositions[i].x = lerp(ribbonPositions[i].x, ribbonPositions[i - 1].x, speed);
      ribbonPositions[i].y = lerp(ribbonPositions[i].y, ribbonPositions[i - 1].y, speed);
    }

    push();
    translate(ribbonPositions[i].x, ribbonPositions[i].y);
    text(txt[i], 0, 0);
    pop();
  }
}

function drawMouse(x, y) {
  push();
  translate(x, y);

  fill('#888888');
  ellipse(0, 0, 120, 80);
  ellipse(-35, -40, 25, 25);
  ellipse(35, -40, 25, 25);

  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("CLICK ME", 0, 5);

  // 如果鼠标点击时靠近老鼠，跳转
  if (
    mouseIsPressed &&
    dist(mouseX, mouseY, x, y) < 60
  ) {
    window.location.href = "eatsomemouse.html";
  }

  pop();
}

function mousePressed() {
  let mx = random(100, width - 100);
  let my = random(100, height - 100);
  mice.push(createVector(mx, my));
}
