import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import fetchTokensByOwner from '../hooks/fetchTokensByOwner';
import { MetaMaskInpageProvider } from "@metamask/providers";

const Home = () => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState('');
    const [signer, setSigner] = useState(null);

    // Your contract deployed at Arbitrum Sepolia
    const contractAddress = '0xB40FF3a8f278F306826399c0200217eaBa46Ec1F';


    useEffect(() => {
        // Connect with Metamask
        const connectWallet = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    if (accounts && accounts.length > 0) {
                        setAccount(accounts[0]);
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const signer = await provider.getSigner();
                        setSigner(signer);
                        setContract(contractAddress);

                    } else {
                        console.error('No accounts found');
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error('MetaMask is not installed');
            }
        };

        connectWallet();

        // Add event listener for account changes
        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0 && accounts[0] !== account) {
                setAccount(accounts[0]);
                window.location.reload();
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, [account]); // Add account to the dependency array


    // const getSignature = async () => {
    //     const signature = await signer.signMessage("Please sign this message to verify your ownership");
    //     return signature
    // }


    // const tokensByOwner = fetchTokensByOwner(account,getSignature) 
    // console.log(tokensByOwner);

    return (
        <div className="App">
            <h1>Interaja com ERC 1155</h1>
            {account ? (
                <div>
                    <p>Conectado: {account}</p>
                    <p>Contrato: {contract}</p>
                </div>
            ) : (
                <p>Conecte sua MetaMask</p>
            )}

            <a href="/new_process">Criar novo processo</a><br />
            <a href="/view_product">Ver cadeia de um produto</a>


            <textarea></textarea>
        </div>
    );
}

export default Home;