fromNodeProgressCallback
========================
**(c)[Bumblehead][0] 2016**

Converts a Node.js callback style function and progress function to an observable sequence.

The official `rx` library [includes the method][1] `Rx.Observable.fromNodeCallback`, which may be used to convert node.js style callbacks to an observable. `fromnodeprogresscallback` is a modified version of `fromNodeCallback` made to use "progress" functions.

It is made for the purpose in this example --converting an xhr blob request with a progess function.

```javascript
fromnodeprogresscallback(rx, function (ctx, progressfn, fn) {
  var xhr = xdrgo.newRequest(),
      url = opts.url,
      blob;

  xhr.open("GET", url, true);
  xhr.responseType = 'blob';
  xhr.onreadystatechange = xdrgo.constructReadyState(xhr, function (xhr) {
    if (xdrgo.is2xxRe.test(xhr.status)) {
      blob = (window.webkitURL ? webkitURL : URL).createObjectURL(xhr.response);
      fn(null, blob);
    } else {
      fn(xhr);
    }
  });

  xhr.onprogress = progressfn;
  xhr.send();
}).subscribe(
  function (e) { console.log(e.type === 'progress' ? (e.loaded/e.total) * 100 : e); }
);
// => 8
// => 24
// => 38
// => 51
// => 70
// => 89
// => 100
// => blob:http%3A//localhost%3A3000/3bbc0e63-3c6d-48cd-8d84-2443f2ab38a6
```

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/Reactive-Extensions/RxJS/blob/master/src/core/linq/observable/fromnodecallback.js

![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)

(The MIT License)

Copyright (c) 2016 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   
