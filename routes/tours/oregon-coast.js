var express = require('express');
var router = express.Router();

router.get('tours', function(req, res) {
	res.render("oregon-coast", {
		title: "Oregon Coast Tour - "
	});
});

module.exports = router;