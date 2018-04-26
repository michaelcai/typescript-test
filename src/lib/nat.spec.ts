import { test } from 'ava'
import BN from "bn.js"
import nat from './nat'

test('lib/nat/fromBN', t => {
  t.is(nat.fromBN(new BN('18')), '0x12')
})

test('lib/nat/toBN', t => {
  t.deepEqual(nat.toBN('0x12').toString('hex'), '12')
})

test('lib/nat/fromString', t => {
  t.is(nat.fromString('18'), '0x12')
  t.is(nat.fromString('255'), '0xff')
})

test('lib/nat/toEther', t => {
  t.is(nat.toEther('0xde0b6b3a7640000'),1)
})

test('lib/nat/fromEther', t => {
  t.is(nat.fromEther(1), '0xde0b6b3a7640000')
})

test('lib/nat/fromNumber', t=> {
  t.is(nat.fromNumber(18), '0x12')
  t.is(nat.fromNumber('18'), '0x18')
})

test('lib/nat/toNumber', t => {
  t.is(nat.toNumber('0x12'), 18)
})

test('lib/nat/toUint256', t => {
  t.is(nat.toUint256('0x12'), '0x0000000000000000000000000000000000000000000000000000000000000012')
})

test('lib/nat/toString', t=> {
  t.is(nat.toString('0x12'), '18')
})
