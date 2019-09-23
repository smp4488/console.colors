import Debug from './debug.js';
import Test from './test';

const express = require('express');
const app = express();
const port = 3000;
const debug = new Debug('index.js');
const test = new Test('test');

test.test('test2');

debug.log('test js', {test:'test'}, ['blah', 'boom', 'baz'], debug);
debug.warn('this is a js console warning in the server');
debug.error('this is a js console error in the server');
debug.info('this is a js console info in the server');

app.get('/', (req, res) => {
    debug.log(req.query);
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('./'))

app.listen(port, () => {
    debug.log(`Example app listening on port ${port}!`);
})