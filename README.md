# compile-hook [![Build Status](https://travis-ci.org/vdeturckheim/compile-hook.svg?branch=master)](https://travis-ci.org/vdeturckheim/compile-hook)
a tiny, dummy way to add a hook to the Module.prototype._compile method

#Install

```shell
$ npm i -S compile-hook
```

#Usage

```js
const CompileHook = require('compile-hook');

// place the hook:
CompileHook.placeHook((content, filename, done) => {

    console.log(filename);
    done();
});

// remove the hook
CompileHook.removeHook();

// Place a hook that changes the code on the fly:
CompileHook.placeHook((content, filename, done) => {

    done(content.replace(1492, 622));
});
```

#GOTCHA

A module that has already been required once will not be hooked again because of the require's cache.

It is possible to remove a module from the cache (remove key in `require.cache`) and then require it again.

#LICENSE

MIT, see LICENSE file.

