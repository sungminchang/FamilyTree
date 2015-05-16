var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var mandy = new FamilyTree('Mandy');
var nara = new FamilyTree('Nara');
var natalie = new FamilyTree('Natalie');
var oliver = new FamilyTree('Oliver');
var oscar = new FamilyTree('Oscar');

mandy.addChild(natalie);
mandy.addChild(nara);

nara.addChild(oliver);
nara.addChild(oscar);


describe('the family tree data structure', function() {

  describe('basic tree functionality', function() {

    it('should allow you to set the name', function() {
      expect(mandy.name).to.equal('Mandy');
    });

    it('should maintain a collection of children', function() {
      mandy.children.should.be.a('array');
    });

    it('should allow you to add children', function() {
      assert(mandy.children.length === 2, 'added a child');
    });

    it('should let you find a child', function() {
      expect(mandy.find('Nara')).to.equal(nara);
    });

    it('should let you traverse a nodes entire ancestry', function() {
      mandy.find('Oliver').should.equal(oliver);
      expect(mandy.find('Harold')).to.equal(null);
    });

  });

  // describe('it should let you find the grandparent of a node', function() {
  //   expect(mandy.)
  // });

});