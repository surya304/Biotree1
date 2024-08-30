require('dotenv').config();

let express = require('express');
let methodOverride = require('method-override');
let session = require('client-sessions');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let app = express();
let multer = require('multer');
let https = require('https');
let fs = require('fs');
let csrf = require('csurf');
let cookieParser = require('cookie-parser');
let request = require('request');
let helmet = require('helmet')
let querystring = require('querystring');
let router = express.Router();


// setup route middlewares
let csrfProtection = csrf({
    cookie: true
});

let parseForm = bodyParser.urlencoded({
    extended: false
});



app.set('view engine', 'ejs');
app.use(session({
    cookieName: 'session',
    secret: 'PIGINNL&&89001998&*9090dhhu4873edbybjcvm',
    duration: 30 * 60 * 1000,
    activeDuration: 60 * 60 * 1000,
    httpOnly: true
}));

let port = 3000;


app.listen(process.env.PORT || port);

console.log('Running on Port - ' + port);

app.use('/adminui', express.static(__dirname + '/adminui/'));
app.use('/userui', express.static(__dirname + '/userui/'));
app.use(helmet())
app.use(methodOverride('_method'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());




const dburl = process.env.DB_URL;

    
    mongoose.connect(dburl, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }, function(error, db) {
        if (!error) {
            console.log("Connected to database");
        } else {
            console.log("Error connecting to database", error);
        }
    });


app.use(require("./controllers/userController"));
app.use(require("./controllers/shorturlController"));   
app.use(require("./controllers/ImageUpload"));



function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin/login');
    } else {
        next();
    }
};

const logger = require('morgan');

app.use(logger('dev'));

function requireClientLogin(req, res, next) {
    if (!req.session.client) {
        res.redirect('/login');
    } else {
        next();
    }
};


// Email Related Stuff


// Define routes
// app.get('/', csrfProtection,(req, res) => {
//     res.render('login'); // Render the "Login.ejs" template
//   });
  


app.get('*', csrfProtection, function(req, res) {





    if (!req.session.client) {

        res.redirect('/login')
        // res.render('login');
    } else {
        res.redirect('/dashboard')
        // res.render('dashboard');

    }


});




app.use(bodyParser.urlencoded({ extended: true }))
 




