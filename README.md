# async-array
`AsyncArray` is a class that inheriths from `Array` and adds `async` methods with support for `async` callbacks such as 
`asyncForEach`, `asyncMap` etc:

```js
const existing = await AsyncArray.of(1, 2, 3)
    .asyncFilter(async (id) => existsInDatabase(id))
```

## Installation
```bash
npm install async-array
```

## Usage
The constructor of `AsyncArray` behaves exactly like `Array`. From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array):
> A JavaScript array is initialized with the given elements, except in the case where a single argument is passed to the Array constructor and that argument is a number.  
> If the only argument passed to the Array constructor is an integer between 0 and 232-1 (inclusive), this returns a new JavaScript array with its length property set to that number (Note: this implies an array of arrayLength empty slots, not slots with actual undefined values). If the argument is any other number, a RangeError exception is thrown.

```js
const arr1 = new AsyncArray(1, 2, 3) // AsyncArray [ 1, 2, 3 ]

const arr2 = new AsyncArray(3) // AsyncArray [ <3 empty items> ]
```

There are also two static functions to create new `AsyncArray`:
```js
const arr1 = AsyncArray.of(1, 2, 3) // AsyncArray [ 1, 2, 3 ]

const arr2 = AsyncArray.from([1, 2, 3]) // AsyncArray [ 1, 2, 3 ]
```

A regular `Array` can be obtained form an `AsyncArray`:
```js
const arr = AsyncArray.of(1, 2, 3).toArray() // [ 1, 2, 3 ]
``` 

`AsyncArray` adds the following methods:
- `asyncEvery`
- `asyncFilter`
- `asyncFind`
- `asyncFindIndex`
- `asyncFlatMap`
- `asyncForEach`
- `asyncMap`
- `asyncReduce`
- `asyncReduceRight`
- `asyncSome`

These methods behave exactly like the non-async versions but they accept async callbacks.

```js
const existing = await AsyncArray.of('1', '2', '3')
    .asyncFilter(async (id) => existsInDatabase(id))
```

Be aware that the async callbacks are executed in sequence, NOT in parallel.
The following methods allow you to execute the callbacks in parallale instead:
- `asyncFilterAll`
- `asyncMapAll`

```js
const existing = await AsyncArray.of(1, 2, 3)
    .asyncFilterAll(async (id) => existsInDatabase(id))
```
