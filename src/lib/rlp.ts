// The RLP format
// Serialization and deserialization for the BytesTree type, under the following grammar:
// | First byte | Meaning                                                                    |
// | ---------- | -------------------------------------------------------------------------- |
// | 0   to 127 | HEX(leaf)                                                                  |
// | 128 to 183 | HEX(length_of_leaf + 128) + HEX(leaf)                                      |
// | 184 to 191 | HEX(length_of_length_of_leaf + 128 + 55) + HEX(length_of_leaf) + HEX(leaf) |
// | 192 to 247 | HEX(length_of_node + 192) + HEX(node)                                      |
// | 248 to 255 | HEX(length_of_length_of_node + 128 + 55) + HEX(length_of_node) + HEX(node) |

export const padEven = (str: string): string => {
  return str.length % 2 === 0 ? str : `0${str}`
}

export const uint = (num: number): string => padEven(num.toString(16))

export const length = (len: number, add: number): string => {
  return len < 56
    ? uint(add + len)
    : uint(add + uint(len).length / 2 + 55) + uint(len)
}

export const dataTree = (tree: string | any[]): string => {
  if (typeof tree === 'string') {
    const hex = tree.slice(2)
    const pre =
      hex.length !== 2 || hex >= '80' ? length(hex.length / 2, 128) : ''
    return pre + hex
  } else {
    const hex = tree.map(dataTree).join('')
    const pre = length(hex.length / 2, 192)
    return pre + hex
  }
}

const encode = (tree: string | any[]): string => `0x${dataTree(tree)}`

const parseLength = (hex: string, index: number) => {
  const len = parseInt(hex.slice(index, index + 2), 16) % 64
  return len < 56
    ? len
    : parseInt(hex.slice(index + 2, index + 2 + (len - 55) * 2), 16)
}

export default {
  encode
}