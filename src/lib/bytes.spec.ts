import { test } from 'ava'
import bytes from './bytes'

test('bytes/at', (t) => {
	t.is(bytes.at('0x1234', 0), 18)
})

test('bytes/random', (t) => {
	t.is(bytes.random(8).length, 18)
})

test('bytes/length', (t) => {
	t.is(bytes.length(bytes.random(8)), 8)
})

test('bytes/flatten', (t) => {
	t.is(bytes.flatten([ '0x12', '0x32', '0x45' ]), '0x123245')
})

test('bytes/slice', (t) => {
	t.is(bytes.slice(0, 2, '0x123456'), '0x1234')
})

test('bytes/reverse', (t) => {
	t.is(bytes.reverse('0x123456'), '0x563412')
})

test('bytes/pad', (t) => {
	t.is(bytes.pad(6, '0x12'), '0x000000000012')
})

test('bytes/padRight', (t) => {
	t.is(bytes.padRight(6, '0x12'), '0x120000000000')
})

test('bytes/toArray', (t) => {
	t.deepEqual(bytes.toArray('0x121314'), [ 18, 19, 20 ])
})

test('bytes/fromArray', (t) => {
	t.deepEqual(bytes.fromArray([ 18, 19, 20 ]), '0x121314')
})

test('bytes/toUint8Array', (t) => {
	t.deepEqual(bytes.toUint8Array('0x121314'), new Uint8Array([ 18, 19, 20 ]))
})

test('bytes/fromUint8Array', t => {
	t.deepEqual(bytes.fromUint8Array(new Uint8Array([18, 19, 20])), '0x121314')
})

test('bytes/fromNumber', t => {
	t.deepEqual(bytes.fromNumber(18), '0x12')
})

test('bytes/toNumber', t => {
	t.is(bytes.toNumber('0x12'), 18)
})

test('bytes/concat', t => {
	t.is(bytes.concat('0x1234', '0x5678'), '0x12345678')
})

test('bytes/fromNat', t => {
	t.is(bytes.fromNat('0x0'), '0x')
	t.is(bytes.fromNat('0x01'), '0x01')
	t.is(bytes.fromNat('0x123'), '0x0123')
})

test('bytes/toNat', t => {
	t.is(bytes.toNat('0x0123'), '0x123')
	t.is(bytes.toNat('0x2123'), '0x2123')
})

test('bytes/fromAscii', t => {
	t.is(bytes.fromAscii('ascii'), '0x6173636969')
	t.is(bytes.fromAscii('test'), '0x74657374')
})

test('bytes/toAscii', t => {
	t.is(bytes.toAscii('0x6173636969'), 'ascii')
	t.is(bytes.toAscii('0x74657374'), 'test')
})

test('bytes/fromString', t => {
	t.is(bytes.fromString('测试'), '0xe6b58be8af95')
	t.is(bytes.fromString('测试另类'), '0xe6b58be8af95e58fa6e7b1bb')
})

test('bytes/toString', t => {
	t.is(bytes.toString('0xe6b58be8af95'), '测试')
	t.is(bytes.toString('0xe6b58be8af95e58fa6e7b1bb'), '测试另类')
})