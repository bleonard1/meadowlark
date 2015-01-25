// The app file, req = request, res = response

var express    = require("express"),
	app        = express(),
	handlebars = require("express-handlebars").create( {
		defaultLayout: "main", 
		extname: "hbs",
		helpers: {
			section: function(name, options) {
				if (!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	} ),
	routeHome                  = require("./routes/index"),
	routeTest                  = require("./routes/test"),
	routeAbout                 = require("./routes/about"),
	routeContact               = require("./routes/contact"),
	routeTours                 = require("./routes/tours/index"),
	routeNurseryRhymes 		   = require("./routes/nursery-rhymes");


app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 3000);
app.disable('x-powered-by');


// Public folder 
app.use(express.static(__dirname + "/public"));
// handlebars.registerPartials(__dirname + '/views/partials'); // <-- This may fail.
 

// Show/hide Moca tests
app.use(function(req, res, next) {
	res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
	next();
});

// Weather widget
app.use(function(req, res, next) {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});


// Routes
app.use('/', routeHome);
app.use('/test', routeTest);
app.use('/about', routeAbout);
app.use('/contact', routeContact);
app.use('/tours', routeTours); //combine into a single tours route with the specifc tour
app.use('/tours/hood-river', routeTours); 
app.use('/tours/oregon-coast', routeTours); 
app.use('/tours/request-group-rate', routeTours); 
app.use('/nursery-rhymes', routeNurseryRhymes);


app.get('/data/nursery-rhymes', function(req, res){ //Look to adjust pathing. /data/data/nursery-rhymes (or whatever the issue is)
	res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
	});
});


// Custom 404, note app.use (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render("404", {title: "Whoopsie Daisy! - "});
	// console.log('response: ', res);
});


// Custom 500 (middleware)
app.use(function(err, req, res, next) {
	res.status(500);
	res.render("500", {
		message: err.message,
		error: err
	});
});


app.listen(app.get("port"), function() {
	console.log("Express started on localhost:" + app.get("port") + ".");
});



function getWeatherData() {
	return {
		locations: [
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)',
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)',
			},
		],
	};
};


module.exports = app;

