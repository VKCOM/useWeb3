const nacl = require('tweetnacl')
const bs58 = require('bs58')

const key = bs58.encode(nacl.box.keyPair().publicKey)
console.log(key)

const params = new URLSearchParams({
    dapp_encryption_public_key: key,
    app_url: 'https://vk.com',
    cluster: 'mainnet-beta',
    redirect_link: 'https://vk.com',
}).toString()

// vk://

console.log(params)
