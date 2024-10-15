import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '../../config'
import fetchTokensByOwner from '../hooks/fetchTokensByOwner';

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import "../pages/NewProcess.css"
import submitProcessForm from '../hooks/submitProcessForm';

const contractAddress = CONTRACT_ADDRESS;

const date = new Date()
let currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`

const mockData = {
  processData: {
    date: currentDate,
    name: "Produção do Queijo",
    description: "processo de produção do queijo a partir da manipulação do leite"
  },
	processEntries: [],
	processOuts: [
		{
			date: "2024-10-10T10:00",
			name: "Nome do Produto",
			description: "Descrição do Produto",
			uniqueId: "LT202410_CCC",
			tokenType: "product"
		}
  ],
  processType: ""
}

const NewProcess = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState('');
  const [signer, setSigner] = useState(null);
  const [ownerTokens, setOwnerTokens] = useState([]);
  const [processData, setProcessData] = useState({});

  const handleProcessFormSubmit = () => {
    submitProcessForm(account, processData) 
  }

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
      { console.debug("[ownerTokens] ", ownerTokens) }
      <button onClick={(e) => handleGetOwnerTokens(e)}>Carregar</button>

      <div className="new_process_process_info" >
        <h2>Página novo produto</h2>
        <Form.Group className=" ">
          <Form.Label>Digite aqui as informações do processo a ser cadastrado</Form.Label>
          <Form.Control className="form_control" value={JSON.stringify(processData)} as="textarea" rows={5} />
        </Form.Group>
        <Button onClick={(e) => {
          setProcessData(mockData)
        }} variant="secondary">Popular</Button>
        <Button onClick={() => handleProcessFormSubmit()} variant="secondary">Teste</Button>
        {/* Quando clicar no botão popular nos setamos os dados do processData */}
      </div>
      <div className="new_process_set" >
        <Form.Check onClick={(e) => {
          setProcessData({...mockData, processType: "create"})
          mockData.processType = "create"
          document.getElementById("new_process_newProduct").className = "new_process_newProduct"
        }} type={"checkbox"} label={`Esse processo cria um novo produto ?`} />

        <Form.Check onClick={(e) => {
          setProcessData({...mockData, processType: "update"})
          mockData.processType = "update"
          document.getElementById("new_process_att_product").className = "new_process_att_product"
        }} id="checkbox_new_product" type={"checkbox"} label={`Esse processo atualiza um produto já existente?`} />
      </div>
      <div className="new_process_main">
        <div id="new_process_newProduct" className="new_process_newProduct_none" >
          <Form.Group className="mb-3">
            <Form.Label>Digite aqui as informações do produto a ser cadastrado</Form.Label>
            <Form.Control className="form_control" as="textarea" rows={5} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Insumos do processo</Form.Label>
            <Form.Control className="new_process_text_form" placeholder="Digite o titulo do produto" type="text"></Form.Control>
            <Form.Select aria-label="Default select example">
              <option >Selecione o produto</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              {/*  Aqui vai ter que ter um map de todos os produtos associados a esse tipo */}
            </Form.Select>
          </Form.Group>
        </div>
        <div id="new_process_att_product" className="new_process_att_product_none">
          <Form.Group className="mb-3">
            <Form.Label>Seleciona as informações do produto associado</Form.Label>
            <Form.Control className="new_process_text_form" placeholder="Digite o titulo do produto" type="text"></Form.Control>
            <Form.Select aria-label="Default select example">
              <option >Selecione o produto</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              {/*  Aqui vai ter que ter um map de todos os produtos associados a esse tipo */}

            </Form.Select>
          </Form.Group>
        </div>
      </div>
    </>
  );
};

export default NewProcess;
