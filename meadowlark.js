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


app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 3000);
app.disable('x-powered-by');

// Public folder 
app.use(express.static(__dirname + "/public"));

// Favicon
app.use(favicon(__dirname + '/public/imgs/favicon.png'));



/**
 * Home Route
 */
app.get('/', function(req, res){
        res.render("index", {
		title: ""
	})
});

/**
 * About Route
 */
app.get('/about', function(req, res) {
    var randomFortune = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
        
    res.render("about", {
		title: "About - ",
		fortune: randomFortune
	});

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
var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
	"Don't find fault. Find a remedy.",
	"Do or do not. There is no try.",
	"Goodness gracious, great balls of fire.",
	"Don't be crazy. Be mentally shifted."
];