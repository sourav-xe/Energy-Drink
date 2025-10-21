import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products"
import Collaborate from "./Pages/Collaborate";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
       <Route path="/Products" element={<Products />} />
       <Route path="/Collaborate" element={<Collaborate />} />
    </Routes>
  );
};

export default App;