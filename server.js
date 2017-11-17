var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [];
var waitlist = [];

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

app.get("/api/waitlist", function(req, res) {
	res.json(waitlist);
});

// Gets input from user for a new reservation and pushes it to the reservations array
app.post("/new", function(req, res) {
	var newReservation = req.body;
	var ReservationName = newReservation.name;
	if (reservations.length < 5) {
		reservations.push(newReservation);
		console.log("Made a reservation");
	} else {
		waitlist.push(newReservation);
		console.log("On the waitlist");
	};
	res.json(newReservation);
});

app.post("/delete", function(req, res) {
	reservations.shift();
	if (waitlist.length > 0) {
		reservations.push(waitlist[0]);
		waitlist.shift();
	};
});


// App listening on a specific port
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});