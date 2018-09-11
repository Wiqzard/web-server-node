const express = require("express");

var app = express();       //creates the express app

// / -> root route
app.get("/", (req, res) => {       //req(est): stores many informations about the request coming in(headers, body information) 
    res.send("<h1>Hello Express!</h1>");      //wenn jemand ein http request macht, bekommt er das zurück
});      //HTML Tags gehen auch  / handeler für http get request

app.get("/about", (req, res) => {   //"/about" ist der route    (Rute oder URL) localhost:3000/about
    res.send("About Page");
});

app.get("/bad", (req, res) => {
    res.send({      //res:response req:request
        errorMessage: "Unable to fulfill this request"
    });
});     //Objekte als JSON





app.listen(3000);     //binds app to port on our machine
//In Terminal: nodemon server.js und in Browser: localhost:3000 bringt uns Webseite
















