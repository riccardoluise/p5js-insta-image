let img;
let noiseFactor;
let zoomInButton, zoomOutButton;
let zoomAmount = 1.1;
let zoomValueP, noiseFactorP, zoomAmountP;
let controlBar, toggleButton;
let isControlBarVisible = true;

function setup() {
  // Create a scrollable container for the canvas
  let scrollContainer = createDiv();
  scrollContainer.style('overflow-y', 'auto');
  scrollContainer.style('height', 'calc(100vh - 70px)');
  scrollContainer.style('padding-bottom', '70px'); // Ensure space for control bar
  scrollContainer.style('position', 'relative');
  
  let canvasContainer = createDiv();
  scrollContainer.child(canvasContainer);

  // Create the canvas inside the scrollable container
  let canvas = createCanvas(1080, 1920);
  canvas.parent(canvasContainer);
  noLoop(); // Ensure the draw function only runs once

  // Create control bar
  controlBar = createDiv();
  controlBar.class('control-bar');

  // Create buttons
  let refreshButton = createButton('<i class="fas fa-sync-alt"></i> Refresh');
  refreshButton.mousePressed(generateImage);
  controlBar.child(refreshButton);

  let downloadButton = createButton('<i class="fas fa-download"></i> Download');
  downloadButton.mousePressed(downloadImage);
  controlBar.child(downloadButton);

  zoomInButton = createButton('<i class="fas fa-search-plus"></i> Zoom In');
  zoomInButton.mousePressed(zoomOut); // Corrected function
  controlBar.child(zoomInButton);

  zoomOutButton = createButton('<i class="fas fa-search-minus"></i> Zoom Out');
  zoomOutButton.mousePressed(zoomIn); // Corrected function
  controlBar.child(zoomOutButton);

  let increaseZoomButton = createButton('<i class="fas fa-plus-circle"></i> Increase Zoom Amount');
  increaseZoomButton.mousePressed(increaseZoom);
  controlBar.child(increaseZoomButton);

  let decreaseZoomButton = createButton('<i class="fas fa-minus-circle"></i> Decrease Zoom Amount');
  decreaseZoomButton.mousePressed(decreaseZoom);
  controlBar.child(decreaseZoomButton);

  noiseFactorP = createP(`Current noise factor: ${noiseFactor}`);
  noiseFactorP.style('margin', '5px');
  controlBar.child(noiseFactorP);

  zoomAmountP = createP(`Current zoom amount: ${zoomAmount.toFixed(2)}`);
  zoomAmountP.style('margin', '5px');
  controlBar.child(zoomAmountP);

  // Add toggle button
  toggleButton = createButton('<i class="fas fa-chevron-up"></i>');
  toggleButton.style('position', 'fixed');
  toggleButton.style('bottom', '90px');
  toggleButton.style('right', '10px');
  toggleButton.style('font-size', '24px');
  toggleButton.style('padding', '10px');
  toggleButton.mousePressed(toggleControlBar);

  noiseFactor = random(0.01, 0.2);

  generateImage(); // Generate initial image
}

function draw() {
  if (img) {
    image(img, 0, 0);
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

function toggleControlBar() {
  if (isControlBarVisible) {
    controlBar.hide();
    toggleButton.html('<i class="fas fa-chevron-down"></i>');
  } else {
    controlBar.show();
    toggleButton.html('<i class="fas fa-chevron-up"></i>');
  }
  isControlBarVisible = !isControlBarVisible;
}
