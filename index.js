const express = require('express');
const app = express();

const port = 8080;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const flash = require('connect-flash');
const customMware = require("./config/flash-middleware");


//middleware used to parse the data coming from the ejs form
app.use(express.urlencoded({ extended: true }));

//adding static files
app.use(express.static("./assets"));


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Express Session
const session = require('express-session');
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);


//flash middleware
app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));


//setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server :${port}`);
    }
    console.log(`Server is running on port :${port}`);

})