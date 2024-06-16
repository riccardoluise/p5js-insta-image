let img;
let noiseFactor;
let zoomAmount = 1.1;
let imageZoom = 1;

function setup() {
  // Create a scrollable container for the canvas
  let scrollContainer = createDiv();
  scrollContainer.style('overflow-y', 'auto');
  scrollContainer.style('height', 'calc(100vh - 70px)'); // Adjusted to make room for the control bar
  scrollContainer.style('padding-bottom', '70px'); // Ensure space for control bar
  scrollContainer.style('position', 'relative');
  
  let canvasContainer = createDiv();
  scrollContainer.child(canvasContainer);

  // Create the canvas inside the scrollable container
  let canvas = createCanvas(1080, 1920);
  canvas.parent(canvasContainer);
  noLoop(); // Ensure the draw function only runs once

  setupControlBar();

  noiseFactor = random(0.01, 0.2);

  generateImage(); // Generate initial image
}

function draw() {
  if (img) {
    background(255); // Clear background before drawing image
    push();
    scale(imageZoom);
    image(img, 0, 0);
    pop();
  }
}

function generateImage() {
  img = createImage(width, height);
  img.loadPixels();

  // Generate image with Perlin noise in grayscale
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let noiseVal = noise(x * noiseFactor, y * noiseFactor);
      let c = color(noiseVal * 255); // Grayscale value
      img.set(x, y, c);
    }
  }

  img.updatePixels();
  noiseFactorP.html(`Current noise factor: ${noiseFactor.toFixed(5)}`);
  redraw();
}

function downloadImage() {
  save(img, 'perlin_noise_image.png');
}

function zoomIn() {
  noiseFactor *= zoomAmount; // Increase noise factor for zooming in
  generateImage();
}

function zoomOut() {
  noiseFactor /= zoomAmount; // Decrease noise factor for zooming out
  generateImage();
}

function increaseZoom() {
  zoomAmount *= 1.1; // Increase the zoom amount
  zoomAmountP.html(`Current zoom amount: ${zoomAmount.toFixed(2)}`);
}

function decreaseZoom() {
  zoomAmount *= 0.9; // Decrease the zoom amount
  zoomAmountP.html(`Current zoom amount: ${zoomAmount.toFixed(2)}`);
}

function zoomInImage() {
  imageZoom *= 1.1;
  redraw();
}

function zoomOutImage() {
  imageZoom /= 1.1;
  redraw();
}
