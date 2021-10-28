let geodata;
let treeData;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

function preload() {
  geodata = loadJSON("lucerne-trees.json");
}

function setup() {
  createCanvas(900, 650);

  treeData = geodata.features;

  noLoop();
}

function draw() {
  background(255);

  drawTrees();
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];

    let coordinates = treeObject.geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    fill(0);
    noStroke();
    ellipse(x, y, 3, 3);
  }
}
