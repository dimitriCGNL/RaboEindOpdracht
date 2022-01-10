const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

function Loaddata(){
    data = fs.readFileSync(path.join(__dirname, 'data.json'));
    return JSON.parse(data);
}

function Writedata(data){
    fs.writeFileSync(path.join(__dirname, 'data.json'),JSON.stringify(data))
}


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/edit',function(req,res){
    res.sendFile(path.join(__dirname,'edit.html'))
})

app.get('/view',function(req,res){
    res.sendFile(path.join(__dirname,'view.html'))
})

app.get('/data',function(req,res){
    var data = Loaddata();
    res.send(data)
})

app.post('/data',function(req,res){
    var data = req.body;
    Writedata(data);
    res.send('OKE')
})


app.get('/chart.js',function(req,res){
    res.sendFile(path.join(__dirname,'chart.js'))
})

app.get('/Index-Sketch.js',function(req,res){
    res.sendFile(path.join(__dirname,'Index-Sketch.js'))
})

app.get('/edit-Sketch.js',function(req,res){
    res.sendFile(path.join(__dirname,'edit-Sketch.js'))
})


app.get('/point.js',function(req,res){
    res.sendFile(path.join(__dirname,'point.js'))
})



app.listen(process.env.PORT|| 3000,
    ()=>console.log('Server is running...'));
