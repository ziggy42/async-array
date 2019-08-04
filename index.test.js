const AsyncArray = require('./index');

test('of', () => {
    expect(AsyncArray.of(1, 2, 3)).toEqual(new AsyncArray(1, 2, 3));
});

test('from', () => {
    expect(AsyncArray.from([1, 2, 3])).toEqual(new AsyncArray(1, 2, 3));
});

test('toArray', () => {
    expect(AsyncArray.of(1, 2, 3)).toEqual([1, 2, 3]);
});

test('asyncEvery', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncEvery((item) => Promise.resolve(item < 4));
    expect(result).toBe(true);
});

test('asyncFilter', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncFilter((item) => Promise.resolve(item % 2 === 0));
    expect(result).toEqual(AsyncArray.of(2));
});

test('asyncFind', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncFind((item) => Promise.resolve(item % 2 === 0));
    expect(result).toBe(2);
});

test('asyncFindIndex', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncFindIndex((item) => Promise.resolve(item % 2 === 0));
    expect(result).toBe(1);
});

test('asyncFlatMap', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncFlatMap((item) => Promise.resolve([item ** 2]));
    expect(result).toEqual(AsyncArray.of(1, 4, 9));
});

test('asyncForEach', async () => {
    const items = [];
    await AsyncArray.of(1, 2, 3).asyncForEach((item) => {
        items.push(item);
        return Promise.resolve();
    });

    expect(items).toEqual([1, 2, 3]);
});

test('asyncMap', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncMap((item) => Promise.resolve(item ** 2));
    expect(result).toEqual(AsyncArray.of(1, 4, 9));
});

test('asyncReduce', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncReduce((acc, item) => Promise.resolve(acc + item));
    expect(result).toBe(6);
});

test('asyncReduceRight', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncReduceRight((acc, item) => Promise.resolve(acc + item));
    expect(result).toBe(6);

});

test('asyncSome', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncSome((item) => Promise.resolve(item === 2));
    expect(result).toBe(true);
});

test('asyncFilterAll', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncFilterAll((item) => Promise.resolve(item % 2 === 0));
    expect(result).toEqual(AsyncArray.of(2));
});

test('asyncMapAll', async () => {
    const result = await AsyncArray.of(1, 2, 3).asyncMapAll((item) => Promise.resolve(item ** 2));
    expect(result).toEqual(AsyncArray.of(1, 4, 9));
});
