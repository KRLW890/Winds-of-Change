// version 1.00
const loadFrom = "files";

const files = [
    "tilehandler",
    "maphandler",
    "playerhandler",
    "effectshandler",
    "mapbuilder-beta"
];

var processing;
var ctx;
var addScript = function(file, onload) {
    if (typeof onload !== "function") { onload = function() {}; }
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = file;
    s.onload = onload;
    document.body.appendChild(s);
};
var retrieveFiles = function(i) {
    if (i < files.length) {
        addScript(loadFrom+"/"+files[i]+".js", function() { retrieveFiles(i+1); });
    }
    else { runWOC(); }
};

var truewidth = 650;

var loadWOC = function(width, height) {
    
    addScript("processing.min.js", function() {
        if (width === undefined && height === undefined || width === 650 && height === 450) {
            width = 650;
            height = 450;
        }
        else if (width === undefined) { width = 650/450*height; truewidth = width; }
        else if (height === undefined) { height = 450/650*width; truewidth = width; }
        else {
            if (width/650 > height/450) { truewidth = 650/450*height }
            else { truewidth = width; }
        }
        
        var canvas = document.getElementById("winds-of-change");
        ctx = canvas.getContext("2d");
        processing = new Processing(canvas, function(processing) {
            processing.size(width, height);

            processing.background(0);


            processing.fill(255);
            processing.textAlign(3, 3);
            processing.textSize(13000/truewidth);
            processing.text("Loading...\n\nIf this message is on screen for moore\nthan a few seconds, something probably failed to load.", truewidth/2, truewidth/2.888);
            retrieveFiles(0);
        });
    });
};

var runWOC = function() {
    processing.pushMatrix();
    if (processing.width/650 !== processing.height/450) { processing.translate((processing.width-truewidth)/2, (processing.height-truewidth/1.44444444)/2); }
    ctx.drawImage(backgrounds[0], 0, 0, truewidth, truewidth/1.44444444);
    
    petra.adjust();
    
    processing.pushMatrix();
    if (petra.x+petra.width/2+petra.xMomentum > 325-tilesize*2 && petra.x+petra.width/2+petra.xMomentum < map[0].length*tilesize-325+tilesize*2) { processing.translate(processing.width/2-(petra.x+petra.width/2+petra.xMomentum)*truewidth/650, 0); }
    else if (petra.x+petra.xMomentum <= 325) { processing.translate(tilesize*2*truewidth/650, 0); }
    else { processing.translate(-((map[0].length*tilesize-650+tilesize*2)*truewidth/650), 0); }
    
    createMap();
    petra.create();
    
    processing.popMatrix();
    
    processing.popMatrix();
    wind.render();
    /*
processing.stroke(0);
processing.strokeWeight(2);
for (var a = 0; a < 26; a++) {
processing.line(0, a*25, 650, a*25);
processing.line(a*25, 0, a*25, 650);
}*/
    
    processing.fill(0);
    processing.noStroke();
    if (processing.width/650 > processing.height/450) {
        processing.rect(0, 0, (processing.width-truewidth)/2, processing.height);
        processing.rect(processing.width, 0, -(processing.width-truewidth)/2, processing.height);
    }
    else if (processing.width/650 < processing.height/450) {
        processing.rect(0, 0, processing.width, (processing.height-450/650*truewidth)/2);
        processing.rect(0, processing.height, processing.width, -(processing.height-450/650*truewidth)/2);
    }
    
    frameCount++;
    window.setTimeout(runWOC, 33);
};










