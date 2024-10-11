import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "../pages/NewProcess.css"
import { useState } from "react";

const date = new Date()
let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
console.log(currentDate);
const NewProcess = () => {

  const [mockData, setMock] = useState({});

  return (
    <>
      <div className="new_process_process_info" >
        <h2>Página novo produto</h2>
        <Form.Group className=" ">
          <Form.Label>Digite aqui as informações do processo a ser cadastrado</Form.Label>
          <Form.Control className="form_control" value={JSON.stringify(mockData)} as="textarea" rows={5} />
        </Form.Group>
        <Button onClick={(e) => {
          setMock({
            data_de_criacao: currentDate,
            nome: "Produção do quejo",
            descricao: "processo de produção do queijo a partir da manipulação do leite",
          })
        }} variant="secondary">Popular</Button>
        {/* Quando clicar no botão popular nos setamos os dados do processData */}
      </div>

      <div className="new_process_main">
        <div className="new_process_newProduct" >
          <Form.Check onClick={(e) => {
            setMock({
              data_de_criacao: currentDate,
              nome: "Produção do quejo",
              descricao: "processo de produção do queijo a partir da manipulação do leite",
              type: "create"
            })
          }} type={"checkbox"} label={`Esse processo cria um novo produto ?`} />

          <Form.Group className="mb-3">
            <Form.Label>Digite aqui as informações do produto a ser cadastrado</Form.Label>
            <Form.Control className="form_control" as="textarea" rows={5} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Insumos do processo</Form.Label>
            <Form.Control className="new_process_text_form" placeholder="Digite o tipo do produto" type="text"></Form.Control>
            <Form.Select aria-label="Default select example">
              <option >Selecione o produto</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              {/*  Aqui vai ter que ter um map de todos os produtos associados a esse tipo */}

            </Form.Select>
          </Form.Group>
        </div>
        <div className="new_process_att_product">
          <Form.Check onClick={(e) => {
            setMock({
              data_de_criacao: currentDate,
              nome: "Produção do quejo",
              descricao: "processo de produção do queijo a partir da manipulação do leite",
              type: "Update"
            })
          }} type={"checkbox"} label={`Esse processo atualiza um produto já existente?`} />
          <Form.Group className="mb-3">
            <Form.Label>Seleciona as informações do produto associado</Form.Label>
            <Form.Control className="new_process_text_form" placeholder="Digite o tipo do produto" type="text"></Form.Control>
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