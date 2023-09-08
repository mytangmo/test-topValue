import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Qone from "./Qone";
import Qtwo from "./Qtwo";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Qone />} />
        <Route path="/two" element={<Qtwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
