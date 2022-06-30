import _isMobile from 'ismobilejs'

export function isMobile() {
    return _isMobile(window?.navigator).any
}

