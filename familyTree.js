var FamilyTree = function(name) {
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
};

FamilyTree.prototype.traverse = function(cb, root) {
  if (root === undefined) {
    root = true;
  }

  if (root) {
    root = false;
    cb(this);
  }

  if (this.children) {
    this.children.forEach(function(child, i, arr) {
      cb(child, i, arr);
      
      child.traverse(cb, root);
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

  result.push(this.name);

  this.traverse(function(child, i, arr) {
    if (child.children.length === 1) {
      result.push(child.children[0].name);
    }
  });

  return result;
  // if (this)
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