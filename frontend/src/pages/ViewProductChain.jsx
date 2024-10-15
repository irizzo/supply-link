import { useEffect, useState } from "react";
import getProductHistory from "../hooks/getProductHistory";
import "../pages/viewProduct.css"


const ViewProductChain = () => {
  const [history, setHistory] = useState([]);

  const productHistory = async () => {
    const a = await getProductHistory();
    setHistory(a.result);
  }

  return (
    <>
      <div className="view_product_divmain" >
        <div className="view_product_details" >
          <input placeholder="Digite o ID do produto" type="text" />
        </div>
        <button onClick={() => productHistory()} >Procurar cadeia de processos do produto </button>
        
        {history.length > 0 &&
        
          history.map((process) => {
            console.log(process)
            return (
              <div style={{border: "2px solid black"}}>
                <p>Nome processo : {process.processData.name}</p>
              </div>
            );
          })}

      </div>
    </>
  );
};

export default ViewProductChain;