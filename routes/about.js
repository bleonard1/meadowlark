var express = require('express');
var router = express.Router();
var fortune = require("../lib/fortunes.js"); 

router.get('/', function (req, res) {
	res.render("about", {
		title: "About Us - ",
		fortune: fortune.getFortune(),
		pageTestScript: "/qa/tests-about.js"
	});
});

module.exports = router;