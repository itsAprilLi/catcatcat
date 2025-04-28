let font;
let points = [];

function preload() {
  font = loadFont('AovelSansRounded-rdDL.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth * 0.42, 300);
  canvas.parent('font-holder');

  background(160, 0, 160);
  points = font.textToPoints("Les Points", 40, 200, 144, {
    sampleFactor: 0.2,
  });
}

function draw() {
  background(160, 0, 160);
  let xMapped = map(mouseX, 0, width, 4, 32);

  for (let p of points) {
    noStroke();
    fill(240);
    circle(p.x, p.y, xMapped);
  }
}