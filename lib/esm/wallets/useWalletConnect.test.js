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
import { renderHook, act } from '@testing-library/react';
import useWalletConnect from './useWalletConnect';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { WalletId } from './types';
function render(_a) {
    var _b = _a === void 0 ? {} : _a, setAccountMock = _b.setAcountMock, signer = _b.signer, account = _b.account;
    var current = renderHook(function () {
        return useWalletConnect({ setAccount: setAccountMock, signer: signer, account: account });
    }).result.current;
    return current;
}
beforeEach(function () {
    jest.clearAllMocks();
    window['connected'] = undefined;
    window['error'] = undefined;
});
test('return wallet id', function () {
    var walletId = render()[0].walletId;
    expect(walletId).toBe(WalletId.WalletConnect);
});
test('be not available', function () {
    var isAvailable = render()[0].isAvailable;
    expect(isAvailable).toBeFalsy();
});
test('call QR modal on connect', function () {
    var _a = render(), connect = _a[1].connect;
    act(function () {
        connect && connect();
    });
    expect(QRCodeModal.open).toBeCalled();
});
test('not call QR modal for already connected user', function () {
    window['connected'] = true;
    var _a = render(), connect = _a[1].connect;
    act(function () {
        connect && connect();
    });
    expect(QRCodeModal.open).not.toBeCalled();
});
// TODO refactor
it('authenicate web3 wallet', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedAccountId, setAcountMock, _a, connect, accountId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                expectedAccountId = 'accountId';
                window['accountId'] = expectedAccountId;
                setAcountMock = jest.fn();
                _a = render({ setAcountMock: setAcountMock }), connect = _a[1].connect;
                return [4 /*yield*/, act(function () { return __awaiter(void 0, void 0, void 0, function () {
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
                expect(setAcountMock).toBeCalledWith(expectedAccountId);
                return [2 /*return*/];
        }
    });
}); });
it('fail on web3 auth properly', function () {
    var error = 'errr';
    window['error'] = error;
    var _a = render(), connect = _a[1].connect;
    act(function () {
        if (connect) {
            expect(connect()).rejects.toEqual(error);
        }
    });
});
it('should sign message', function () {
    var mockSignMessage = jest.fn();
    var message = 'message';
    var account = 'accountId';
    var _a = render({ signer: mockSignMessage, account: account }), sign = _a[1].sign;
    act(function () {
        if (sign)
            sign(message);
    });
    expect(mockSignMessage).toBeCalledWith([account, message]);
});
