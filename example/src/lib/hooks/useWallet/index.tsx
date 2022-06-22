import React, {useState} from "react";
import {AccountsList, WalletHookData, WalletStatus} from "./types";
import {ethers} from 'ethers';
import {JsonRpcSigner, Web3Provider} from '@ethersproject/providers';

function useWallet(): WalletHookData {
    const [status, setStatus] = useState(WalletStatus.NOT_CONNECTED);
    const [provider, setProvider] = useState<Web3Provider | undefined>(undefined);
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
    const [accounts, setAccounts] = useState<AccountsList | undefined>(undefined);

    const initConnection = async () => {
        if(window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []) as AccountsList;
            const signer = provider.getSigner()

            setProvider(provider);
            setSigner(signer);
            setAccounts(accounts);
            console.log(provider);
            console.log(signer);
            console.log(accounts);
            setStatus(WalletStatus.CONNECTED);
        } else {
            setStatus(WalletStatus.NOT_CONNECTED);
        }
    }

    React.useEffect(() => {
        initConnection();
    }, []);

    return {
        status,
        provider,
        signer,
        accounts,
    }
}

export default useWallet;
