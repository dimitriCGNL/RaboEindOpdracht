let points;
let Width;
let Height;
let buttons = [];
let EditState = false;
let globalINDEX;
let INPUTS = [];

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
    createCanvas(Width, Height + 100);
    background(255)
    MakeButtonList(points);
}


function draw() {



}


function windowResized() {
    Width = windowWidth;
    Height = windowHeight;
    resizeCanvas(Width, Height + 100);
    MakeButtonList(points);
    Editor();
}

function Editor() {
    background(255);
    MakeButtonList(points);
    for (let i = 0; i < INPUTS.length; i++) {
        INPUTS[i].remove();
    }

    if (EditState) {
        let index = (parseInt(globalINDEX)) - 1;
        if (index == points.length) {
            DATA = {
                id: index + 1,
                loc: [0, 0],
                color: [0, 0, 0],
                name: '',
                beschrijving: ''
            }
            points.push(DATA);
        }
        fill(0)
        textAlign(LEFT)
        textSize(16)
        text("Name: ", (Width / 4) + 50, 100)
        let name = createInput('');
        name.position((Width / 4) + 58, 110);
        name.size(100);
        name.value(points[index].name);
        text("Beschrijving: ", (Width / 4) + 50, 140)
        let beschrijving = createInput('');
        beschrijving.position((Width / 4) + 58, 150);
        beschrijving.size(500);
        beschrijving.value(points[index].beschrijving);
        text("location: [x,y]", (Width / 4) + 50, 180)
        inputx = createInput();
        inputx.value(points[index].loc[0])
        inputx.position((Width / 4) + 58, 190);
        inputx.size(50);
        inputy = createInput();
        inputy.value(points[index].loc[1])
        inputy.position((Width / 4) + 58, 210);
        inputy.size(50);
        text("Color", (Width / 4) + 50, 250)
        colorPicker = createColorPicker(points[index].color);
        colorPicker.position((Width / 4) + 58, 270);
        button = createButton('Save');
        button.position((Width / 4) + 58, 310);


        button.mousePressed(function() {
            let tmp = colorPicker.value();
            tmp = tmp.split('#')
            let tmp2 = tmp[1];
            let col = tmp2.convertToRGB();
            DATA = {
                id: points[index].id,
                loc: [inputx.value(), inputy.value()],
                color: [col[0], col[1], col[2]],
                name: name.value(),
                beschrijving: beschrijving.value()
            }
            points[index] = DATA
            console.log(points)
            background(255);
            EditState = false;
            MakeButtonList(points);
            Editor();
            Export();
        });
        INPUTS.push(name, beschrijving, inputx, inputy, colorPicker, button);
    }
}

function MakeButtonList(points) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }

    N = points.length;
    const dHeight = (Height / N)
    buttons = [];
    for (let i = 0; i < N; i++) {
        rectMode(CORNER)
        fill(255)
        rect(0, (dHeight * i)+50, Width / 4, dHeight)
        fill(0)
        textAlign(LEFT)
        textSize(16)
        text("ID: " + points[i].id, 10, (dHeight * i) + (20)+50)
        text("Name: " + points[i].name, 10, (dHeight * i) + (40)+50)
        text("Beschrijving: " + points[i].beschrijving, 10, (dHeight * i) + (60)+50)
        text("Location: " + points[i].loc, 10, (dHeight * i) + (80)+50)
        text("Kleur: " + points[i].color, 10, (dHeight * i) + (100)+50)
        fill(points[i].color)
        rectMode(CENTER)
        rect((Width / 4) - 50, (dHeight * i) + 100+50, 25, 25)
        delbutton = createButton('Delete');
        delbutton.position((Width / 4) - 50, (dHeight * (i + 1)) - 25 +50);
        delbutton.mousePressed(function() {
            points.splice(parseInt(points[i].id) - 1, 1)
            MakeButtonList(points);
            Editor();
            Export();
        });
        buttons.push(delbutton);

        editbutton = createButton('Edit');
        editbutton.position((Width / 4) - 50, (dHeight * (i + 1)) - 75 +50);
        editbutton.mousePressed(function() {
            EditState = true;
            globalINDEX = points[i].id
            Editor();
        });
        buttons.push(editbutton);

        addbutton = createButton('Add');
        addbutton.position((Width / 4) - 50, Height + 75)
        addbutton.mousePressed(function() {
            EditState = true;
            globalINDEX = points.length + 1;
            Editor();
        })
        buttons.push(addbutton);

        returnbutton = createButton('Return');
        returnbutton.position(50,25);
        returnbutton.mousePressed(function() {
            Export();
            window.location.replace("..");
        })
    }
}

String.prototype.convertToRGB = function() {
    if (this.length != 6) {
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

function Export() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", './Data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(points));
}