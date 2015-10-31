var traverse = require('traverse');

function findpath(obj) {
    var paths = [];
    traverse(obj).forEach(function (node) {
        if (this.path.length > 0) {
            var newPath = '$' + this.path.reduce(function(a, n) {
                return a + '.' + n;
            }, '');

            paths.push([newPath, this.isLeaf, node]);
        }
    });

    return paths;
}

exports.findpath = findpath;

