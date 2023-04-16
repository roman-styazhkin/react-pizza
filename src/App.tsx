import React from "react";
import { Route, Routes } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </SimpleBar>
  );
};

export default App;
