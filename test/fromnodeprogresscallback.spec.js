// Filename: fromnodeprogresscallback.spec.js  
// Timestamp: 2016.02.04-16:08:48 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var fromnodeprogresscallback = require('../'),
    rx = require('rx');


describe("fromnodeprogresscallback", function () {

  it("should have a single test", function (done) {
    var progresscalls = 0;

    fromnodeprogresscallback(rx, function (opts, progressfn, completefn) {
      (function next (progresscount) {
        if (progresscount) {
          setTimeout(function () {
            progressfn(progresscount);
            next(--progresscount);
          }, 500);
        } else {
          completefn(null, 'finished');
        }
      }(5));
    }).subscribe(
      function onnext (x) {
        console.log('on next', x);
        ++progresscalls;
      },
      function onerror (e) {
        console.log('on error');
        progresscalls = -5;
      },
      function oncomplete (result)  {
        console.log('on complete', result);
        expect(progresscalls).toBe(5);
        done();
      }
    );
  });
  
});
