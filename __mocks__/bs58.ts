import base58 from 'bs58'
const bs58 = {
    ...base58,
    encode: jest.fn((str) => {
        if (window['bs58']) {
            return base58.encode(str)
        }
        return str
    }),
    decode: jest.fn((str) => {
        if (window['bs58']) {
            return base58.decode(str)
        }
        return str
    }),
}

export default bs58
