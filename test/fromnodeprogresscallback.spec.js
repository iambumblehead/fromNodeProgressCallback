// Filename: fromnodeprogresscallback.spec.js  
// Timestamp: 2016.02.04-14:52:51 (last modified)
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
          completefn(progresscount);
        }
      }(5));
    }).subscribe(
      function onnext (x) {
        console.log('on progress', x);
        ++progresscalls;
      },
      function onerror (e) {
        progresscalls = -5;
      },
      function oncomplete ()  {
        expect(progresscalls).toBe(5);
        done();
      }
    );
  });
  
});
