var express = require("express");
var app = express();
var favicon = require("serve-favicon");
var handlebars = require("express-handlebars").create( {
		defaultLayout: "main", 
		extname: "hbs",
		helpers: {
			section: function(name, options) {
				if (!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	} );
var fortune = require("./lib/fortunes.js");

// Handlebars
app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");

// Port and disable powered by header
app.set("port", process.env.PORT || 3000);
app.disable('x-powered-by');

// Expose public folder 
app.use(express.static(__dirname + "/public"));

// Favicon
app.use(favicon(__dirname + '/public/imgs/favicon.png'));

// Show/hide Moca tests
app.use(function(req, res, next) {
	res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
	next();
});



/**
 * Home Route
 */
app.get("/", function(req, res){
        res.render("index", {
		title: ""
	})
});

/**
 * About Route
 */
app.get("/about", function(req, res) {
    res.render("about", {
		title: "About - ",
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});

});


/**
 * Tours - Hood River
 */
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

/**
 * Tours - Group Rate Request
 */
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

/**
 * Custom 404
 */
app.use(function (req, res) {
	res.status(404);
	res.render("404")
});

/**
 * Custom 500
 */
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render("500");
});

/**
 * Make server go
 */
app.listen( app.get("port"), function() {
	// Fire it up, man!
	console.log("Fire it up, man!");
});

/**
 * Shite
 */
