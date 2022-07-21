import _nacl from 'tweetnacl'

const nacl = {
    ..._nacl,
    box: {
        ..._nacl.box,
        keyPair: function generateKeyPair() {
            return (
                window['keyPair'] || {
                    publicKey: 'public' + Math.random(),
                    secret: 'secret' + Math.random(),
                }
            )
        },
    },
}

export default nacl
