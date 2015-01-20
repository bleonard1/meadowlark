var Browser = require("zombie");
var assert  = require("chai").assert;
var browser;

suite("Cross-page Tests", function() {
	setup(function() {
		browser = new Browser();
	});

	test("Requesting group rate quote from Hood River Tour. Should populate reffer field.", function(done) {
		var ref = "http://localhost:3000/tours/hood-river";
		browser.visit(ref, function() {
			browser.clickLink(".js-requestGroupRate", function() {
				assert(browser.field("referrer").value === ref);
				done();
			});
		});
	});

	test("Requesting group rate quote from Oregon Coast Tour. Should populate reffer field.", function(done) {
		var ref = "http://localhost:3000/tours/oregon-coast";
		browser.visit(ref, function() {
			browser.clickLink(".js-requestGroupRate", function() {
				assert(browser.field("referrer").value === ref);
				done();
			});
		});
	});

	test("Visit group rate pg directly. Reffer field should be empty.", function(done) {
		var ref = "http://localhost:3000/tours/request-group-rate";
		browser.visit(ref, function() {
			assert( browser.field("referrer").value === "" );
			done();
		});
	});




	
});