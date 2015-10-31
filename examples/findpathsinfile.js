var jsonpathfinder = require('jsonpathfinder');

var obj = require(process.argv[2]);

// Output only the leaves of the tree
jsonpathfinder.findpaths(obj).filter(function (entry) {
    return entry[1];
}).forEach(function (entry) {
    console.log(entry[0] + ' ' + entry[2]);
});



