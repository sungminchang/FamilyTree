var FamilyTree = function(name) {
  this.parent;
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
  tree.parent = this;
};

FamilyTree.prototype.traverse = function(cb) {
  cb(this)  

  if (this.children) {
    this.children.forEach(function(child, i, arr) {
      child.traverse(cb);
    });
  } else {
    return null;
  }
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

FamilyTree.prototype.findBusiestGrandparent = function() {
  var busiest = this;
  var mostGrandChildrenYet = this.children.length;
  // var currentGrandChildren = 0;

  var countGrandchildren = function(node) {
    var result = 0;

    node.children.forEach(function(child, i, arr) {
      if (child.children.length > 0) {
        child.children.forEach(function(grandChild, i, arr) {
          result++;
        });
      }
    });

    return result;
  };

  this.traverse(function(child, i, arr) {
    var currCount = countGrandchildren(child);
    if (currCount > mostGrandChildrenYet) {
      busiest = child;
      mostGrandChildrenYet = currCount;
    };
  });

  return busiest.name;
};


FamilyTree.prototype.findGrandparent = function(grandchild) {
  var result;
  this.traverse(function(child, i, arr) {
    if (child.name === grandchild) {
      var grandparent = child.parent.parent;
      if (grandparent && grandparent.hasOwnProperty('name')) {
        result = grandparent.name
      }
      return;
    }
  });

  if (!result) {
    return 'Grandparent not found';
  } else {
    return result;
  }
};