import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import ViewProductChain from "./pages/ViewProductChain";

import "./app.css"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewProduct/>} />
          <Route path="/edit_product" element={<EditProduct/>} />
          <Route path="/view_product" element={<ViewProductChain/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;