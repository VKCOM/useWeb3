"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var react_1 = require("react");
var constants_1 = require("./constants");
function useMetamask(_provider) {
    var walletId = constants_1.WalletId.Metamask;
    var isAvailable = isMetamaskAvailable();
    var _a = (0, react_1.useState)(), account = _a[0], setAccount = _a[1];
    var provider = _provider || getProvider();
    (0, react_1.useEffect)(function () {
        if (provider) {
            // request authenticated wallet
            getAccount(provider).then(function (accountId) { return setAccount(accountId); });
        }
        // TODO support ethereum events
        // window.ethereum.on('accountsChanged', async () => {
        // Do something
        // });
    }, [provider]);
    // TODO support network change
    // maybe refactor {walletId, isAvailable, network} to status Object
    // [data, actions]
    // data - {walletId, isAvailable, network, account}
    // actions - {connect, sign}
    // const data = {
    //     walletId,
    //     isAvailable,
    //     account,
    //     isAuthenticated: account !== null,
    //   };
    //   const actions = {
    //     connect: connect(provider, setAccount),
    //     sign: sign(provider),
    //   };
    //   return [data, actions];
    return [
        walletId,
        isAvailable,
        connect(provider, setAccount),
        sign(provider),
        account,
    ];
}
function getAccount(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.send(constants_1.EthMethods.getAuthenticated, [])];
                case 1:
                    accounts = _a.sent();
                    return [2 /*return*/, accounts.shift()];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function connect(provider, setAccount) {
    if (provider) {
        return function requestAccounts() {
            return __awaiter(this, void 0, void 0, function () {
                var accountId, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, provider.send(constants_1.EthMethods.authenticate, [])];
                        case 1:
                            accountId = (_a.sent())[0];
                            if (setAccount)
                                setAccount(accountId);
                            return [2 /*return*/, accountId];
                        case 2:
                            err_2 = _a.sent();
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return null;
}
function getProvider() {
    var _eth = (0, constants_1.eth)();
    if ((0, constants_1.isEth)() && _eth) {
        return new ethers_1.ethers.providers.Web3Provider(_eth);
    }
    return null;
}
function isMetamaskAvailable() {
    var _a;
    return ((_a = (0, constants_1.eth)()) === null || _a === void 0 ? void 0 : _a.isMetaMask) || false;
}
function sign(provider) {
    if (provider) {
        var signer_1 = provider.getSigner();
        return function signMessage(message) {
            signer_1.signMessage(message);
        };
    }
    return null;
}
exports.default = useMetamask;
