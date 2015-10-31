var traverse = require('traverse');

function makepath(obj) {
    var paths = [];
    traverse(obj).forEach(function (node) {
        if (this.path.length > 0) {
            var newPaths = '$' + this.path.reduce(function(a, n) {
                return a + '.' + n;
            }, '');

            paths.push(newPaths);
        }
    });

    return paths;
}

exports.makepath = makepath;

