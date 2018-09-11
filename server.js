const express = require("express");
const hbs = require("hbs");
const fs = require("fs");


var app = express();       //creates the express app

hbs.registerPartials(__dirname + "/views/partials")        //takes path where all Partials are stored in (z.b header und footer die oft verwendet werden)

app.set("view engine", "hbs");      //key: was wolleen wir setten-value: zu was wollen wirs setten


app.use((req, res, next) => {       //req stores info aubout the request (client uses app, browser, etc.)
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);    //req.method: request method und req.url gibt den Pfad an
    fs.appendFile("server.log", log + "\n", (err) => {      //erstellt log file für Serveractions
        if (err) {
            console.log("Unable to append to server.log");
        }
    });   
    next();                     //next tells the async function that were done
});

//app.use((req, res, next) => {       //setzt alle Seiten zu maintenance.hbs weil nicht next gecalled wird
//    res.render("maintenance.hbs");
//});

app.use(express.static(__dirname + "/public"));     //ap..use registers middleware/ takes file from given direcotry
                                        //in Browser: http://localhost:3000/help.html

                                        hbs.registerHelper("getCurrentYear", () => {        //methode die in templates geladen wird
    return new Date().getFullYear()         //erstellt jahreszahl z.B 2018
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});
                                        // / -> root route
app.get("/", (req, res) => {            //req(est): stores many informations about the request coming in(headers, body information) 
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website",
    });      //wenn jemand ein http request macht, bekommt er das zurück
});                                     //HTML Tags gehen auch  / handeler für http get request


app.get("/about", (req, res) => {   //"/about" ist der route    (Rute oder URL) localhost:3000/about
    res.render("about.hbs", {       //lets us render our hbs templates
        pageTitle: "About Page",        //erstellt variablen für unser Template
    });
});       


app.get("/bad", (req, res) => {
    res.send({      //res:response req:request
        errorMessage: "Unable to fulfill this request"
    });
});     //Objekte als JSON




app.listen(3000, () => {
    console.log("Server is up on port 3000");   //optional: wenn der server läuft, wird funktion ausgeführt
});     //binds app to port on our machine
//In Terminal: nodemon server.js und in Browser: localhost:3000 bringt uns Webseite
















