const nacl = {
    box: {
        keyPair: function generateKeyPair() {
            return (
                window['keyPair'] || {
                    publicKey: 'public',
                    secret: 'secret',
                }
            )
        },
    },
}

export default nacl
