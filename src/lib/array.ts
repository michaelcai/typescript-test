export const generate = (num: number, fn: (num: number) => number): number[] => {
	return Array.from({ length: num }).map((_, i) => fn(i))
}

export const replicate = (num: number, val: number): number[] => generate(num, () => val)

export const concat = <T>(a: T[], b: T[]): T[] => a.concat(b)

export const flatten = <T>(arr): T[] => {
	return arr.reduce((a, v: T) => a.concat(Array.isArray(v) ? flatten(v) : v), [])
}

export const chunksOf = <T>(size: number, arr): T[] => {
	return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}

export default {
	chunksOf,
	concat,
	flatten,
	generate,
	replicate
}
