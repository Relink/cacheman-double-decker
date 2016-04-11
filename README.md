# cacheman-double-decker

Because you have a slow cache and big files, but you want a fast cache ontop to check if things exist first. So you want a cache ontop of your cache, and you want to cacheman the whole business. This is your library.

```
const DoubleDecker = require('cacheman-double-decker');
const one = makeRedisEngineOrSomethingFast();
const two = makeFileEnginerOrSomethingSlow();
const doubleupsteez = new DoubleDecker(one, two);

// Now give doubleupsteez as the engine to your cacheman cache.
```
