// The app file, req = request, res = response

var express    = require("express"),
	app        = express(),
	handlebars = require("express-handlebars").create( {defaultLayout: "main", extname: ".hbs"} ),
	routeHome                  = require('./routes/home'),
	routeAbout                 = require('./routes/about'),
	routeContact               = require('./routes/contact'),
	routeToursHoodRiver        = require('./routes/tours-hood-river'),
	routeToursOregonCoast      = require('./routes/tours-oregon-coast'),
	routeToursRequestGroupRate = require('./routes/request-group-rate');


app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 3000);
app.disable('x-powered-by');


// Public folder and partials
app.use(express.static(__dirname + "/public"));
// handlebars.registerPartials(__dirname + '/views/partials'); // <-- This may fail.


// Show/hide Moca tests
app.use(function(req, res, next) {
	res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
	next();
});


// Routes
app.use('/', routeHome);
app.use('/about', routeAbout);
app.use('/contact', routeContact);
app.use('/tours/hood-river', routeToursHoodRiver);
app.use('/tours/oregon-coast', routeToursOregonCoast);
app.use('/tours/request-group-rate', routeToursRequestGroupRate);


app.use(function(req, res, next) {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});

// Custom 404, note app.use (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render("404", {title: "Whoopsie Daisy! - "});
	console.log(res);
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

