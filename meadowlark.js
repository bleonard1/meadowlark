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
var copyrightYear = new Date().getFullYear();

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
 * Request headers test route
 */
app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	req.headers['x-myHeader'] = "mine-mine-mine",
	req.headers['x-remoteIP'] = req.ip;
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

//Todo: start at “Form Handling with Express”


/**
 * Home Route
 */
app.get("/", function(req, res){
        res.render("index", {
		title: "",
		copyrightYear: copyrightYear
	})
});

/**
 * About Route
 */
app.get("/about", function(req, res) {
    res.render("about", {
		title: "About - ",
		copyrightYear: copyrightYear,
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});

});


/**
 * Tours - Hood River
 */
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river', {
		title: "Tours - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Tours - Oregon Coast
 */
app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast', {
		title: "Tours - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Tours - Group Rate Request
 */
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate', {
		title: "Group Rate - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Nursery Rhyme
 */
app.get('/nursery-rhymes', function(req, res){
        res.render('nursery-rhymes', {
		title: "Nursery Rhymes, Sucka - ",
		copyrightYear: copyrightYear,
	});
});
app.get('/data/nursery-rhymes', function(req, res){
        res.json({
                animal: 'squirrel',
                bodyPart: 'tail',
                adjective: 'bushy',
                noun: 'heck',
        });
});

/**
 * Custom 404
 */
app.use(function (req, res) {
	res.status(404);
	res.render("404", {
		title: "Whoops - ",
		copyrightYear: copyrightYear
	});
});

/**
 * Custom 500
 */
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render("500", {
		title: "Whoops - ",
		copyrightYear: copyrightYear
	});
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
