import Debug from './debug.js';

const debug = new Debug('Test');

export default class Test {
    constructor(name) {
        debug.log(name);
        this.name = name;
    }

    test (x) {
        debug.log(x);
    }
}