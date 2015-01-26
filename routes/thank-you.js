var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("thank-you", {
		title: "Thank You! - "
	});
});

module.exports = router;