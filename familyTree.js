var FamilyTree = function(name) {
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
};

FamilyTree.prototype.traverse = function(cb) {
  cb(this)  
  
  this.children.forEach(function(child, i, arr) {
    child.traverse(cb);
  });
};

FamilyTree.prototype.reduce = function(iterator, init) {
  if (init === undefined) {
    init = iterator(this.children[0], 0, this.children);
  }

  this.traverse(function(child, i, arr) {
    init = iterator(init, child, i, arr);
  });

  return init;
};
 
FamilyTree.prototype.find = function(name) {
  return this.reduce(function(result, curr, i, arr) {
    if (curr.name === name) {
      result = curr.name;
    }
    return result;
  }, null);
};

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
      child.children.forEach(function(grandChild, i, arr) {
        result++;
      });
    }
  }

  return result;
};

FamilyTree.prototype.findBusiestGrandparent = function() {
  var busiest = this;
  var mostGrandChildrenYet = this.children.length;

  this.traverse(function(child, i, arr) {
    var currCount = child.countGrandchildren();
    console.log(child.name, currCount)
    if (currCount > mostGrandChildrenYet) {
      busiest = child;
      mostGrandChildrenYet = currCount;
    };
  });

  return busiest.name;
};

FamilyTree.prototype.findGrandparent = function(grandchild, ancestors) {
  if (ancestors === undefined) {
    ancestors = []; // [parent, grandparent];
  }

  if (this.name === grandchild) {
    return ancestors[1];
  }

  var length = this.children.length;
  
  if (!length) {
    return;
  }

  if (ancestors.length > 1) {
    ancestors.pop();
  }

  ancestors.unshift(this.name);

  for (var i = 0; i < length; i++) {
    var child = this.children[i];
    var childResult = child.findGrandparent(grandchild, ancestors);
    if (childResult) {
      return childResult;
    }
  }
};