"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var react_hooks_1 = require("@testing-library/react-hooks");
var constants_1 = require("../constants");
var types_1 = require("../types");
var index_1 = __importStar(require("./index"));
var bs58_1 = __importDefault(require("bs58"));
var bs58_2 = __importDefault(require("bs58"));
function render(provider) {
    var current = (0, react_1.renderHook)(function () { return (0, index_1.default)(provider); }).result.current;
    return current;
}
var uaGetter;
beforeEach(function () {
    uaGetter = jest.spyOn(window.navigator, 'userAgent', 'get');
    uaGetter.mockReturnValue('desktop');
});
test('should return a proper wallet id', function () {
    var walletId = render()[0].walletId;
    expect(walletId).toBe(types_1.WalletId.Phantom);
});
test('should reflect that phantom is available', function () {
    var isAvailable = render(setupSolana())[0].isAvailable;
    expect(isAvailable).toBe(true);
});
test('should reflect that phantom is not available', function () {
    var _a = render()[0], isAvailable = _a.isAvailable, account = _a.account, isAuthenticated = _a.isAuthenticated;
    expect(isAvailable).toBe(false);
    expect(account).toBeNull();
    expect(isAuthenticated).toBe(false);
});
test('should connect and save wallet', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, testConnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('should return null on connection fail', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedPublicKey, solanaMock, result, _a, connect, connectResp, _b, account, isAuthenticated;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                expectedPublicKey = null;
                solanaMock = setupSolana(true, expectedPublicKey);
                result = (0, react_1.renderHook)(function () { return (0, index_1.default)(solanaMock); }).result;
                _a = result.current, connect = _a[1].connect;
                return [4 /*yield*/, (0, react_hooks_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, connect()];
                                case 1:
                                    connectResp = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _c.sent();
                expect(solanaMock.connect).toBeCalledTimes(1);
                expect(connectResp).toBe(expectedPublicKey);
                _b = result.current[0], account = _b.account, isAuthenticated = _b.isAuthenticated;
                expect(account).toBe(expectedPublicKey);
                expect(isAuthenticated).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
test('should throw if trying to connect when not available', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, connect;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = render(), connect = _a[1].connect;
                return [4 /*yield*/, expect(connect()).rejects.toThrow(constants_1.strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
test('should throw if trying to sign when not available', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sign;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = render(), sign = _a[1].sign;
                return [4 /*yield*/, expect(sign('')).rejects.toThrow(constants_1.strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
test('should sign a message', function () { return __awaiter(void 0, void 0, void 0, function () {
    var solanaMock, expectedSignedMsg, _a, sign, signedMessage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                solanaMock = setupSolana(true);
                expectedSignedMsg = 'asdfasdf';
                solanaMock.signMessage = jest.fn(function () { return Promise.resolve(expectedSignedMsg); });
                _a = render(solanaMock), sign = _a[1].sign;
                return [4 /*yield*/, (0, react_hooks_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sign('Test message')];
                                case 1:
                                    signedMessage = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                expect(signedMessage).toBe(expectedSignedMsg);
                expect(solanaMock.signMessage).toBeCalledTimes(1);
                return [2 /*return*/];
        }
    });
}); });
test('connect on mobile device web3 browser', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uaGetter.mockReturnValue('iPhone');
                return [4 /*yield*/, testConnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('open deeplink when connect on mobile device', function () {
    var expectedEncryptionKeys = {
        publicKey: 'public dapp key',
    };
    window['keyPair'] = expectedEncryptionKeys;
    uaGetter.mockReturnValue('iPhone');
    window.open = jest.fn();
    var host = (0, constants_1.getHost)();
    var expectedLink = (0, index_1.generateLink)(expectedEncryptionKeys.publicKey, host);
    var _a = render(), connect = _a[1].connect;
    (0, react_hooks_1.act)(function () {
        if (connect)
            connect();
    });
    expect(window.open).toBeCalledWith(expectedLink, '_blank');
});
test('should store dapp encryption key on deeplink connect', function () {
    var expectedEncryptionKeys = {
        public: 'publicKey',
        secret: 'secret',
    };
    window['keyPair'] = expectedEncryptionKeys;
    uaGetter.mockReturnValue('iPhone'); // TODO refactor: setMobile()
    var _a = render(), getDappEncryptionKeys = _a[1].getDappEncryptionKeys;
    expect(getDappEncryptionKeys && getDappEncryptionKeys()).toEqual(expectedEncryptionKeys);
});
test('handle deeplink redirect', function () {
    window['bs58'] = true;
    var expectedEncryptionKeys = {
        publicKey: bs58_2.default.decode('9aQ9N4VMkJqFh7iYVtrcHp43czJmqeh4cF54fvtiVu8h'),
        secretKey: bs58_2.default.decode('HRKLiWmPaFzsRh417svsWbMEDLwZ3g8p6gNUTHvB2FuK'),
    };
    window['keyPair'] = expectedEncryptionKeys;
    var phantom_encryption_public_key = '6HLZPEZzgUVzZWVYGDWP2TeghNdAsWctMMx363e4TYfc';
    var nonce = '5HbPnSgBuESTMsgp58FF9EL18RfZAdWsC';
    var deepLinkData = '6jjJQ8235wpFimNQ3ojwSWvfYX8sN4CgMkR5Q7pJ9tFQgwCiGnd9MPzJf86nSkmBJVhJGhAjSnicL5jc5jy23tjGUcfexESVVVpKCwi4RqxcnGLv1jEnZyfchsSaHamM9ySD4JkwAFxBPwLLGVA3oam68qWT4CfAfm1J781b2Ye12L8XuKcgkAfoRUmwz13g7fPgPS5mviW21D4cqXBe2AAHvHErLZCbLALUH27Hh2zD6vrsMKkz3vy9N726vcAuSJghC1tLmsFeYJRzzsBWkxUnk51rkGKtq3aWef3EiLokRRCCX3bBEYGjNAzLmeTQLaD2iJUQ7t5mKqA2m4MGDViUiEU1F8c8r7mSaZKqYy7nGDdf8NMy6GmHt9aZXzGPkc3zCs11No5meDqVZRTGJMGz4iSBKjT8hYPTk';
    uaGetter.mockReturnValue('iPhone');
    var result = (0, react_1.renderHook)(function () { return (0, index_1.default)(); }).result;
    var _a = result.current, handleDeepLinkConnect = _a[1].handleDeepLinkConnect;
    var handlerResult;
    (0, react_hooks_1.act)(function () {
        handlerResult =
            handleDeepLinkConnect &&
                handleDeepLinkConnect({
                    phantom_encryption_public_key: phantom_encryption_public_key,
                    data: deepLinkData,
                    nonce: nonce,
                });
    });
    expect(handlerResult).toEqual(expectedEncryptionKeys.publicKey);
    // hook should connect
    expect(result.current[0].account).toBe(bs58_1.default.encode(expectedEncryptionKeys.publicKey));
});
function setupSolana(isConnected, _publicKey) {
    if (isConnected === void 0) { isConnected = false; }
    if (_publicKey === void 0) { _publicKey = null; }
    // TODO refactor, too complex
    var publicKey = _publicKey === null
        ? null
        : {
            toString: function () {
                return _publicKey;
            },
        };
    var solana = {
        connect: jest.fn(function (opts) {
            // @ts-ignore
            return Promise.resolve({ publicKey: publicKey });
        }),
        disconnect: function () {
            return Promise.resolve(undefined);
        },
        isConnected: isConnected,
        publicKey: publicKey,
        signMessage: function (message, display) {
            return Promise.resolve(undefined);
        },
    };
    return solana;
}
// Test connect method
function testConnect() {
    return __awaiter(this, void 0, void 0, function () {
        var expectedPublicKey, solanaMock, result, _a, connect, connectResp, _b, account, isAuthenticated;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    expectedPublicKey = 'expectedPublicKey';
                    solanaMock = setupSolana(true, expectedPublicKey);
                    result = (0, react_1.renderHook)(function () { return (0, index_1.default)(solanaMock); }).result;
                    _a = result.current, connect = _a[1].connect;
                    return [4 /*yield*/, (0, react_hooks_1.act)(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connect()];
                                    case 1:
                                        connectResp = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _c.sent();
                    expect(solanaMock.connect).toBeCalledTimes(1);
                    expect(connectResp).toBe(expectedPublicKey);
                    _b = result.current[0], account = _b.account, isAuthenticated = _b.isAuthenticated;
                    expect(account).toBe(expectedPublicKey);
                    expect(isAuthenticated).toBe(true);
                    return [2 /*return*/];
            }
        });
    });
}
