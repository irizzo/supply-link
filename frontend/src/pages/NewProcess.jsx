import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '../../config'
import fetchTokensByOwner from '../hooks/fetchTokensByOwner';

const contractAddress = CONTRACT_ADDRESS;
console.log('contractAddress: ', contractAddress);

const NewProcess = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState('');
  const [signer, setSigner] = useState(null);
  const [ownerTokens, setOwnerTokens] = useState([]);

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

  }, [account]);

  async function handleGetOwnerTokens(e) {
    console.log('handleGetOwnerTokens')
    e.preventDefault();

    const signature = await signer.signMessage("Please sign this message to verify your ownership");
    const tokenRes = await fetchTokensByOwner({ walletAddress: account, signature })

    setOwnerTokens(tokenRes.result.tokens)
  }

  return (
    <>
      <div>
        {console.log('ownerTokens: ',ownerTokens)}
        <h1>Interaja com ERC 1155</h1>
        {account ? (
          <div>
            <p>Conectado: {account}</p>
            <p>Contrato: {contract}</p>
          </div>
        ) : (
          <p>Conecte sua MetaMask</p>
        )}
      </div>

      <button onClick={(e) => handleGetOwnerTokens(e)}>Carregar</button>
    </>
  );
};

export default NewProcess;