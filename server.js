//let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./app/config/config');
let path = require('path');
let helmet = require('helmet')
let validator = require('express-validator')

// User the test database for test
if(process.env.NODE_ENV !== 'test') {

    db = mongoose.connect(config.db);
    app.listen(config.port, function(err){
        if(err) throw err;
        console.log("App listening on port " + config.port);
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + config.db);
    });

}else{

    db = mongoose.connect(config.test_db);
    app.listen(config.test_port, function(err){
        if(err) throw err;
        console.log("Listening on port " + config.test_port);
    });

    mongoose.connection.on('connected', function () {
        //console.log('Mongoose default connection open to ' + config.test_db);
    });

}

// setup view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views')

// set public folder location to serve JS & CSS
app.use(express.static(__dirname + '/public'));

// Configure middlewear
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

require('./app/routes/routes')(app);

module.exports = app; // for testing