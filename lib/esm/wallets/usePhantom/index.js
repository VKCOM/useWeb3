var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useState } from 'react';
import 'fast-text-encoding';
import { getHost, isMobile, strings } from '../constants';
import { WalletId, } from '../types';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
// TODO connect with deeplinks
// https://docs.phantom.app/integrating/deeplinks-ios-and-android
// https://phantom.app/ul/v1/connect?app_url=https%3A%2F%2Fvk.com&redirect_link=https%3A%2F%2Fya.ru&dapp_encryption_public_key=HyKsaJuGq3LBPkbNA2Pe2mb113YwRehrXMWJC1fH3can
// WORKING!
// https://phantom.app/ul/browse/https%3A%2F%2Fmagiceden.io%2Fitem-details%2FED8Psf2Zk2HyVGAimSQpFHVDFRGDAkPjQhkfAqbN5h7d?ref=https%3A%2F%2Fmagiceden.io
function usePhantom(_provider) {
    var keyPair = useState(generateDappEncryption())[0];
    var _a = useState(_provider), provider = _a[0], setProvider = _a[1];
    var _b = useState(null), account = _b[0], setAccount = _b[1];
    useEffect(function () {
        if (!provider) {
            setProvider(getProvider());
        }
    }, []);
    var isAvailable = provider !== undefined;
    var data = {
        walletId: WalletId.Phantom,
        isAvailable: isAvailable,
        account: account,
        chainId: null,
        isAuthenticated: account !== null,
    };
    var actions = {
        connect: connect(provider, isMobile(), keyPair.publicKey, setAccount),
        sign: sign(provider),
        getDappEncryptionKeys: getDappEncryptionKeys(keyPair),
        handleDeepLinkConnect: handleDeepLinkConnect(keyPair.secretKey, setAccount),
    };
    return [data, actions];
}
function connect(provider, isMobile, publicKey, set) {
    if (isMobile && !provider) {
        // We recommend not to use Phantom deeplinks on web app (due to bad UX)
        // or generate dappEncryptionPublicKey on server (for security reasons)
        return function openDeepLink() {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = generateLink(bs58.encode(publicKey), getHost());
                    window.open(url, '_blank');
                    return [2 /*return*/, url];
                });
            });
        };
    }
    return function handleConnect(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var connectionResp, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!provider) {
                            throw new Error(strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE);
                        }
                        return [4 /*yield*/, provider.connect()];
                    case 1:
                        connectionResp = _b.sent();
                        account = ((_a = connectionResp.publicKey) === null || _a === void 0 ? void 0 : _a.toString()) || null;
                        set(account);
                        return [2 /*return*/, account];
                }
            });
        });
    };
}
function sign(provider) {
    return function handleSign(msg) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedMessage, signedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (provider === undefined) {
                            throw new Error(strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE);
                        }
                        encodedMessage = new TextEncoder().encode(msg);
                        return [4 /*yield*/, provider.signMessage(encodedMessage, 'utf8')
                            // TODO: maybe signature formatting is required
                        ];
                    case 1:
                        signedMessage = _a.sent();
                        // TODO: maybe signature formatting is required
                        return [2 /*return*/, signedMessage];
                }
            });
        });
    };
}
export function generateDappEncryption() {
    return nacl.box.keyPair();
}
export function generateLink(public_key, host) {
    var params = new URLSearchParams({
        dapp_encryption_public_key: public_key,
        redirect_url: host,
        app_url: host,
        // TODO support cluster
    });
    return "https://phantom.app/ul/v1/connect?".concat(params.toString());
}
export var getProvider = function () {
    return window.solana;
};
export function gatherDeeplinkData() {
    // TODO get deeplink data from URL params
}
function getDappEncryptionKeys(keyPair) {
    return function get() {
        return keyPair;
    };
}
function handleDeepLinkConnect(secret, set) {
    return function handleResponse(response) {
        var phantom_encryption_public_key = response.phantom_encryption_public_key, nonce = response.nonce, data = response.data;
        // Open shared box
        var sharedSecretDapp = nacl.box.before(bs58.decode(phantom_encryption_public_key), secret);
        var openedBox = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecretDapp);
        var parsed = openedBox
            ? JSON.parse(Buffer.from(openedBox).toString('utf8'))
            : null;
        if (parsed && parsed.public_key) {
            set(parsed.public_key);
            return bs58.decode(parsed.public_key);
        }
        return null;
    };
}
export default usePhantom;
