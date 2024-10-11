import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '../../config'

const contractAddress = CONTRACT_ADDRESS;
console.log('contractAddress: ', contractAddress);

const NewProcess = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState('');
  const [signer, setSigner] = useState(null);

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

  return (
    <>
        Página novo produto
    </>
  );
};

export default NewProcess;