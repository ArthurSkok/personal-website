import "./App.css";
import React from "react";
import "./Fonts/fonts.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  const styleFont = {
    fontFamily: "Futura",
  };
  return (
    <div className="App" style={styleFont}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//        <Route path="/products" element={<Products />} />
//        <Route path="/about" element={<About />} />
