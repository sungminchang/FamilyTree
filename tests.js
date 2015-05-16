var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;
var mandy = new FamilyTree('Mandy');

describe('the family tree data structure', function() {

  beforeEach(function() {
    mandy.children = [];
  });

  it('should allow you to set the name', function() {
    expect(mandy.name).to.equal('Mandy');
  });

});