var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var mandy = new FamilyTree('Mandy');
var nara = new FamilyTree('Nara');
var natalie = new FamilyTree('Natalie');
var oliver = new FamilyTree('Oliver');
var oscar = new FamilyTree('Oscar');
var patrick = new FamilyTree('Patrick');
var robert = new FamilyTree('Robert');
var roger = new FamilyTree('Roger');
var ridley = new FamilyTree('Ridley');



mandy.addChild(natalie);
mandy.addChild(nara);

natalie.addChild(patrick);

nara.addChild(oliver);
nara.addChild(oscar);

patrick.addChild(robert);
patrick.addChild(roger);

roger.addChild(ridley);

describe('the family tree data structure', function() {

  describe('basic tree functionality', function() {

    it('should allow you to set the name', function() {
      expect(mandy.name).to.equal('Mandy');
    });

    it('should maintain a collection of children', function() {
      mandy.children.should.be.a('array');
    });

    it('should allow you to add children', function() {
      assert(mandy.children.length === 2, 'added two children');
    });

    it('should let you find a child', function() {
      expect(mandy.find('Nara')).to.equal('Nara');
    });

    it('should let you traverse a nodes entire progeny', function() {
      var result = [];
      var identity = function(a) {result.push(a.name)};
      mandy.traverse(function(node) {identity(node)});
      expect(result.length).to.equal(9);

      expect(mandy.find('Oliver')).to.equal('Oliver');
      expect(mandy.find('Harold')).to.equal(null);
    });

  });

  describe('extra functionality', function() { 
    it('should let you find people with no siblings', function() {
      assert.deepEqual(mandy.findLoneChildren(), ['Mandy', 'Patrick', 'Ridley']);
    });

    it('should let you find people with no children', function() {
      assert.deepEqual(mandy.findChildlessPeople(), ['Robert', 'Ridley', 'Oliver', 'Oscar']);
    });

  });

});