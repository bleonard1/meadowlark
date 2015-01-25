var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("nursery-rhymes", {
		title: "Nursery Rhymes, Sucka - "
	});
});

// router.get('data/nursery-rhymes', function(req, res){
// 	console.log(req, "\n-----------\n", res);
// 	res.json({
// 		animal: 'squirrel',
// 		bodyPart: 'tail',
// 		adjective: 'bushy',
// 		noun: 'heck'
// 	});
// });

module.exports = router;