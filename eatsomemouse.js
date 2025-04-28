let video;
let faceapi;
let detections = [];
let mice = [];
let eatenWeek = null;
let showPopup = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  const options = {
    withLandmarks: true,
    withDescriptors: false
  };

  faceapi = ml5.faceApi(video, options, modelReady);

  // 生成三只老鼠
  for (let i = 0; i < 3; i++) {
    mice.push({
      x: random(width * 0.2, width * 0.8),
      y: random(height * 0.3, height * 0.7),
      floatOffset: random(0, 1000),
      label: `week ${i + 4}`,
      alive: true
    });
  }
}

function modelReady() {
  console.log("FaceAPI ready!");
  faceapi.detect(gotFaces);
}

function gotFaces(err, result) {
  if (err) {
    console.error(err);
    return;
  }

  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(0);

  push();
  translate(width, 0);
  scale(-1, 1); 
  image(video, 0, 0, width, height);
  
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
  
    let left = points[36];
    let right = points[45];
    let midX = (left._x + right._x) / 2;
    let midY = (left._y + right._y) / 2;
    let topHeadX = midX;
    let topHeadY = midY - 100;
  
    drawCatEars(topHeadX, topHeadY);  // 
    checkEat(points);
  }
  
  pop(); // 结束镜像

  drawFloatingMice();
  drawScreenPrompt();

  if (showPopup && eatenWeek) {
    drawPopup();
  }
}

function drawCatEars(x, y) {
  push();
  fill('#4E63FC');
  noStroke();

  let earWiggle = sin(frameCount * 0.1) * 10;

  // 左耳
  push();
  translate(x - 80, y);
  rotate(radians(-15 + earWiggle));
  triangle(-20, 20, 0, -60, 20, 20);
  pop();

  // 右耳
  push();
  translate(x + 80, y);
  rotate(radians(15 - earWiggle));
  triangle(-20, 20, 0, -60, 20, 20);
  pop();

  pop();
}

function drawFloatingMice() {
    push();
    translate(width, 0);
    scale(-1, 1); //  画面整体镜像
  
    for (let i = 0; i < mice.length; i++) {
      let m = mice[i];
      if (!m.alive) continue;
  
      let floatY = sin(frameCount * 0.05 + m.floatOffset) * 20;
  
      push();
      translate(m.x, m.y + floatY);
  
      fill(120);
      ellipse(0, 0, 80, 50);
      ellipse(-25, -30, 20, 20);
      ellipse(25, -30, 20, 20);
  
      //  在镜像状态下再翻转一次文字
      push();
      scale(-1, 1); // 文字反镜像回来
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(m.label, 0, 0);
      pop();
  
      pop();
    }
  
    pop();
  }


  function checkEat(points) {
    let upper = points[62];
    let lower = points[66];
    let isMouthOpen = dist(upper._x, upper._y, lower._x, lower._y) > 25;
    if (!isMouthOpen || showPopup) return;
  
    let mouthX = (upper._x + lower._x) / 2;
    let mouthY = (upper._y + lower._y) / 2;
  
    for (let i = 0; i < mice.length; i++) {
      let m = mice[i];
      if (!m.alive) continue;
  
      let floatY = sin(frameCount * 0.05 + m.floatOffset) * 20;
      let mx = m.x;
      let my = m.y + floatY;
  
      let d = dist(mouthX, mouthY, mx, my);
      if (d < 60) {
        eatenWeek = m.label.split(" ")[1];
        showPopup = true;
        m.alive = false;
        break;
      }
    }
  }

function drawPopup() {
  fill(255, 255, 255, 230);
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 200, 20);

  fill('#111');
  textAlign(CENTER, CENTER);
  textSize(20);
  text(`You ate week${eatenWeek}!\nView it now?`, width / 2, height / 2 - 40);

  fill('#4E63FC');
  rect(width / 2 - 80, height / 2 + 40, 100, 40, 10);
  fill(255);
  text("YES", width / 2 - 80, height / 2 + 40);

  fill('#F4343D');
  rect(width / 2 + 80, height / 2 + 40, 100, 40, 10);
  fill(255);
  text("NO", width / 2 + 80, height / 2 + 40);
}

function mousePressed() {
    if (dist(mouseX, mouseY, width / 2 + 80, height / 2 + 40) < 50) {
        showPopup = false;
      
        // 👇 让对应老鼠“复活”
        for (let i = 0; i < mice.length; i++) {
          if (mice[i].label === `week ${eatenWeek}`) {
            mice[i].alive = true;
            break;
          }
        }
      
        eatenWeek = null;
      }
}

function mousePressed() {
  if (!showPopup) return;

  //  YES 按钮检测（左边按钮）
  if (dist(mouseX, mouseY, width / 2 - 80, height / 2 + 40) < 50) {
    // 点击 YES → 跳转到 week 页面
    window.location.href = `week${eatenWeek}.html`;
  }

  //  NO 按钮检测（右边按钮）
  if (dist(mouseX, mouseY, width / 2 + 80, height / 2 + 40) < 50) {
    showPopup = false;

    //  让对应老鼠复活
    for (let i = 0; i < mice.length; i++) {
      if (mice[i].label === `week ${eatenWeek}`) {
        mice[i].alive = true;
        break;
      }
    }

    eatenWeek = null;
  }
}

function drawScreenPrompt() {
  fill('#F4343D');
  rectMode(CENTER);
  rect(width / 2, 50, 500, 60, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("open your mouth eat some mouse 😹🍽️🐭", width / 2, 50);
}
