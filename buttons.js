let zoomInButton, zoomOutButton, toggleButton, noiseFactorP, zoomAmountP, imageZoomInButton, imageZoomOutButton;
let controlBarVisible = true;

function setupControlBar() {
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
}

function toggleControlBar() {
  controlBarVisible = !controlBarVisible;
  let controlBar = select('#controlBar');
  controlBar.toggleClass('collapsed', !controlBarVisible);
}
