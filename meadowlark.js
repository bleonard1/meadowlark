var express       = require("express");
var app           = express();
var connect       = require("connect");
var favicon       = require("serve-favicon");
var handlebars    = require("express-handlebars").create( {
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
var fortune       = require("./lib/fortunes.js");
var copyrightYear = new Date().getFullYear();
var credentials   = require("./credentials");
var nodemailer    = require("nodemailer");

// var mailTransport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: credentials.gmail.user,
// 		pass: credentials.gmail.password
//     }
// });

// var mailOptions = {
// 	from: 'Meadowlark Travel <info@meadowlarktravel.com>', // sender address
//     to: 'email-recipient@dot.com' // list of receivers
//     subject: 'Your Meadowlark Travel Tour', // Subject line
//     text: 'Thank you againg for booking with us! Your doodad is going to be so awesome. We will take care of you!', // plaintext body
//     html: '<b>Here is the HTML version!</b><p>Thank you againg for booking with us! Your doodad is going to be so awesome. We will take care of you!</p>' // html body
// };

// // send mail with defined mailTransport object
// mailTransport.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Message sent: ' + info.response);
//     }
// });

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

// Get that session started right.
app.use(require("cookie-parser")(credentials.cookieSecret));
app.use(require("express-session")());

// req.session.userName = "Anonymous";
// var colorScheme = req.session.colorScheme || 'dark';

// Show/hide Moca tests
app.use(function (req, res, next) {
	res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
	next();
});

// Body parser for form field fun
app.use( require("body-parser")() );

// Flash msgs
app.use(function (req, res, next) {
	// if there's a flash msg, transfer it to the contet, then clear
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
})

/**
 * Request headers test route
 */
app.get('/headers', function (req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	req.headers['x-myHeader'] = "mine-mine-mine",
	req.headers['x-remoteIP'] = req.ip;
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

//Todo: 


/**
 * Home Route
 */
app.get("/", function (req, res){

	res.render("index", {
		title: "",
		copyrightYear: copyrightYear
	});
	// makemail();


});

app.get("/thank-you", function (req, res){
	res.render("thank-you", {
		title: "Thanks - ",
		copyrightYear: copyrightYear
	})
});

/**
 * About Route
 */
app.get("/about", function (req, res) {
	res.render("about", {
		title: "About - ",
		copyrightYear: copyrightYear,
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

/**
 * Newsletter Route
 */
app.get("/newsletter", function (req, res) {
	res.render("newsletter", {
		title: "Newsletter - ",
		csrf: "CSRF token goes here!"
	});
});

	// app.post("/newsletter", function (req, res) {
	// 	var name = req.body.name || "";
	// 	var email = req.body.email || "";

	// 	req.session.flash = {
	// 		type: "danger",
	// 		intro: "Validation error!",
	// 		message:"The email address is invalid. Fix it, mang."
	// 	};

	// 	return res.redirect(303, '/newsletter');

	// 	//input validation
	// 	// if (!email.match(VALID_EMAIL_REGEX)) {
	// 	// 	if (req.xhr) return res.json({error: "Invalid email."});

	// 	// 	req.session.flash = {
	// 	// 		type: "danger",
	// 	// 		intro: "Validation error!",
	// 	// 		message:"The email address is invalid. Fix it, mang."
	// 	// 	};

	// 	// 	return res.redirect(3030, "/newsletter/archive")
	// 	// }

	// 	// new NewsletterSignup({ name: name, email: email }).save(function(err){
 //  //       if(err) {
 //  //           if(req.xhr) return res.json({ error: 'Database error.' });
 //  //           req.session.flash = {
 //  //               type: 'danger',
 //  //               intro: 'Database error!',
 //  //               message: 'There was a database error; please try again later.',
 //  //           }
 //  //           return res.redirect(303, '/newsletter/archive');
 //  //       }
 //  //       if(req.xhr) return res.json({ success: true });
 //  //       req.session.flash = {
 //  //           type: 'success',
 //  //           intro: 'Thank you!',
 //  //           message: 'You have now been signed up for the newsletter.',
 //  //       };
 //  //       return res.redirect(303, '/newsletter/archive');
	//  //    });

	// });

	// app.post("/process", function (req, res) {
	// 	// This would work if client-side js weren't being used on newsletter
	// 	// console.log('qs: ', req.query.form); 
	// 	// console.log("CSRF: ", req.body._csrf); //body-parser makes req.body avail
	// 	// console.log('Name (from visible form field): ' + req.body.name);
	// 	// console.log('Email (from visible form field): ' + req.body.email);
	// 	// res.redirect(303, '/thank-you');

	// 	if(req.xhr || req.accepts('json,html') === 'json'){
	// 		// if there were an error, we would send { error: 'error description' }
	// 		res.send({ success: true });
	// 	} else {
	// 		// if there were an error, we would redirect to an error page
	// 		res.redirect(303, '/thank-you');
	// 	}
	// });


/**
 * Tours - Hood River
 */
app.get('/tours/hood-river', function (req, res){
	res.render('tours/hood-river', {
		title: "Tours - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Tours - Oregon Coast
 */
app.get('/tours/oregon-coast', function (req, res){
	res.render('tours/oregon-coast', {
		title: "Tours - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Tours - Group Rate Request
 */
app.get('/tours/request-group-rate', function (req, res){
	res.render('tours/request-group-rate', {
		title: "Group Rate - ",
		copyrightYear: copyrightYear,
	});
});

/**
 * Nursery Rhyme
 */
app.get('/nursery-rhymes', function (req, res){
	res.render('nursery-rhymes', {
		title: "Nursery Rhymes, Sucka - ",
		copyrightYear: copyrightYear,
	});
});
app.get('/data/nursery-rhymes', function (req, res){
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
		copyrightYear: copyrightYear,
		err: err,
		errStack: err.stack
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
