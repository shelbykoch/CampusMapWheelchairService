const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;


//EJS Template Views
app.set('view engine', 'ejs');
app.set('views', './views');
//Middleware
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDdXD8oxcCd95leHi7DxNkbTkI9XNWbLao'
});

app.use(session({
    secret: 'mysupersecretstring@#!$',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

const database = require('./database.js');
database.startDBandApp(app, PORT);

app.get('/', (req, res) => {
    app.locals.buildingCollection.find({}).toArray()
        .then(buildings => {
            app.locals.buildings = buildings
            res.render('index', { buildings: app.locals.buildings })
        })
        .catch(error => {
            //error
        })
});