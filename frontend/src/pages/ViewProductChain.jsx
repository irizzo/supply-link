import "../pages/viewProduct.css"
import Form from "react-bootstrap/Form"

const ViewProductChain = () => {
  return (
    <>
      <div className="view_product_divmain" >
        <div className="view_product_details" >
          <h1>Visualizar histórico do produto</h1>
          <h4> token: XXXXXXX </h4>
        </div>
        <div>
          <form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form_group_label" >Processo</Form.Label>
              {/* <Form.Control className="form_control" plaintext readOnly value="Leite movido para o transporte "></Form.Control>
              <Form.Control plaintext readOnly value={`Data: 19-08-2024`}></Form.Control> */}
              <span>Leite movido para o transporte</span>
              <span>Data: 19-08-2024</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form_group_label" >Processo</Form.Label>
              {/* <Form.Control className="form_control" plaintext readOnly value="Leite movido para o transporte "></Form.Control>
              <Form.Control plaintext readOnly value={`Data: 19-08-2024`}></Form.Control> */}
              <span>Descarregado no empresa leites&Queijos</span>
              <span>Data: 21-08-2024</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="form_group_label" >Processo</Form.Label>
              {/* <Form.Control className="form_control" plaintext readOnly value="Leite movido para o transporte "></Form.Control>
              <Form.Control plaintext readOnly value={`Data: 19-08-2024`}></Form.Control> */}
              <span>Armazenado no freezer n⁰3</span>
              <span>Data: 25-08-2024</span>
            </Form.Group>
          </form>
         
        </div>


      </div>
    </>
  );
};

export default ViewProductChain;