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
import { useState } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { WalletId } from './types';
// TODO tests
export var signerFallbackFunction = function (msg) {
    throw Error('Signer is not available, please init a connection to wallet first.');
};
function useWalletConnect(_a) {
    var _setAccount = _a.setAccount, _signer = _a.signer, _account = _a.account;
    var _b = useState(_account || null), account = _b[0], setAccount = _b[1];
    // TODO replace with useState
    var setNetworkMock = function (network) { };
    var _c = useState(null), signer = _c[0], setSigner = _c[1];
    var data = {
        walletId: WalletId.WalletConnect,
        isAvailable: true,
        account: account,
        isAuthenticated: false,
    };
    var action = {
        connect: connect(_setAccount || setAccount, setNetworkMock, setSigner),
        sign: sign(account, _signer || signer),
    };
    return [data, action];
}
function sign(account, signMessage) {
    return function handleSign(message) {
        if (account && signMessage) {
            return signMessage([account, message]);
        }
        else {
            return signerFallbackFunction([]);
        }
    };
}
function connect(setAccount, setNetwork, setSigner) {
    return function handleConnect() {
        return __awaiter(this, void 0, void 0, function () {
            var connector;
            return __generator(this, function (_a) {
                connector = new WalletConnect({
                    bridge: 'https://bridge.walletconnect.org',
                    qrcodeModal: QRCodeModal,
                });
                if (!connector.connected) {
                    // create new session
                    connector.createSession();
                }
                // TODO
                // connector.on("session_update", (error, payload) => {
                //     if (error) {
                //       throw error;
                //     }
                //     // Get updated accounts and chainId
                //     const { accounts, chainId } = payload.params[0];
                //   });
                //   connector.on("disconnect", (error, payload) => {
                //     if (error) {
                //       throw error;
                //     }
                //     // Delete connector
                //   });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connector.on('connect', function handleConnect(error, payload) {
                            if (error) {
                                reject(error);
                            }
                            setSigner(connector.signMessage);
                            var _a = payload.params[0], accounts = _a.accounts, chainId = _a.chainId;
                            var accountId = accounts[0];
                            setAccount(accountId);
                            setNetwork(chainId);
                            resolve(accountId);
                        });
                    })];
            });
        });
    };
}
export default useWalletConnect;
