import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Relatorios from "./components/Relatorios";
import Recomendacoes from "./components/Recomendacoes";
import GerenciarCategorias from "./components/GerenciarCategorias";
import GerenciarDespesas from "./components/GerenciarDespesas";
import GerenciarReceitas from "./components/GerenciarReceitas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/categorias" element={<GerenciarCategorias />} />
        <Route path="/despesas" element={<GerenciarDespesas />} />
        <Route path="/receitas" element={<GerenciarReceitas />} />
      </Routes>
    </Router>
  );
}

export default App;
