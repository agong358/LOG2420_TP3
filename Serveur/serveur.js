const express = require('express');
const app = express();

//Fix pour Cross Origin Problem (From forum TP)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));
app.use('/json', express.static(__dirname + '/JSON'));

// routes
var server = app.listen(8080);
