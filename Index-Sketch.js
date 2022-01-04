let chart1;
let Height;
let Width;
let T = 0;
let animation = true;
let points;
let P = [];


function preload() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", './data', false); // false for synchronous request
    xmlHttp.send(null);
    var data = xmlHttp.responseText;
    points = JSON.parse(data);
}




function setup() {
    Width = windowWidth;
    Height = windowHeight;
    createCanvas(Width, Height);
    frameRate(60);
    background(255);
    chart1 = new chart(Width / 2, Height / 2, 2 * Width / 3, 2 * Height / 3);
    for (var i = 0; i < points.length; i++) {
        P.push(new point(points[i], chart1));
    }

    Editbutton = createButton('Open Editor')
    Editbutton.position(50,50)
    Editbutton.mousePressed(function(){
        window.location.replace("./edit");
    })
}



function draw() {
    background(255)
    chart1.show();
    for (var i = 0; i < P.length; i++) {
        P[i].show();
        P[i].showInfo();
    }
    

}

function windowResized() {
    background(255)
    Width = windowWidth;
    Height = windowHeight;
    resizeCanvas(Width, Height);
    chart1.x = Width / 2;
    chart1.y = Height / 2;
    chart1.sx = 2 * Width / 3;
    chart1.sy = 2 * Height / 3;
    for (var i = 0; i < P.length; i++) {
        P[i].changewindowsize(chart1);
    }
}

function mousePressed() {
    for (var i = 0; i < P.length; i++) {
        if (P[i].mouseOver()) {
            P[i].changeState();
        }
    }
}