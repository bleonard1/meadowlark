// The app file, req = request, res = response

var express    = require("express");
var app        = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main", extname: ".hbs"});
var fortune    = require("./lib/fortunes.js"); // ./ so Node doesn't look in node_modules

// app.engine("hbs", handlebars.engine);
app.engine('.hbs', handlebars.engine);
app.set("view engine", ".hbs");
app.set("port", process.env.PORT || 3000);

// Public folder
app.use(express.static(__dirname + "/public"));

// Show/hide Moca tests
app.use(function(req, res, next) {
	res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
	next();
});

// Home, note app.get
app.get("/", function(req, res) {
	res.render("home", {title: "Home - "});
});

// About
app.get("/about", function(req, res) {
	res.render("about", {
		title: "About - ",
		fortune: fortune.getFortune(),
		pageTestScript: "/qa/tests-about.js"
	});
});

// Tours - Hood River
app.get("/tours/hood-river", function(req, res) {
	res.render("tours/hood-river", {
		title: "Hood River Tour - "
	});
});

// Tours - Oregon Coast
app.get("/tours/oregon-coast", function(req, res) {
	res.render("tours/oregon-coast", {
		title: "Oregon Coast Tour - "
	});
});

//Tours - Group Rate Request
app.get("/tours/request-group-rate", function(req, res) {
	res.render("tours/request-group-rate", {
		title: "Group Rate Request - "
	});
});

// Custom 404, note app.use (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render("404", {title: "Whoopsie Daisy! - "});
});

// Custom 500 (middleware)
app.use(function(err, req, res, next) {
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function() {
	console.log("Express started on localhost:" + app.get("port") + " press Ctrl_C to exit.");
});


