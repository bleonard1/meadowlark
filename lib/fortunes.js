// fortunes, sucka
var fofortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
	"Don't find fault. Find a remedy.",
	"Do or do not. There is no try."
];

exports.getFortune = function() {
	var i = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[i];
}