var fortune = require("../lib/fortunes.js");
var expect = require("chai").expect;

console.log(fortune.getFortune(), typeof 37);

suite("Fortune cooke tests", function() {
	test("getFortune() should return a fortune!", function() {
		expect(typeof 37 === "string");
	});
});