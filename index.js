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
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; // On récupère les tâches dans le fichier JSON.
    const newSavon = { // On crée une nouvelle tâche.
        id: Date.now(), // On génère un id unique pour la nouvelle tâche.
        title: req.body.title, // On récupère le titre de la nouvelle tâche.
        description: req.body.description, // On récupère la description de la nouvelle tâche.
        status: req.body.status, // On récupère le statut de la nouvelle tâche.
    };
    savons.push(newSavon); // On ajoute la nouvelle tâche dans le tableau des tâches.
    fs.writeFileSync('db.json', JSON.stringify({ savons })); // On enregistre les tâches dans le fichier JSON.
    // let message = "La tâche a bien été ajoutée";
    res.redirect('/savons'); // On redirige l'internaute vers la page des tâches.
});

app.get('/savons/voir/:id', (req, res) => {
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; 
    const savonId = savons.filter(savon => savon.id == parseInt(req.params.id));
    fs.readFileSync('db.json').savonId;
    res.render('savonId', { savonId });
})

app.get('/savons/delete/:id', (req, res) => { // On définit la route "/tasks/delete/:id".
    const savons = JSON.parse(fs.readFileSync('db.json')).savons; // On récupère les tâches dans le fichier JSON.
    const newSavons = savons.filter(savon => savon.id !== parseInt(req.params.id)); // On filtre les tâches pour ne garder que les tâches dont l'id est différent de l'id de la tâche à supprimer.
    fs.writeFileSync('db.json', JSON.stringify({ savons: newSavons })); // On enregistre les tâches dans le fichier JSON.
    res.redirect('/savons'); // On redirige l'internaute vers la page des tâches.
});

app.listen(3001, () => console.log('Le serveur est lancé sur le port 3001'));