import _isMobile from 'ismobilejs'
import {MessageParams, SignMessage} from "../types";

export const signerFallbackFunction: SignMessage = (msg) => {
    throw Error('Signer is not available, please init a connection to wallet first.')
}

export function isMobile() {
    return _isMobile(window?.navigator).any
}
