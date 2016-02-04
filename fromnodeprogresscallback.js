// Filename: fromnodeprogresscallback.js  
// Timestamp: 2016.02.04-15:19:00 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// modelled from the source here:
// https://github.com/Reactive-Extensions/RxJS/blob/master/src/core/linq/observable/fromnodecallback.js

var fromnodeprogresscallback = module.exports = function (rx, func, ctx, selector) {

  typeof ctx === 'undefined' && (ctx = this);
  
  var len = arguments.length, args = new Array(len);
  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

  var o = new rx.AsyncSubject();

  function handler() {
    var err = arguments[0];
    if (err) { return o.onError(err); }

    var results = [].slice.call(arguments, 1);

    if (rx.helpers.isFunction(selector)) {
      results = rx.internals.tryCatch(selector).apply(ctx, results);
      if (results === errorObj) { return o.onError(results.e); }
    }

    o.onCompleted();
  }

  function nexthandler() {
    console.log('next handler', o.onNext.toString(), o.isStopped);
    o.onNext.apply(o, [].slice.call(arguments, 0));
  }

  args = args.slice(0, -1);
  args.push(nexthandler);
  args.push(handler);
  
  func.apply(ctx, args);

  return o.asObservable();

};
