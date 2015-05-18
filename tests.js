var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;

var tree = new FamilyTree();

var mandy = new FamilyTree('Mandy');
var nara = new FamilyTree('Nara');
var natalie = new FamilyTree('Natalie');
var oliver = new FamilyTree('Oliver');
var oscar = new FamilyTree('Oscar');
var patrick = new FamilyTree('Patrick');
var robert = new FamilyTree('Robert');
var roger = new FamilyTree('Roger');
var rick = new FamilyTree('Rick');
var raymond = new FamilyTree('Raymond');
var ridley = new FamilyTree('Ridley');


tree.addChild(mandy);

mandy.addChild(natalie);
mandy.addChild(nara);

natalie.addChild(patrick);

nara.addChild(oliver);
nara.addChild(oscar);

patrick.addChild(robert);
patrick.addChild(roger);
patrick.addChild(rick);
patrick.addChild(raymond);

roger.addChild(ridley);


describe('the family tree data structure', function() {

  describe('basic tree functionality', function() {

    it('should allow you to set the name', function() {
      expect(mandy.children[0].name).to.equal('Natalie');
    });

    it('should maintain a collection of children', function() {
      mandy.children.should.be.a('array');
    });

    it('should allow you to add children', function() {
      expect(mandy.children.length).to.equal(2);
    });

    it('should let you find a child', function() {
      expect(mandy.find('Nara')).to.equal('Nara');
    });

    it('should let you find a child', function() {
      expect(mandy.find('Mandy')).to.equal('Mandy');
    });

    it('should stop searching the tree once a person has been found', function() {
      var result = [];
      var identity = function(a) {result.push(a.name)};
      mandy.traverse(function(node) {
        identity(node);
        if(node.name === 'Roger') {
          return true;
        }
        return false;
      });

      console.log(result)
      expect(result.length).to.equal(5);
      expect(mandy.find('Roger')).to.equal('Roger');
      
    });

    it('should let you traverse a nodes entire progeny', function() {
      var result = [];
      var identity = function(a) {result.push(a.name)};
      mandy.traverse(function(node) {identity(node)});
      expect(result.length).to.equal(11);

      expect(mandy.find('Oliver')).to.equal('Oliver');
      expect(mandy.find('Harold')).to.equal(undefined);
    });

  });

  describe('extra functionality', function() { 

    it('should let you find people with no siblings', function() {
      assert.deepEqual(mandy.findLoneChildren(), ['Mandy', 'Patrick', 'Ridley']);
    });

    it('should let you find people with no children', function() {
      assert.deepEqual(mandy.findChildlessPeople(), ['Robert', 'Ridley', 'Rick', 'Raymond', 'Oliver', 'Oscar']);
    });

    it('should let you find people with no children when there is only one member in the whole family', function() {
      var familyOfOne = new FamilyTree('Highlander');
      assert.deepEqual(familyOfOne.findChildlessPeople(), ['Highlander']);
    });

    it('should let you find the person with the most number of grandchildren', function() {
      expect(mandy.findBusiestGrandparent()).to.equal('Natalie');
    });

  });

  describe('finding person\'s grandparent', function() {

    it('should let you find a person\'s grandparent', function() {
      expect(mandy.findGrandparent('Patrick')).to.equal('Mandy');
    });
    
    it('should let you find a person\'s grandparent', function() {
      expect(mandy.findGrandparent('Ridley')).to.equal('Patrick');
    });
    
    it('should let you find a person\'s grandparent', function() {
      expect(mandy.findGrandparent('Rick')).to.equal('Natalie');
    });
    
    it('should let you find a person\'s grandparent', function() {
      expect(mandy.findGrandparent('Oscar')).to.equal('Mandy');
    });

    it('should return undefined if a person doesn\'t have a grandparent', function() {
      expect(mandy.findGrandparent('Natalie')).to.equal(undefined);
    });

    it('should return undefined if a person doesn\'t have a grandparent', function() {
      expect(mandy.findGrandparent('Mandy')).to.equal(undefined);
    });

  });

});