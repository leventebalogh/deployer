module.exports = function steps() {
    this.When('I visit the url "$url"', (url, done) => {
        browser
            .url(url)
            .call(done);
    });

    this.Then('I should see that the title is "$title"', (title) => {
        expect(browser.getTitle()).to.equal(title);
    });
};
