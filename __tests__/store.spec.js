/* global describe, it, expect, beforeAll */

import MemoryStore from '../index'
import cacheManager from 'cache-manager'

let memoryCache = null

beforeAll(function () {
  memoryCache = cacheManager.caching({
    store: MemoryStore
  })
})

describe('set', function () {
  it('should store a value without ttl', function (done) {
    memoryCache.set('foo', 'bar', function (err, ok) {
      expect(err).toBe(null)
      expect(ok).toBe(true)
      done()
    })
  })

  it('should store a value with a specific ttl', function (done) {
    memoryCache.set('foo', 'bar', 30, function (err, ok) {
      expect(err).toBe(null)
      expect(ok).toBe(true)
      done()
    })
  })
})

describe('get', function () {
  it('should retrieve a value for a given key', function (done) {
    let value = 'bar'
    memoryCache.set('foo', value, function () {
      memoryCache.get('foo', function (err, result) {
        expect(err).toBe(null)
        expect(result).toBe(value)
        done()
      })
    })
  })

  it('should retrieve a value for a given key if options provided', function (done) {
    let value = 'bar'
    memoryCache.set('foo', value, function () {
      memoryCache.get('foo', {}, function (err, result) {
        expect(err).toBe(null)
        expect(result).toBe(value)
        done()
      })
    })
  })
})

describe('del', function () {
  it('should delete a value for a given key', function (done) {
    memoryCache.set('foo', 'bar', function () {
      memoryCache.del('foo', function (err) {
        expect(err).toBe(null)
        done()
      })
    })
  })

  it('should delete a value for a given key without callback', function (done) {
    memoryCache.set('foo', 'bar', function () {
      memoryCache.del('foo')
      done()
    })
  })
})

describe('reset', function () {
  it('should flush underlying db', function (done) {
    memoryCache.set('foo', 'bar', function () {
      memoryCache.reset(function (err) {
        expect(err).toBe(null)

        memoryCache.get('foo', function (err, value) {
          expect(err).toBe(null)
          expect(value).toBe(null)
          done()
        })
      })
    })
  })
})

describe('keys', function () {
  it('should get all the keys', function (done) {
    memoryCache.reset(function (err) {
      expect(err).toBe(null)

      memoryCache.set('foo', 'bar', function () {
        memoryCache.keys(function (err, keys) {
          expect(err).toBe(null)
          expect(Object.keys(keys).length).toBe(1)
          done()
        })
      })
    })
  })
})

describe('isCacheableValue', function () {
  it('should return true when the value is not null or undefined', function (done) {
    expect(memoryCache.store.isCacheableValue(0)).toBe(true)
    expect(memoryCache.store.isCacheableValue(100)).toBe(true)
    expect(memoryCache.store.isCacheableValue('')).toBe(true)
    expect(memoryCache.store.isCacheableValue('test')).toBe(true)
    done()
  })

  it('should return false when the value is null or undefined', function (done) {
    expect(memoryCache.store.isCacheableValue(null)).toBe(false)
    expect(memoryCache.store.isCacheableValue(undefined)).toBe(false)
    done()
  })
})

describe('overridable isCacheableValue function', function () {
  let memoryCache2

  beforeAll(function () {
    memoryCache2 = cacheManager.caching({
      store: MemoryStore,
      isCacheableValue: function () { return 'I was overridden' }
    })
  })

  it('should return its return value instead of the built-in function', function (done) {
    expect(memoryCache2.store.isCacheableValue(0)).toBe('I was overridden')
    done()
  })
})
