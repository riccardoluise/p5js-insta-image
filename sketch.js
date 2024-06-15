let img;
let noiseFactor;
let zoomInButton, zoomOutButton;
let zoomAmount = 1.1;
let zoomValueP, noiseFactorP, zoomAmountP;

function setup() {
  createCanvas(1080, 1920);
  noLoop(); // Ensure the draw function only runs once

  // Create buttons
  let refreshButton = createButton('Refresh');
  refreshButton.position(10, height + 10);
  refreshButton.mousePressed(generateImage);

  let downloadButton = createButton('Download');
  downloadButton.position(100, height + 10);
  downloadButton.mousePressed(downloadImage);

  zoomInButton = createButton('Zoom In');
  zoomInButton.position(190, height + 10);
  zoomInButton.mousePressed(zoomOut); // Corrected function

  zoomOutButton = createButton('Zoom Out');
  zoomOutButton.position(280, height + 10);
  zoomOutButton.mousePressed(zoomIn); // Corrected function

  let increaseZoomButton = createButton('Increase Zoom Amount');
  increaseZoomButton.position(370, height + 10);
  increaseZoomButton.mousePressed(increaseZoom);

  let decreaseZoomButton = createButton('Decrease Zoom Amount');
  decreaseZoomButton.position(530, height + 10);
  decreaseZoomButton.mousePressed(decreaseZoom);

  noiseFactorP = createP(`Current noise factor: ${noiseFactor}`);
  noiseFactorP.position(10, height + 40);

  zoomAmountP = createP(`Current zoom amount: ${zoomAmount.toFixed(2)}`);
  zoomAmountP.position(10, height + 70);

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
