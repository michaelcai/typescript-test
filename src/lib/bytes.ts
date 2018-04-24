const at = (bytes: string, index: number): number => {
	return parseInt(bytes.slice(index * 2 + 2, index * 2 + 4), 16)
}

const random = (bytes: number): string => {
	let rnd
	if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
		rnd = window.crypto.getRandomValues(new Uint8Array(bytes))
	} else if (typeof require !== 'undefined') {
		rnd = require('c' + 'rypto').randomBytes(bytes)
	} else {
		throw 'Safe random numbers not available.'
	}
	return rnd.reduce((r, v) => {
		return r + `00${v.toString(16)}`.slice(-2)
	}, '0x')
}

const length = (b: string): number => (b.length - 2) / 2

const flatten = (bytesArray: string[]): string => bytesArray.reduce((r, v) => r + v.slice(2), '0x')

const slice = (start: number, end: number, bytes: string): string => `0x${bytes.slice(start * 2 + 2, end * 2 + 2)}`

const reverse = (hex: string): string => {
	return `0x${hex.slice(2).match(/\w{2}/g).reverse().join('')}`
}

const pad = (len: number, hex: string): string => `0x${hex.slice(2).padStart(len * 2, '0')}`

const padRight = (len: number, hex: string): string => hex.padEnd(len * 2 + 2, '0')

const toArray = (hex: string): number[] => hex.slice(2).match(/\w{2}/g).map((bit) => parseInt(bit, 16))

const fromArray = (arr: number[]): string => arr.reduce((r, v) => r + v.toString(16).padStart(2, '0'), '0x')

const toUint8Array = (hex: string): Uint8Array => new Uint8Array(toArray(hex))

const fromUint8Array = (arr: Uint8Array): string => fromArray(Array.from(arr))

const fromNumber = (num: number): string => `0x${num.toString(16).padStart(2, '0')}`

const toNumber = (hex: string): number => parseInt(hex.slice(2), 16)

const concat = (a: string, b: string): string => a.concat(b.slice(2))

const fromNat = (bn: string): string => (bn === '0x0' ? '0x' : bn.length % 2 === 0 ? bn : '0x0' + bn.slice(2))

const toNat = (bn: string): string => (bn[2] === '0' ? '0x' + bn.slice(3) : bn)

const fromAscii = (ascii: string): string =>
	ascii.split('').reduce((r, v) => r + v.charCodeAt(0).toString(16).padStart(2, '0'), '0x')

const toAscii = (hex: string): string =>
	hex.slice(2).match(/\w{2}/g).map((bit) => String.fromCharCode(parseInt(bit, 16))).join('')

const fromString = (s: string): string => {
	return fromArray(unescape(encodeURIComponent(s)).split('').map((bit) => bit.charCodeAt(0)))
}

const toString = (bytes: string): string => {
	return decodeURIComponent(escape(toArray(bytes).map((bit) => String.fromCharCode(bit)).join('')))
}

export default {
	at,
	concat,
	flatten,
	fromArray,
	fromAscii,
	fromNat,
	fromNumber,
	fromString,
	fromUint8Array,
	length,
	pad,
	padRight,
	random,
	reverse,
	slice,
	toArray,
	toAscii,
	toNat,
	toNumber,
	toString,
	toUint8Array
}
