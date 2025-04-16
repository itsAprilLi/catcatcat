let t = 0;

function setup() {
  let cnv = createCanvas(800, 400);
  cnv.parent('sketch-holder');
  noStroke();
}

function draw() {
  clear();
  let girlX = width / 2 - 150 + sin(t) * 10;
  let catX = width / 2 + 150 + cos(t) * 10;
  let y = height / 2 + sin(t * 2) * 10;

  drawPortrait(girlX, y);
  drawCatHead(catX, y);
  t += 0.03;
}

// ---------------- 可爱女孩函数 ----------------
function drawPortrait(x, y) {
  push();
  translate(x, y);
  scale(1.3); // 放大女孩当主角！

  noStroke();

  // 背后头发（下垂）
  fill('#B48A78');
  rect(-80, -10, 160, 100);

  // 脸（亮黄圆脸）
  fill('#FFE600');
  ellipse(0, 0, 160, 160);

  // 耳朵
  fill('#FFE600');
  ellipse(-85, 0, 30, 30);
  ellipse(85, 0, 30, 30);

  fill('#B48A78');
beginShape();
vertex(0, -80); // 中间上尖点
bezierVertex(-60, -60, -60, 20, 0, 40); // 左弧线到底
bezierVertex(-20, 20, -20, -60, 0, -80); // 内侧回中间
endShape(CLOSE);

fill('#B48A78');
beginShape();
vertex(0, -80);
bezierVertex(60, -60, 60, 20, 0, 40);
bezierVertex(20, 20, 20, -60, 0, -80);
endShape(CLOSE);

  // 眼睛
  drawCuteDotEye(-50, 10);
  drawCuteDotEye(50, 10);

  // 眉毛
  stroke('#111');
  strokeWeight(3);
  noFill();
  arc(-35, -35, 5, 5, PI, TWO_PI); // 左眉
  arc(35, -35, 5, 5, PI, TWO_PI);  // 右眉

  // 嘴巴（uwu）
  noFill();
  stroke('#111');
  strokeWeight(4);
  beginShape();
  curveVertex(-10, 20);
  curveVertex(-5, 24);
  curveVertex(0, 22);
  curveVertex(5, 24);
  curveVertex(10, 20);
  endShape();

  pop();
}

function drawCuteDotEye(x, y) {
  push();
  translate(x, y);
  fill(255);
  ellipse(0, 0, 50, 40);

  let dx = mouseX - (width / 2 + x);
  let dy = mouseY - (height / 2 + y);
  let angle = atan2(dy, dx);
  let px = cos(angle) * 5;
  let py = sin(angle) * 5;

  fill('#111');
  ellipse(px, py, 35, 35);
  pop();
}

// ---------------- 蓝猫函数 ----------------
function drawCatHead(x, y) {
  push();
  translate(x, y);
  fill('#4E63FC');
  ellipse(0, 0, 300, 200);

  // 耳朵
  triangle(-80, -60, -50, -140, -20, -60);
  triangle(80, -60, 50, -140, 20, -60);

  drawCatEye(-70, -10);
  drawCatEye(70, -10);
  drawMouth(0, 50);
  pop();
}

function drawCatEye(x, y) {
  push();
  translate(x, y);
  fill(255);
  ellipse(0, 0, 100, 60);

  let dx = mouseX - (width / 2 + x);
  let dy = mouseY - (height / 2 + y);
  let angle = atan2(dy, dx);
  let px = cos(angle) * 15;
  let py = sin(angle) * 15;

  fill('#111');
  ellipse(px, py, 25, 25);
  pop();
}

function drawMouth(x, y) {
  push();
  stroke('#111');
  strokeWeight(4);
  noFill();
  arc(x - 8, y, 16, 16, 0, PI);
  arc(x + 8, y, 16, 16, 0, PI);
  pop();
}