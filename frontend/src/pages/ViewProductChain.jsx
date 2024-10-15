import { useState } from "react";
import getProductHistory from "../hooks/getProductHistory";
import "../pages/viewProduct.css"

const ViewProductChain = () => {
  const [history, setHistory] = useState([]);
  const [load, setLoading] = useState("");
  const [productId, setProductId] = useState(""); // Estado para armazenar o ID do produto


  const productHistory = async () => {
    if (!productId) {
      alert("Por favor, insira um ID de produto válido.");
      return;
    }

    try {
      const result = await getProductHistory();
      setLoading("Fazendo Busca...");
      setTimeout(() => {
        setHistory(result.result);
        setLoading("");

      }, 2000);

    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      setLoading("Erro ao buscar histórico. Tente novamente.");
    }
  };

  let i = 0;
  return (
    <div className="view_product_divmain">
      <div className="search">
        <div className="view_product_details">
          <p>Id do queijo: LT202410_QQQ</p>
          <input
            placeholder="Digite o ID do produto"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <button onClick={productHistory}>Procurar cadeia de processos de um produto</button>
      </div>
      {load && <p>{load}</p>}

      {history.length > 0 && <div className="product-chain">

        {
        
        history.map((process) => {
          i++;
          return (
            <div key={i} className="process-card">
              <p className="process-index">{i}</p>
              <p>Nome do processo: {process.processData.name}</p>
              <p>Data do processo: {process.processData.date}</p>
              <p>Descrição do processo: {process.processData.description}</p>
              <p>
                Insumos do processo:{" "}
                {process.processEntries.length > 0
                  ? process.processEntries.join(", ")
                  : "Nenhum insumo encontrado"}
              </p>
              <p>Saídas do processo: {process.processOuts[0].name || process.processOuts[0]} </p>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

export default ViewProductChain;
