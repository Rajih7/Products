import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Counter from "./Comp/Count";
import ProductsList from "./Comp/ProductsList";
import ProductDetails from "./Comp/ProductDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id/" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
