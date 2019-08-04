class AsyncArray extends Array {

    constructor(...elements) {
        super(...elements);
    }

    static of(...elements) {
        if (elements.length === 1 && !isNaN(elements[0])) {
            const asyncArray = new AsyncArray();
            asyncArray.push(elements[0]);
            return asyncArray;
        }

        return new AsyncArray(...elements);
    }

    static from(array) {
        return new AsyncArray(...array);
    }

    toArray() {
        return [...this];
    }

    async asyncEvery(callback) {
        for (let i = 0; i < this.length; i++) {
            const pass = await callback(this[i], i, this);
            if (!pass) {
                return false;
            }
        }

        return true;
    }

    async asyncFilter(callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            const pass = await callback(this[i], i, this);
            if (pass) {
                result.push(this[i]);
            }
        }

        return result;
    }

    async asyncFind(callback) {
        const index = await this.asyncFindIndex(callback);
        return this[index];
    }

    async asyncFindIndex(callback) {
        for (let i = 0; i < this.length; i++) {
            const pass = await callback(this[i], i, this);
            if (pass) {
                return i;
            }
        }

        return undefined;
    }

    async asyncFlatMap(callback) {
        const mapped = await this.asyncMap(callback);
        return mapped.flat(1);
    }

    async asyncForEach(callback) {
        for (let i = 0; i < this.length; i++) {
            await callback(this[i], i, this);
        }
    }

    async asyncMap(callback) {
        const result = new AsyncArray();
        for (let i = 0; i < this.length; i++) {
            const mapped = await callback(this[i], i, this);
            result.push(mapped);
        }
        return result;
    }

    async asyncReduce(callback, initialValue) {
        if (this.length === 0 && !initialValue) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        let accumulator = initialValue || this[0];
        for (let i = initialValue ? 0 : 1; i < this.length; i++) {
            if (this[i] !== undefined) {
                accumulator = await callback(accumulator, this[i], i, this);
            }
        }

        return accumulator;
    }

    async asyncReduceRight(callback, initialValue) {
        if (this.length === 0 && !initialValue) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        let accumulator = initialValue || this[this.length - 1];
        for (let i = initialValue ? this.length - 1 : this.length - 2; i >= 0; i--) {
            if (this[i] !== undefined) {
                accumulator = await callback(accumulator, this[i], i, this);
            }
        }

        return accumulator;
    }

    async asyncSome(callback) {
        const index = await this.findIndex(callback);
        return index !== -1;
    }
}

module.exports = AsyncArray;
