var FamilyTree = function(name) {
  if (name === undefined) {
    this.root = true;
  }
  this.parent;
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
  tree.parent = this;
};

FamilyTree.prototype.traverse = function(cb) {
  if (!this.root) {
    cb(this)  
  }

  if (this.children) {
    this.children.forEach(function(child, i, arr) {
      child.traverse(cb);
    });
  } else {
    return null;
  }
};

FamilyTree.prototype.find = function(name) {
  var result = [];

  this.traverse(function(node) {
    if (node.name === name) {
      result = node.name;
      return;
    }
  });

  if (result.length) {
    return result
  }

  return null;
};

FamilyTree.prototype.findLoneChildren = function() {
  var result = [];

  if (this.children.length === 1) {
    result.push(this.children[0].name);
  }

  this.traverse(function(child, i, arr) {
    if (child.children.length === 1) {
      result.push(child.children[0].name);
    }
  });

  return result;
};

FamilyTree.prototype.findChildlessPeople = function() {
  var result = [];

  if (this.children.length === 0) {
    result.push(this.name);
  }

  this.traverse(function(child, i, arr) {
    if (child.children.length === 0) {
      result.push(child.name);
    }
  });

  return result;
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