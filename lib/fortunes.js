// fortunes, sucka

var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
	"Don't find fault. Find a remedy.",
	"Do or do not. There is no try.",
	"Goodness gracious, great balls of fire.",
	"Don't be crazy. Be mentally shifted."
];

exports.getFortune = function() {
	var i = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[i];
};