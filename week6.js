// 简化后的四大元老猫 meme 多次重复播放版本
let cats = [];
let catOptions = [
  { img: 'cat_meme.png', sound: 'cat_meme.mp3' },
  { img: 'catlaugh.png', sound: 'catlaugh.mp3' },
  { img: 'chipichipi.webp', sound: 'chipichipi.mp3' },
  { img: 'germancat.png', sound: 'germancat.mp3' },
];

let buttons = [];
let myRadio;
let currentStyle = 'normal';

function preload() {
  for (let opt of catOptions) {
    opt.imgObj = loadImage(opt.img);
    opt.soundObj = loadSound(opt.sound);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("red");
  imageMode(CENTER);

  // 创建按钮阵列
  for (let i = 0; i < 20; i++) {
    let btn = createButton("clickcat");
    btn.position(random(width), random(height));
    btn.mousePressed(() => summonRandomCat());
    buttons.push(btn);
  }

  // radio 切换视觉风格
  myRadio = createRadio();
  myRadio.option('normal');
  myRadio.option('mirror');
  myRadio.option('crazy');
  myRadio.position(20, 20);
  myRadio.selected('normal');
}

function draw() {
  background("red");
  currentStyle = myRadio.value();

  for (let cat of cats) {
    let vol = cat.analyzer.getLevel();
    let s = map(vol, 0, 1, 100, 400);
    let fx = currentStyle === 'mirror' && vol > 0.3 ? -1 : 1;
    let fy = currentStyle === 'crazy' && vol > 0.4 ? -1 : 1;

    push();
    translate(cat.pos.x, cat.pos.y);
    scale(fx, fy);
    image(cat.img, 0, 0, s, s);
    pop();
  }
}

function summonRandomCat() {
  let choice = random(catOptions);
  let cat = {
    img: choice.imgObj,
    sound: choice.soundObj,
    analyzer: new p5.Amplitude(),
    pos: createVector(random(100, width - 100), random(100, height - 100)),
    size: 100
  };
  cat.analyzer.setInput(cat.sound);
  cat.sound.play();
  cat.sound.loop();
  cats.push(cat);
}

function mousePressed() {
  let clicked = false;
  for (let cat of cats) {
    let d = dist(mouseX, mouseY, cat.pos.x, cat.pos.y);
    if (d < cat.size / 2) {
      if (cat.sound.isPlaying()) {
        cat.sound.stop();
      } else {
        cat.sound.play();
        cat.sound.loop();
      }
      clicked = true;
    }
  }

  if (!clicked) {
    for (let cat of cats) {
      cat.sound.stop();
    }
  }
}
