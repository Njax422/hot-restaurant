var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [];

// Gives the user specific routes
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/api/table", function(req, res) {
	res.json(reservations);
});

// Gets input from user for a new reservation and pushes it to the reservations array
app.post("/new", function(req, res) {
	var newReservation = req.body;
	console.log(newReservation);
	var ReservationName = newReservation.name;
	reservations.push(newReservation);
	res.json(newReservation);
});


// App listening on a specific port
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});