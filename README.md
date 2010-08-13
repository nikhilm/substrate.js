Substrate.js
============

This is an implementation of [Substrate](http://complexification.net/gallery/machines/substrate/)
done for the [js1k](http://www.js1k.com) contest.

The code is inspired by the screensaver by [Kimmo Kulovesi](http://www.cs.helsinki.fi/u/kkuloves/downloads.shtml).
But it lacks features such as circular cracks and advanced configuration to get it to fit.

Code is below 1k when minified using Google's [Closure Compiler](http://closure-compiler.appspot.com)
After compilation remember to fix the first line where Closure will replace document.body.children with document.body.f.
