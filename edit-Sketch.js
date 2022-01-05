let points;
let Width;
let Height;
let buttons = [];
let EditState = false;
let globalINDEX;
let INPUTS = [];
let div;
let totaly;
let N;

function preload() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", './data', false); // false for synchronous request
    xmlHttp.send(null);
    var data = xmlHttp.responseText;
    points = JSON.parse(data);
}


function setup() {
    N = points.length;
    Width = windowWidth;
    Height = windowHeight + 200 * N;
    createCanvas(Width, Height);
    background(255)
    MakeButtonList(points);
}


function draw() {



}


function windowResized() {
    Width = windowWidth;
    Height = windowHeight + 200 * N;
    resizeCanvas(Width, Height);
    MakeButtonList(points);
    Editor();
}

function Editor() {
    background(255);
    MakeButtonList(points);

    for (let i = 0; i < INPUTS.length; i++) {
        INPUTS[i].remove();
    }

    if (div) {
        div.remove();
    }
    INPUTS = [];
    if (EditState) {
        let index = (parseInt(globalINDEX)) - 1;
        if (index == points.length) {
            DATA = {
                id: index + 1,
                loc: [0, 0],
                color: [0, 0, 0],
                name: '',
                beschrijving: '',
                table: undefined
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
        text("Aantal jaar tot doorbraak:", (Width / 4) + 50, 180)
        doorbraak = createInput();
        doorbraak.value(points[index].loc[0])
        doorbraak.position((Width / 4) + 58, 190);
        doorbraak.size(50);
        text("Kleur:", (Width / 4) + 50, 220)
        colorPicker = createColorPicker(points[index].color);
        colorPicker.position((Width / 4) + 58, 230);
        text("Bedreigingsmatrix:", (Width / 4) + 50, 270)
            // table a p5.table object to display it as an HTML table
        let matrix = buildTable(["Mogelijke gevolgen van de bedreiging", "Weinig (1)", "Middelmatig (3)", "Veel (5)", " ", "Kortdurend (2)", "Gemiddelde duur (4)", "Langdurend (6)", "Puntentotaal per gevolg"]);
        insertRow(matrix, ["Ongemak bij klanten/leden", "<input type=\"checkbox\" id=\"11\">", "<input type=\"checkbox\" id=\"12\">", "<input type=\"checkbox\" id=\"13\">", " ", "<input type=\"checkbox\" id=\"14\">", "<input type=\"checkbox\" id=\"15\">", "<input type=\"checkbox\" id=\"16\">", "<p id=\"p0\">"]);
        insertRow(matrix, ["Ongemak bij medewerkers", "<input type=\"checkbox\" id=\"21\">", "<input type=\"checkbox\" id=\"22\">", "<input type=\"checkbox\" id=\"23\">", " ", "<input type=\"checkbox\" id=\"24\">", "<input type=\"checkbox\" id=\"25\">", "<input type=\"checkbox\" id=\"26\">", "<p id=\"p1\">"]);
        insertRow(matrix, ["Ongemak in de maatschappij", "<input type=\"checkbox\" id=\"31\">", "<input type=\"checkbox\" id=\"32\">", "<input type=\"checkbox\" id=\"33\">", " ", "<input type=\"checkbox\" id=\"34\">", "<input type=\"checkbox\" id=\"35\">", "<input type=\"checkbox\" id=\"36\">", "<p id=\"p2\">"]);
        insertRow(matrix, ["Ongemak bij insitutionele beleggers", "<input type=\"checkbox\" id=\"41\">", "<input type=\"checkbox\" id=\"42\">", "<input type=\"checkbox\" id=\"43\">", " ", "<input type=\"checkbox\" id=\"44\">", "<input type=\"checkbox\" id=\"45\">", "<input type=\"checkbox\" id=\"46\">", "<p id=\"p3\">"]);
        insertRow(matrix, ["Beperking bij genereren economische activiteit ", "<input type=\"checkbox\" id=\"51\">", "<input type=\"checkbox\" id=\"52\">", "<input type=\"checkbox\" id=\"53\">", " ", "<input type=\"checkbox\" id=\"54\">", "<input type=\"checkbox\" id=\"55\">", "<input type=\"checkbox\" id=\"56\">", "<p id=\"p4\">"]);
        insertRow(matrix, ["Puntentotaal bedreiging", "", "", "", "", "", "", "", "<p id=\"ptot\">"]);


        div = createDiv('');
        div.position((Width / 4) + 50, 280);
        div.id('matrix')

        // calling the function to display the p5.Table object as an HTML table
        let table = build_HTML_table(matrix, "matrix", "matrix", "tg");

        if (points[index].table) {
            matrix = [];
            for (var i = 0; i < 5; i++) {
                matrix[i] = [];
                for (var j = 0; j < 6; j++) {
                    matrix[i][j] = undefined;
                }
            }
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 6; j++) {
                    matrix[i][j] = document.getElementById("" + (i + 1) + (j + 1));
                    matrix[i][j].checked = points[index].table[i][j];
                }
            }
        }

        Checkboxhandler();


        button = createButton('Save');
        button.position((Width / 4) + 58, 800);


        button.mousePressed(function() {
            let tmp = colorPicker.value();
            tmp = tmp.split('#')
            let tmp2 = tmp[1];
            let col = tmp2.convertToRGB();
            let output = CheckboxState();
            DATA = {
                id: points[index].id,
                loc: [doorbraak.value(), totaly],
                color: [col[0], col[1], col[2]],
                name: name.value(),
                beschrijving: beschrijving.value(),
                table: output
            }
            points[index] = DATA
            background(255);
            EditState = false;
            MakeButtonList(points);
            Editor();
            Export();
        });
        INPUTS.push(name, beschrijving, doorbraak, colorPicker, button);
    }
}

function MakeButtonList(points) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }

    N = points.length;
    const dHeight = 200;
    buttons = [];
    for (let i = 0; i < N; i++) {
        rectMode(CORNER)
        fill(255)
        rect(0, (dHeight * i) + 50, Width / 4, dHeight)
        fill(0)
        textAlign(LEFT)
        textSize(16)
        text("ID: " + points[i].id, 10, (dHeight * i) + (20) + 50)
        text("Name: " + points[i].name, 10, (dHeight * i) + (40) + 50)
        text("Beschrijving: " + points[i].beschrijving, 10, (dHeight * i) + (60) + 50)
        text("Location: " + points[i].loc, 10, (dHeight * i) + (80) + 50)
        text("Kleur: " + points[i].color, 10, (dHeight * i) + (100) + 50)
        fill(points[i].color)
        rectMode(CENTER)
        rect((Width / 4) - 50, (dHeight * i) + 100 + 50, 25, 25)
        delbutton = createButton('Delete');
        delbutton.position((Width / 4) - 50, (dHeight * (i + 1)) - 25 + 50);
        delbutton.mousePressed(function() {
            points.splice(parseInt(points[i].id) - 1, 1)
            MakeButtonList(points);
            windowResized();
            Editor();
            Export();
        });
        buttons.push(delbutton);

        editbutton = createButton('Edit');
        editbutton.position((Width / 4) - 50, (dHeight * (i + 1)) - 75 + 50);
        editbutton.mousePressed(function() {
            EditState = true;
            globalINDEX = points[i].id
            Editor();
        });
        buttons.push(editbutton);


    }
    addbutton = createButton('Add');
    addbutton.position((Width / 4) - 50, 25)
    addbutton.mousePressed(function() {
        windowResized();
        EditState = true;
        globalINDEX = points.length + 1;
        Editor();
    })
    buttons.push(addbutton);

    returnbutton = createButton('Return');
    returnbutton.position(50, 25);
    returnbutton.mousePressed(function() {
        Export();
        window.location.replace("..");
    })
    buttons.push(returnbutton);
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

function setValue(idTag, x) {
    select(idTag).value(x);
}

function buildTable(columnHeader) {
    // return an empty P5 table with headers but no data
    let t = new p5.Table();
    let c;
    for (c = 0; c < columnHeader.length; c += 1) {
        t.addColumn(columnHeader[c]);
    }
    return t;
}

function insertRow(tbl, rowdata) {
    // insert a row in the  p5.table tbl
    // the rowdata should be an array of values

    let newrow = tbl.addRow();
    let newid = tbl.getRowCount() - 1;

    for (let c = 0; c < tbl.getColumnCount(); c++) {
        newrow.set(tbl.columns[c], rowdata[c]);
        //print('new row ' + newid + ' col ' + c + ' data =' + rowdata[c]);
    }
    return;
}


function build_HTML_table(tbl, tableID, parentID, classID) {
    // create an HTML table with w3.css class with the table tbl
    // tbl should be a p5.Table object
    // tableID is the selector ID you want to assign to the table
    // parentID is the element ID under which you want to locate the table
    // classID is the class to add to the <table>

    let cc = tbl.getColumnCount();
    let rc = tbl.getRowCount();
    let rows = tbl.getRows();

    //print('col =' + cc + ' row = ' + rc);
    //print(tbl);

    // setup the table header HTML string
    let hh = "<tr>"; // header html
    for (let c = 0; c < cc; c++) {
        hh += "<th>" + tbl.columns[c] + "</th>";
    }
    hh += "</tr>"

    // setup the table row HTML string
    let rh = ""; // row html

    for (let r = 0; r < rc; r++) {
        rh += "<tr>";
        for (let c = 0; c < cc; c++) {

            // add the content of each cell
            rh += "<td>" + tbl.get(r, c) + "</td>";

        }
        rh += "</tr>";
    }

    //print('cell (0,1) = ' + tbl.get(0, 1));
    //print('cell (0,0) = ' + tbl.get(0, 0));

    let t = createElement('table', hh + rh);

    t.addClass(classID); // add the  table class from w3.csss
    t.id(tableID); // sets the id for this <table>
    t.parent(parentID);
    return t;
}


function Checkboxhandler() {
    matrix = [];
    output = [];
    output2 = [];
    for (var i = 0; i < 5; i++) {
        output[i] = 0;
    }
    for (var i = 0; i < 5; i++) {
        matrix[i] = [];
        for (var j = 0; j < 6; j++) {
            matrix[i][j] = undefined;
        }
    }
    for (var i = 0; i < 5; i++) {
        output2[i] = [];
        for (var j = 0; j < 6; j++) {
            output2[i][j] = undefined;
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = document.getElementById("" + (i + 1) + (j + 1));
            matrix[i][j].addEventListener('change', function() {
                matrix[i][0].checked = false;
                matrix[i][1].checked = false;
                matrix[i][2].checked = false;
                this.checked = true;
            });
        }
        for (let j = 3; j < 6; j++) {
            matrix[i][j] = document.getElementById("" + (i + 1) + (j + 1));
            matrix[i][j].addEventListener('change', function() {
                matrix[i][3].checked = false;
                matrix[i][4].checked = false;
                matrix[i][5].checked = false;
                this.checked = true;
            });
        }
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = document.getElementById("" + (i + 1) + (j + 1));
            output[i] = matrix[i][0].checked * 1 + matrix[i][1].checked * 3 + matrix[i][2].checked * 5 + matrix[i][3].checked * 2 + matrix[i][4].checked * 4 + matrix[i][5].checked * 6;
            document.getElementById('p' + i).innerHTML = output[i];
            totaly = output.reduce((a, b) => a + b, 0);
            document.getElementById('ptot').innerHTML = totaly
            matrix[i][j].addEventListener('change', function() {
                output[i] = matrix[i][0].checked * 1 + matrix[i][1].checked * 3 + matrix[i][2].checked * 5 + matrix[i][3].checked * 2 + matrix[i][4].checked * 4 + matrix[i][5].checked * 6;
                document.getElementById('p' + i).innerHTML = output[i];
                totaly = output.reduce((a, b) => a + b, 0);
                document.getElementById('ptot').innerHTML = totaly
            });
        }
    }


}

function CheckboxState() {
    let matrix = [];
    let output2 = [];

    for (var i = 0; i < 5; i++) {
        matrix[i] = [];
        for (var j = 0; j < 6; j++) {
            matrix[i][j] = undefined;
        }
    }
    for (var i = 0; i < 5; i++) {
        output2[i] = [];
        for (var j = 0; j < 6; j++) {
            output2[i][j] = undefined;
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = document.getElementById("" + (i + 1) + (j + 1));
            output2[i][j] = matrix[i][j].checked;
        }
    }

    return output2;
}