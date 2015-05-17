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
      expect(tree.children[0].name).to.equal('Mandy');
    });

    it('should maintain a collection of children', function() {
      tree.children.should.be.a('array');
    });

    it('should allow you to add children', function() {
      expect(tree.children.length).to.equal(1);
    });

    it('should let you find a child', function() {
      expect(tree.find('Nara')).to.equal('Nara');
    });

    it('should let you traverse a nodes entire progeny', function() {
      var result = [];
      var identity = function(a) {result.push(a.name)};
      tree.traverse(function(node) {identity(node)});
      console.log(result);
      expect(result.length).to.equal(11);

      expect(tree.find('Oliver')).to.equal('Oliver');
      expect(tree.find('Harold')).to.equal(null);
    });

  });

  describe('extra functionality', function() { 
    it('should let you find people with no siblings', function() {
      assert.deepEqual(tree.findLoneChildren(), ['Mandy', 'Patrick', 'Ridley']);
    });

    it('should let you find people with no children', function() {
      assert.deepEqual(tree.findChildlessPeople(), ['Robert', 'Ridley', 'Rick', 'Raymond', 'Oliver', 'Oscar']);
    });

    it('should let you find the person with the most number of grandchildren', function() {
      expect(tree.findBusiestGrandparent()).to.equal('Natalie');
    });


  });

  describe('finding person\'s grandparent', function() {
    it('should let you find a person\'s grandparent', function() {
      expect(tree.findGrandparent('Patrick')).to.equal('Mandy');
    });
    
    it('should let you find a person\'s grandparent', function() {
      expect(tree.findGrandparent('Ridley')).to.equal('Patrick');
    });

    it('should send back an error message if a person doesn\'t have a grandparent', function() {
      expect(tree.findGrandparent('Natalie')).to.equal('Grandparent not found');
    });

    it('should send back an error message if a person doesn\'t have a grandparent', function() {
      expect(tree.findGrandparent('Mandy')).to.equal('Grandparent not found');
    });


  });

});