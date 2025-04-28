let t = 0;
let faceImg, catIcon;
let faceX, faceY;
let speedX = 3;
let speedY = 2;
let faceW = 100;
let faceH = 100;
let catCursor = false;
let tail = [];

function preload() {
  faceImg = loadImage('myface.png');
catIcon = loadImage('myface.png'); // 或换别的猫图标
}

function setup() {
  let cnv = createCanvas(windowWidth, 400);
  cnv.parent('sketch-holder');
  faceX = random(100, width - 100);
  faceY = random(100, height - 100);
  generateProcessImages();

  const btn = document.getElementById('cat-cursor');
  if (btn) {
    btn.addEventListener('click', () => {
      catCursor = true;
    });
  }
}

function draw() {
  clear();

  // 动态人物位置
  let centerY = height / 2 + sin(t * 2) * 10;
  let girlX = width / 2 - 300 + sin(t) * 10;
  let catX = width / 2 + 300 + cos(t) * 10;


  drawPortrait(girlX, centerY);

  drawCatHead(catX, centerY - 40);

  t += 0.03;
  // 撞墙头像运动
  faceX += speedX;
  faceY += speedY;
  if (faceX <= 0 || faceX + faceW >= width) speedX *= -1;
  if (faceY <= 0 || faceY + faceH >= height) speedY *= -1;

  // 正常图片 or fallback 圆形
  if (faceImg && faceImg.width > 0) {
    image(faceImg, faceX, faceY, faceW, faceH);
  } else {
    fill(255);
    ellipse(faceX + faceW / 2, faceY + faceH / 2, faceW, faceH);
  }

  // 拖尾猫图标
  if (catCursor) {
    tail.push({ x: mouseX, y: mouseY, t: millis() });
    tail = tail.filter(p => millis() - p.t < 1000);
    noCursor();
    for (let i = 0; i < tail.length; i++) {
      image(catIcon, tail[i].x, tail[i].y, 40, 40);
    }
  } else {
    cursor();
  }
}

// ----------- 角色绘图 -----------

function drawPortrait(x, y) {
  push();
  translate(x, y);
  scale(1.8);
  noStroke();

  fill('#B48A78');
  rect(-80, -10, 160, 100);

  fill('#FFE600');
  ellipse(0, 0, 160, 160);
  ellipse(-85, 0, 30, 30);
  ellipse(85, 0, 30, 30);

  fill('#B48A78');
  beginShape();
  vertex(0, -70);
  bezierVertex(-60, -60, -60, 20, 0, 40);
  bezierVertex(-20, 20, -20, -60, 0, -70);
  endShape(CLOSE);

  beginShape();
  vertex(0, -70);
  bezierVertex(60, -60, 60, 20, 0, 40);
  bezierVertex(20, 20, 20, -60, 0, -70);
  endShape(CLOSE);

  drawCuteDotEye(-50, 10);
  drawCuteDotEye(50, 10);

  stroke('#111');
  strokeWeight(3);
  noFill();
  arc(-35, -35, 5, 5, PI, TWO_PI);
  arc(35, -35, 5, 5, PI, TWO_PI);

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

function drawCatHead(x, y) {
  push();
  translate(x, y);
  fill('#4E63FC');
  ellipse(0, 0, 300, 200);
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

// ----------- 过程图 ----------
function generateProcessImages() {
  const container = document.getElementById("process-pics");
  if (!container) return;

  for (let i = 1; i <= 9; i++) {
    const img = document.createElement("img");
    img.src = `process-pics/process${i}.png`;
    img.style.position = 'absolute';
    img.style.width = '160px';
    img.style.top = `${Math.random() * 80 + 5}%`;
    img.style.left = `${Math.random() * 70 + 10}%`;
    img.style.transform = `rotate(${Math.floor(Math.random() * 50 - 25)}deg)`;
    img.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.15)';
    img.style.border = '3px solid white';
    container.appendChild(img);
  }
}