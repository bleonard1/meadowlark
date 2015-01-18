suite("About Page Tests", function() {
	test("Page should contain a link to the contact page.", function() {
		assert($('a[href="/contact"]').length);
	});
});