import SpyInstance = jest.SpyInstance;
import useWallet from "../index";
import {WalletStatus} from "../types";

let windowSpy: SpyInstance;

beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
    windowSpy.mockRestore();
});

it('When there is no ethers object, should return status NOT_CONNECTED', () => {
    windowSpy.mockImplementation(() => ({
        ethers: undefined
    }));

    expect(useWallet().status).toEqual(WalletStatus.NOT_CONNECTED);
});

export {};
