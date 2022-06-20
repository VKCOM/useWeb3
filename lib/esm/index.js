import React from "react";
function useWallet() {
    // const [provider, setProvider] = useState<string | null>(null);
    // const [signer, setSigner] = useState(null);
    var initConnection = function () {
        /*if(typeof window.ethereum !== "undefined") {
            await window.ethereum.request({method: 'eth_requestAccounts'})
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            setContract(
                new ethers.Contract(
                    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
                    Greeter.abi,
                    signer
                )
            )
        } else {
            alert("Please install metamask.")
        }*/
    };
    React.useEffect(function () {
        initConnection();
    }, []);
    return {
        test: 'test',
    };
}
export default useWallet;
