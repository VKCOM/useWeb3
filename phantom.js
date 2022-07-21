const nacl = require('tweetnacl')
const bs58 = require('bs58')

// TODO Generate on backend
const keyPairInit = nacl.box.keyPair()
const key = bs58.encode(keyPairInit.publicKey)
console.log(key)
console.log('secret', bs58.encode(keyPairInit.secretKey))

const params = new URLSearchParams({
    dapp_encryption_public_key: key,
    app_url: 'https://vk.com',
    cluster: 'mainnet-beta',
    redirect_link: 'https://vk.com',
}).toString()

// vk://

// console.log(params)

// console.log(decoded)

// console.log(
//     'open',
//     nacl.sign.open(bs58.decode(nonce), bs58.decode(mySecretKey))
// )

// const theirPublicKey = bs58.decode(phantom_encryption_public_key)

// const keyPair = nacl.box.keyPair.fromSecretKey(
//     bs58.decode(phantom_encryption_public_key)
// )

// console.log('box open', nacl.secretbox.open(box, nonce, theirPublicKey))

// from nacl.box.keyPair()
const mySecretKey = bs58.decode('HRKLiWmPaFzsRh417svsWbMEDLwZ3g8p6gNUTHvB2FuK')

const data = `6jjJQ8235wpFimNQ3ojwSWvfYX8sN4CgMkR5Q7pJ9tFQgwCiGnd9MPzJf86nSkmBJVhJGhAjSnicL5jc5jy23tjGUcfexESVVVpKCwi4RqxcnGLv1jEnZyfchsSaHamM9ySD4JkwAFxBPwLLGVA3oam68qWT4CfAfm1J781b2Ye12L8XuKcgkAfoRUmwz13g7fPgPS5mviW21D4cqXBe2AAHvHErLZCbLALUH27Hh2zD6vrsMKkz3vy9N726vcAuSJghC1tLmsFeYJRzzsBWkxUnk51rkGKtq3aWef3EiLokRRCCX3bBEYGjNAzLmeTQLaD2iJUQ7t5mKqA2m4MGDViUiEU1F8c8r7mSaZKqYy7nGDdf8NMy6GmHt9aZXzGPkc3zCs11No5meDqVZRTGJMGz4iSBKjT8hYPTk`
const nonce = bs58.decode(`5HbPnSgBuESTMsgp58FF9EL18RfZAdWsC`)
const phantom_encryption_public_key = `6HLZPEZzgUVzZWVYGDWP2TeghNdAsWctMMx363e4TYfc`
const sharedSecretDapp = nacl.box.before(
    bs58.decode(phantom_encryption_public_key),
    mySecretKey
)

const box = bs58.decode(data)
const openedBox = nacl.box.open.after(box, nonce, sharedSecretDapp)
const parsed = JSON.parse(Buffer.from(openedBox).toString('utf8'))
// {
//     public_key: '9aQ9N4VMkJqFh7iYVtrcHp43czJmqeh4cF54fvtiVu8h',
//     session: '2czzJ91m5n6DNXsryqUSN8TsxU9YUwk46myfhGiwZojcwpQhDuHyeXQwRbDiDciQqH19ojcjtnJqqeg9cPRRo97ZsNwqeVudvTn29u6hCxRA6mc3NsWi4nfXAyrhJzNGJdFiM4hbFiHu6Pk7md5UnD9qeNnjjAzadUgzXCjM5pQgWM3jmBcx3oFPXmKBqo5tLn6fB8z6NZqbAYNA69X5hd8AJ8'
//   }  
console.log('parsed', parsed)

//  TODO
connectData = parsed
setSharedSecret(sharedSecretDapp)
setSession(connectData.session)
setPhantomWalletPublicKey(new PublicKey(connectData.public_key))

// const opened = nacl.box.open(box, nonce, theirPublicKey, mySecretKey)
// console.log('data', bs58.encode(opened))
// console.log(
//     'verify',
//     nacl.sign.detached.verify(
//         decoded,
//         bs58.decode(nonce),
//         bs58.decode(phantom_encryption_public_key)
//     )
// )
