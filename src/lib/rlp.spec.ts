import { test } from 'ava'
import rlp, { dataTree, length, padEven, uint } from './rlp'

test('lib/rlp/padEven', t => {
  t.is(padEven('123'), '0123')
})

test('lib/rlp/uint', t => {
  t.is(uint(10), '0a')
})

test('lib/rlp/length', t => {
  t.is(length(50, 20), '46')
  t.is(length(58, 20), '4c3a')
})

test('lib/rlp/dataTree', t => {
  t.is(dataTree('0x212412'), '83212412')
  t.is(dataTree('0x00112233445566778899aabbccddeeff'), '9000112233445566778899aabbccddeeff')
  t.is(dataTree(["0x00112233", "0x00", "0x44", "0x55", "0xf0", "0xff", ["0x66"], ["0x77", "0x88"], "0x", "0x", "0x99aabb"]), 'd8840011223300445581f081ffc166c377818880808399aabb')
})

test('lib/rlp/encode', t => {
  t.is(rlp.encode('0x212412'), '0x83212412')
  t.is(rlp.encode('0x00112233445566778899aabbccddeeff'), '0x9000112233445566778899aabbccddeeff')
  t.is(rlp.encode(["0x00112233", "0x00", "0x44", "0x55", "0xf0", "0xff", ["0x66"], ["0x77", "0x88"], "0x", "0x", "0x99aabb"]), '0xd8840011223300445581f081ffc166c377818880808399aabb')
})

test('lib/rlp/decode', t => {
  t.deepEqual(rlp.decode('0x83212412'), '0x212412')
  t.deepEqual(rlp.decode('0x9000112233445566778899aabbccddeeff'), '0x00112233445566778899aabbccddeeff')
  t.deepEqual(rlp.decode('0xd8840011223300445581f081ffc166c377818880808399aabb'), ["0x00112233", "0x00", "0x44", "0x55", "0xf0", "0xff", ["0x66"], ["0x77", "0x88"], "0x", "0x", "0x99aabb"])
  t.deepEqual(rlp.decode('0xd8840011223300445581f081ffc166c37781888080839aabb'), [])
})