var FamilyTree = function(name) {
  this.name = name;
  this.children = [];
};

FamilyTree.prototype.addChild = function(tree) {
  this.children.push(tree);
};

FamilyTree.prototype.find = function(name) {
  var length = this.children.length;

  for (var i = 0; i < length; i++) {
    var child = this.children[i];
    if (child.name === name) {
      return child;
    }

    var childsResult = child.find(name);
    if (childsResult) {
      return childsResult;
    };
  }

  return null;
};