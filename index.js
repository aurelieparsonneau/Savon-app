// ------------------ IMPORTS ------------------ //
const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const jsonServer = require('json-server');


// ------------------ VARIABLES ------------------ //
const jsm = jsonServer.router('db.json');

const app = express();


// ------------------ APP USE AND SET ------------------ //
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(bodyParser.json()); 

app.use('/api', jsm); 

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/savons');
});

app.get('/savons', (req, res) => {
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; 
    res.render('savons', { savons });
})

app.post('/savons/create', (req, res) => {
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; 
    const newSavon = { 
        id: Date.now(),
        title: req.body.title, 
        description: req.body.description, 
        status: req.body.status, 
    };
    savons.push(newSavon); 
    fs.writeFileSync('db.json', JSON.stringify({ savons })); 
    res.redirect('/savons'); 
});

app.get('/savons/voir/:id', (req, res) => {
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; 
    const savonId = savons.filter(savon => savon.id == parseInt(req.params.id));
    fs.readFileSync('db.json').savonId;
    res.render('savonId', { savonId });
})

app.get('/savons/delete/:id', (req, res) => { 
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; 
    const newSavons = savons.filter(savon => savon.id !== parseInt(req.params.id)); 
    fs.writeFileSync('db.json', JSON.stringify({ savons: newSavons })); 
    res.redirect('/savons'); 
});

app.listen(3001, () => console.log('Le serveur est lancé sur le port 3001'));