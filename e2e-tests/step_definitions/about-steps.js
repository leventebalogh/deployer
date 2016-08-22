module.exports = steps;

function steps() {
    this.Then('I should see "$text" in the content', (text) => {
        expect(browser.getText('.about > p')).to.contain(text);
    });
}
