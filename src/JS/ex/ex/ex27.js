import assert from 'node:assert/strict';

const objs = [{ id: 1 }, { name: 'Hong' }, { addr: 'Seoul', id: 5 }];

const obj = objs.reduce((acc, cur) => ({ ...acc, ...cur }));

assert.deepStrictEqual(obj, { id: 5, name: 'Hong', addr: 'Seoul' });