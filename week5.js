

let bottomImg, topImg;

function preload() {
  bottomImg = loadImage('blackwhite.png');
  topImg = loadImage('colourful.png');
}

function setup() {
    let canvas;
    function setup() {
      let w = min(windowWidth * 0.4, 500);
      canvas = createCanvas(w, w * 0.75);
      canvas.parent('img-holder');
    }
  canvas.parent('img-holder');
  topImg.resize(width, height);
  image(bottomImg, 0, 0, width, height);
}

function mouseDragged() {
  if (topImg && topImg.width > 0) {
    copy(topImg, mouseX, mouseY, 80, 80, mouseX, mouseY, 80, 80);
  }
}