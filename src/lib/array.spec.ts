import { test } from 'ava'
import array from './array'

test('array/generate', (t) => {
	t.deepEqual(array.generate(5, (num) => num), [ 0, 1, 2, 3, 4 ])
	t.deepEqual(array.generate(5, (num) => 2 * num), [ 0, 2, 4, 6, 8 ])
})

test('arrya/replicate', (t) => {
	t.deepEqual(array.replicate(5, 1), [ 1, 1, 1, 1, 1 ])
	t.deepEqual(array.replicate(5, 2), [ 2, 2, 2, 2, 2 ])
})

test('array/concat', (t) => {
	t.deepEqual(array.concat([ 1, 2 ], [ 3, 4 ]), [ 1, 2, 3, 4 ])
})

test('array/flatten', (t) => {
	t.deepEqual(array.flatten([ [ 1, 2 ], [ 3, 4 ] ]), [ 1, 2, 3, 4 ])
	t.deepEqual(array.flatten([ [ 1, 2 ], [ 3, 4 ], 5 ]), [ 1, 2, 3, 4, 5 ])
})

test('array/chunksOf', (t) => {
	t.deepEqual(array.chunksOf(2, [ 1, 2, 3, 4, 5, 6 ]), [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ])
	t.deepEqual(array.chunksOf(4, [ 1, 2, 3, 4, 5, 6 ]), [ [ 1, 2, 3, 4 ], [ 5, 6 ] ])
})
