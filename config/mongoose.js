const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/HabitTracker_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//acquire the connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// once the connection is established
db.once("open", function () {
    console.log("Connected to Database :: MongoDB - HabitTraker_db");
});

module.exports = db;

