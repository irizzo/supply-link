import { useState } from "react";
import getProductHistory from "../hooks/getProductHistory";
import "../pages/viewProduct.css"

const ViewProductChain = () => {
  const [history, setHistory] = useState([]);

  const productHistory = async () => {
    const a = await getProductHistory();
    setHistory(a.result);
  }

  let i = 0;
  return (
    <>
      <div className="view_product_divmain" >
        <div className="search">
          <div className="view_product_details" >
            <input placeholder="Digite o ID do produto" type="text" />
          </div>
          <button className="chain-button" onClick={() => productHistory()} > Procurar cadeia de processos do produto {'> '}</button>
        </div>

        {history.length > 0 && <div className="product-chain">
          
          {
            history.map((process) => {
              i++;
              console.log(process)
              return (
                <div key={i} className="process-card">
                  <p className="process-index">{i}</p>
                  <p>Nome processo : {process.processData.name}</p>
                </div>
              );
            })
          }
        </div>}
      </div>
    </>
  );
};

export default ViewProductChain;