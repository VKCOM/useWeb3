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
var strings_1 = __importDefault(require("../strings"));
var types_1 = require("../types");
var usePhantom_1 = __importDefault(require("./usePhantom"));
var utils = __importStar(require("./utils"));
function render() {
    var _a = (0, react_1.renderHook)(function () { return (0, usePhantom_1.default)(); }), current = _a.result.current, result = _a.result, rerender = _a.rerender;
    return { cur: current, result: result, rerender: rerender };
}
function setupSolana(isConnected, _publicKey) {
    if (isConnected === void 0) { isConnected = false; }
    if (_publicKey === void 0) { _publicKey = null; }
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
beforeEach(function () {
    jest.spyOn(utils, 'getProvider');
});
function mockSolana(mock) {
    // @ts-ignore
    utils.getProvider.mockImplementation(function () { return mock; });
}
afterEach(function () {
    jest.restoreAllMocks();
});
test('should return a proper wallet id', function () {
    var walletId = render().cur[0].walletId;
    expect(walletId).toBe(types_1.WalletId.Phantom);
});
test('should reflect that phantom is available', function () {
    mockSolana(setupSolana());
    var isAvailable = render().cur[0].isAvailable;
    expect(isAvailable).toBe(true);
});
test('should reflect that phantom is not available', function () {
    var _a = render().cur[0], isAvailable = _a.isAvailable, account = _a.account, isAuthenticated = _a.isAuthenticated;
    expect(isAvailable).toBe(false);
    expect(account).toBeNull();
    expect(isAuthenticated).toBe(false);
});
test('should connect and save wallet', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedPublicKey, solanaMock, result, _a, connect, connectResp, _b, account, isAuthenticated;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                expectedPublicKey = 'expectedPublicKey';
                solanaMock = setupSolana(true, expectedPublicKey);
                mockSolana(solanaMock);
                result = render().result;
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
                expect(isAuthenticated).toBe(true);
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
                mockSolana(solanaMock);
                result = render().result;
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
                _a = render().cur, connect = _a[1].connect;
                return [4 /*yield*/, expect(connect()).rejects.toThrow(strings_1.default.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE)];
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
                _a = render().cur, sign = _a[1].sign;
                return [4 /*yield*/, expect(sign('')).rejects.toThrow(strings_1.default.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
test('should sign a message', function () { return __awaiter(void 0, void 0, void 0, function () {
    var solanaMock, expectedSignedMsg, result, _a, sign, signedMessage;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                solanaMock = setupSolana(true);
                expectedSignedMsg = 'asdfasdf';
                solanaMock.signMessage = jest.fn(function () { return Promise.resolve(expectedSignedMsg); });
                mockSolana(solanaMock);
                result = render().result;
                _a = result.current, sign = _a[1].sign;
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
