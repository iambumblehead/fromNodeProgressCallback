// Filename: fromnodeprogresscallback.js  
// Timestamp: 2016.02.04-16:12:05 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// modelled from the source here:
// https://github.com/Reactive-Extensions/RxJS/blob/master/src/core/linq/observable/fromnodecallback.js

var fromnodeprogresscallback = module.exports = function (rx, func, ctx, selector) {

  typeof ctx === 'undefined' && (ctx = this);
  
  var args = [].slice.call(arguments),
      o = new rx.Subject();

  function handler() {
    var err = arguments[0];
    if (err) return o.onError(err);

    var results = [].slice.call(arguments, 1);

    if (rx.helpers.isFunction(selector)) {
      results = rx.internals.tryCatch(selector).apply(ctx, results);
      if (results === errorObj) { return o.onError(results.e); }
    } else {
      o.onNext(results.length <= 1 ? results[0] : results);
    }

    o.onCompleted();
  }

  function nexthandler() {
    o.onNext.apply(o, [].slice.call(arguments, 0));
  }

  args = args.slice(0, -1);
  args.push(nexthandler);
  args.push(handler);
  
  func.apply(ctx, args);

  return o.asObservable();

};
