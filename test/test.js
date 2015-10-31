var jsonpathfinder = require('../index.js');
var should = require('should');
var jsonpath = require('jsonpath');

describe('jsonpathfinder', function() {
    describe('#findpath', function() {
        it('should return an empty array when given an empty object', 
            function() {
               jsonpathfinder.findpath({}).should.deepEqual([]);
            }
        );
        it('should return an empty array when given an empty array', 
            function() {
                jsonpathfinder.findpath([]).should.deepEqual([]);
            }
        );
        it('should work on a one-level object',
            function() {
                var o = {'a': 'a1', 'b': 'b1'};
                var r = [['$.a', true, 'a1'], ['$.b', true, 'b1']];
                jsonpathfinder.findpath(o).should.deepEqual(r);
            }
        );
        it('should work on a one-level array',
            function() {
                var o = ['a1', 'a2'];
                var r = [['$.0', true, 'a1'], ['$.1', true, 'a2']];
                jsonpathfinder.findpath(o).should.deepEqual(r);
            }
        );
        it('should work on a deeper structure',
            function() {
                var o = {'a': ['a2', {'a3':'a4'}]};
                var r = [['$.a', false, ['a2', {'a3':'a4'}]],
                    ['$.a.0', true, 'a2'],
                    ['$.a.1', false, {'a3': 'a4'}],
                    ['$.a.1.a3', true, 'a4']];
                jsonpathfinder.findpath(o).should.deepEqual(r);
            }
        );
        it('should work on a large structure loaded from a file',
            function() {
                var o = require('./sample.json');
                jsonpathfinder.findpath(o).forEach(function(entry) {
                    // Compare the jsonpath query on the path against
                    // the found object.
                    // jsonpath query returns an array.
                    jsonpath.query(o, entry[0])[0].
                        should.deepEqual(entry[2]);
                });
            }
        );
      });
});
