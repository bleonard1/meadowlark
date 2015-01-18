// The app file

var express    = require("express");
var app        = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main", extname: ".hbs"});
var fortune    = require("./lib/fortune.js") // ./ so Node doesn't look in node_modules

// app.engine("hbs", handlebars.engine);
app.engine('.hbs', handlebars.engine);
app.set("view engine", ".hbs");
app.set("port", process.env.PORT || 3000);

// Public folder
app.use(express.static(__dirname + "/public"));

//Home, note app.get
app.get("/", function(req, res) {
	res.render("home", {title: "Home - "});
});

// About
app.get("/about", function(req, res) {
	res.render("about", {title: "About - ", fortune: fortune.getFortune() });
});

// Custom 404, note app.use (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render("404", {title: "Whoopsie Daisy! - "});
});

// Custom 500 (middleware)
app.use(function(err, req, res, next) {
	console.log(err.atack);
	res.status(500);
	res.render("500")
});

app.listen(app.get("port"), function() {
	console.log("Express started on localhost:" + app.get("port") + " press Ctrl_C to exit.");
});


var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
	"Don't find fault. Find a remedy.",
	"Do or do not. There is no try."
];