# Introduction
This nodejs project serves as an applied reference of the latest ECMAScript module standards.

# ES Modules - Single Instance
Singleton exports are useful for single instance modules without reading and writing to the global space (**window, window.app, etc.**).

An example of a single instance export is demonstated as follows:-

**foo.mjs**
```
class Foo {
    ...
}

export default new Foo()
```

**bar.mjs**
```
import foo from './foo.mjs'

// A single instance of the Foo class is created when the module is loaded
```

**baz.mjs**
```
import foo from './foo.mjs'

// The same foo instance is retrieved from cache
```
