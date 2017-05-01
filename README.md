# node-cache-manager-memory-store

ES6 is required.

Simple in-memory store for [node-cache-manager](https://github.com/BryanDonovan/node-cache-manager). Mainly used for unit testing purposes.

Does not do anything special other than maintain an in-memory object, getting and setting values to it.

TTL is not supported. Tests contain TTL but it's to only make sure the cache manager interface is implemented correctly.

## Install

`npm i cache-manager-memory-store --save`

## Using this store

```
import MemoryStore from 'cache-manager-memory-store'
import cacheManager from 'cache-manager'

let memoryCache = cacheManager.caching({
    store: MemoryStore
})
```

Run tests with:

`npm run test`
