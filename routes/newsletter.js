var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("newsletter", {
		title: "Our Newsletter - ",
		csrf: "CSRF token goes here" // Will learn about csrf later. Dummy val.
	});
});

module.exports = router;