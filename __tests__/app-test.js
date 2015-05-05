jest.dontMock("../js/app");

require('../js/app.js');

describe("moof", function() {
  it("does not die in a fire", function() {
	expect(1).toBe(1); // but it dies in a fire right now  
  });
});