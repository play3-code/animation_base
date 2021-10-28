let geodata;
let treeData;

let startYear;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

function preload() {
  geodata = loadJSON("lucerne-trees.json");
}

let currentYear;
let record = false;

function setup() {
  createCanvas(900, 650);

  treeData = geodata.features;
  console.log(treeData[0]);
  console.log(treeData.length);
  treeData = treeData.filter((d) => {
    return d.properties.PFLANZJAHR != null;
  });

  treeData = treeData.filter((d) => {
    return d.properties.PFLANZJAHR > 1000;
  });
  console.log(treeData.length);

  startYear = d3.min(treeData, function (d) {
    return d.properties.PFLANZJAHR;
  });

  currentYear = startYear;

  console.log("startYear", startYear);

  frameRate(30);
}

function draw() {
  background(255);

  noStroke();
  fill(0);
  text(currentYear, 50, 50);

  drawTrees();

  currentYear += 0.5;

  if (record) {
    const timestamp = nf(frameCount, 5);
    const filename = "trees-" + timestamp;
    saveCanvas(filename, "png");
  }
}

function keyTyped() {
  saveCanvas("tree_background", "png");
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;

    if (properties.PFLANZJAHR < currentYear) {
      // console.log(properties);
      let coordinates = geometry.coordinates;
      let lat = coordinates[1];
      let lon = coordinates[0];

      let x = map(lon, bounds.left, bounds.right, 0, width);
      let y = map(lat, bounds.top, bounds.bottom, 0, height);

      let age = currentYear - properties.PFLANZJAHR;
      let r = age * 2;

      let opacity = map(age, 0, 50, 30, 0);

      fill(0, 50);
      ellipse(x, y, 1, 1);
      stroke(0, opacity);
      noFill();
      // ellipse(x, y, r, r);
      rectMode(CENTER);
      push();
      translate(x, y);
      rotate(radians(45));
      rect(0, 0, r, r);
      pop();
    }
  }
}
