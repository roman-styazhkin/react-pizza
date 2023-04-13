import { Route, Routes } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/react-pizza" element={<Home />} />
        <Route path="/react-pizza/cart" element={<Cart />} />
      </Routes>
    </SimpleBar>
  );
};

export default App;
