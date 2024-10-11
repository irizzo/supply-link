import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewProcess from "./pages/NewProcess";
import ViewProductChain from "./pages/ViewProductChain";

import "./app.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new_process" element={<NewProcess />} />
        <Route path="/view_product" element={<ViewProductChain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;