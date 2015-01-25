var express = require('express');
var router = express.Router();

router.get('tours', function(req, res) {
	res.render("request-group-rate", {
		title: "Request Group Rate - "
	});
});

module.exports = router;