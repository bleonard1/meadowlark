var express = require('express');
var router = express.Router();
var thing = require("thing")
router.get('/', function(req, res) {
	res.render("newsletter", {
		title: "Our Newsletter - ",
		csrf: "CSRF token goes here" // Will learn about csrf later. Dummy val.
	});
});


module.exports = router;

lipsum	
this is a new bit of text
html
tags
html
paragraph
Mixed words
some other stuff
html