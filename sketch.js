let img;
let noiseFactor;
let zoomInButton, zoomOutButton, toggleButton;
let zoomAmount = 1.1;
let zoomValueP, noiseFactorP, zoomAmountP;
let imageZoom = 1;
let imageZoomInButton, imageZoomOutButton;
let controlBarVisible = true;

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

  // Create control bar
  let controlBar = createDiv();
  controlBar.id('controlBar');

  // Create toggle button
  toggleButton = createButton('⚙️');
  toggleButton.id('toggleButton');
  toggleButton.mousePressed(toggleControlBar);
  controlBar.child(toggleButton);

  // Create buttons
  let refreshButton = createButton('🔄 Refresh');
  refreshButton.class('toolButton');
  refreshButton.mousePressed(generateImage);
  controlBar.child(refreshButton);

  let downloadButton = createButton('⬇️ Download');
  downloadButton.class('toolButton');
  downloadButton.mousePressed(downloadImage);
  controlBar.child(downloadButton);

  zoomInButton = createButton('🔍+ Zoom In Noise');
  zoomInButton.class('toolButton');
  zoomInButton.mousePressed(zoomOut); // Corrected function
  controlBar.child(zoomInButton);

  zoomOutButton = createButton('🔍- Zoom Out Noise');
  zoomOutButton.class('toolButton');
  zoomOutButton.mousePressed(zoomIn); // Corrected function
  controlBar.child(zoomOutButton);

  let increaseZoomButton = createButton('➕ Increase Zoom Factor');
  increaseZoomButton.class('toolButton');
  increaseZoomButton.mousePressed(increaseZoom);
  controlBar.child(increaseZoomButton);

  let decreaseZoomButton = createButton('➖ Decrease Zoom Factor');
  decreaseZoomButton.class('toolButton');
  decreaseZoomButton.mousePressed(decreaseZoom);
  controlBar.child(decreaseZoomButton);

  imageZoomInButton = createButton('🔍+ Zoom In Image');
  imageZoomInButton.class('toolButton');
  imageZoomInButton.mousePressed(zoomInImage);
  controlBar.child(imageZoomInButton);

  imageZoomOutButton = createButton('🔍- Zoom Out Image');
  imageZoomOutButton.class('toolButton');
  imageZoomOutButton.mousePressed(zoomOutImage);
  controlBar.child(imageZoomOutButton);

  noiseFactorP = createP(`Current noise factor: ${noiseFactor}`);
  noiseFactorP.class('toolButton');
  noiseFactorP.style('margin', '5px');
  controlBar.child(noiseFactorP);

  zoomAmountP = createP(`Current zoom amount: ${zoomAmount.toFixed(2)}`);
  zoomAmountP.class('toolButton');
  zoomAmountP.style('margin', '5px');
  controlBar.child(zoomAmountP);

  let main = select('main');
  main.child(controlBar);

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

function toggleControlBar() {
  controlBarVisible = !controlBarVisible;
  let controlBar = select('#controlBar');
  controlBar.toggleClass('collapsed', !controlBarVisible);
}
