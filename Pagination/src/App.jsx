import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductContextProvider from "./Store/Context";
import Product from "./Components/Product";
// import ProductDetail from "./Components/ProductDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ProductContextProvider>
          <Routes>
            <Route
              path="/"
              element={<Product />}
            />
            {/* <Route
              path="/display"
              element={<ProductDetail />}
            /> */}
          </Routes>
        </ProductContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
