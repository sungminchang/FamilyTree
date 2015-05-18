var FamilyTree = function(name) {
  this.name = name;
  this.children = [];
};

/////////// Basic Tree Functionality ///////////////

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
};

FamilyTree.prototype.traverse = function(cb, i, arr) {
  var result = cb(this, i, arr);  
  if (result) { return result; }

  var found = this.children.some(function(child, i, arr) {
    var childResult = child.traverse(cb, i, arr);
    return childResult;
  });

  if (found) { return found; }
  
  return result;
};

FamilyTree.prototype.reduce = function(iterator, init) {
  if (init === undefined) { init = iterator(this.children[0], 0, this.children); }

  this.traverse(function(child, i, arr) {
    init = iterator(init, child, i, arr);
  });

  return init;
};
 
FamilyTree.prototype.find = function(name) {
  var result;

  this.traverse(function(child, i, arr) {
    if (child.name === name) {
      result = child.name;
      return true;
    }    
    return false;
  });

  return result;
};


/////////// Extra Functionality ////////////////////

FamilyTree.prototype.findLoneChildren = function() {
  return this.reduce(function(result, curr, i, arr) {
    if (curr.children.length === 1) {
      result.push(curr.children[0].name);
    }
    return result;
  }, [this.name]);
};

FamilyTree.prototype.findChildlessPeople = function() {
  return this.reduce(function(result, curr, i, arr) {
    if (curr.children.length === 0) {
      result.push(curr.name);
    }
    return result;
  }, []);
};

FamilyTree.prototype.countGrandchildren = function() {
  var result = 0;
  var length = this.children.length;

  for (var i = 0; i < length; i++) {
    var child = this.children[i];
    if (child.children.length > 0) {
      result = child.children.length;
    }
  }

  return result;
};

FamilyTree.prototype.findBusiestGrandparent = function() {
  var busiest = this;
  var mostGrandChildrenYet = this.children.length;

  this.traverse(function(child, i, arr) {
    var currCount = child.countGrandchildren();
    if (currCount > mostGrandChildrenYet) {
      busiest = child;
      mostGrandChildrenYet = currCount;
    };
  });

  return busiest.name;
};

FamilyTree.prototype.findGrandparent = function(grandchild, ancestors) {
  if (ancestors === undefined) { ancestors = []; }

  if (this.name === grandchild) { return ancestors[1]; }

  var length = this.children.length;
  
  if (!length) { return; }

  if (ancestors.length > 1) { 
    var grandparent = ancestors.pop(); 
  }

  ancestors.unshift(this.name);

  for (var i = 0; i < length; i++) {
    var child = this.children[i];
    var childResult = child.findGrandparent(grandchild, ancestors);
    if (childResult) {
      return childResult;
    }
  }

  ancestors.shift();
  ancestors.push(grandparent);
};