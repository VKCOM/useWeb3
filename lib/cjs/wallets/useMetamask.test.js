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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var useMetamask_1 = __importDefault(require("./useMetamask"));
var constants_1 = require("./constants");
function render(provider) {
    var current = (0, react_1.renderHook)(function () { return (0, useMetamask_1.default)(provider); }).result.current;
    return current;
}
beforeEach(function () {
    window.ethereum = undefined;
});
test('should return wallet id', function () {
    var walletId = render()[0];
    expect(walletId).toBe(constants_1.WalletId.Metamask);
});
test('should be not available by defaut', function () {
    var _a = render(), isAvailable = _a[1], connect = _a[2], sign = _a[3];
    expect(isAvailable).toBeFalsy();
    expect(connect).toBeNull();
    expect(sign).toBeNull();
});
test('should return availability', function () {
    var _a = render(initMetamask()), isAvailable = _a[1];
    expect(isAvailable).toBeTruthy();
});
it('should authenicate web3 wallet', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedAccountId, provider, _a, connect, accountId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                expectedAccountId = 'accountId';
                provider = initMetamask({
                    accountId: expectedAccountId,
                });
                _a = render(provider), connect = _a[2];
                return [4 /*yield*/, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!connect) return [3 /*break*/, 2];
                                    return [4 /*yield*/, connect()];
                                case 1:
                                    accountId = _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                expect(accountId).toBe(expectedAccountId);
                return [2 /*return*/];
        }
    });
}); });
it('should return null on connection fail', function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, _a, connect, accountId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                provider = initMetamask({
                    rejectSend: true,
                });
                _a = render(provider), connect = _a[2];
                return [4 /*yield*/, (0, react_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!connect) return [3 /*break*/, 2];
                                    return [4 /*yield*/, connect()];
                                case 1:
                                    accountId = _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                expect(accountId).toBeNull();
                return [2 /*return*/];
        }
    });
}); });
it('should sign message', function () {
    var message = 'message';
    var mockSignMessage = jest.fn(function () { return Promise.resolve(''); });
    var provider = initMetamask({
        signMessage: mockSignMessage,
    });
    var _a = render(provider), sign = _a[3];
    (0, react_1.act)(function () {
        if (sign)
            sign(message);
    });
    expect(mockSignMessage).toBeCalledWith(message);
});
function initMetamask(_a) {
    var _b = _a === void 0 ? {} : _a, accountId = _b.accountId, rejectSend = _b.rejectSend, signMessage = _b.signMessage;
    window.ethereum = { isMetaMask: true };
    return mockProvider();
    function mockProvider() {
        return {
            send: function mockSend(method, params) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (rejectSend)
                            throw new Error('ERRRORRORORORRORO');
                        switch (method) {
                            case constants_1.EthMethods.getAuthenticated:
                                return [2 /*return*/, []];
                            case constants_1.EthMethods.authenticate:
                                return [2 /*return*/, [accountId]];
                            default:
                                return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                    });
                });
            },
            getSigner: function mockGetSigner() {
                var mockSignMessage = Promise.resolve('string');
                return {
                    signMessage: signMessage || mockSignMessage,
                };
            },
        };
    }
}