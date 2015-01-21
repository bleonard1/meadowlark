var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("tours/hood-river", {
		title: "Hood River Tour - "
	});
});

module.exports = router;