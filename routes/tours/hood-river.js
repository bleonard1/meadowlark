var express = require('express');
var router = express.Router();

router.get('tours', function(req, res) {
	res.render("hood-river", {
		title: "Hood River Tour - "
	});
});

module.exports = router;