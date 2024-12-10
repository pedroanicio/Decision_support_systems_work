import React from "react";
import { useNavigate } from "react-router-dom";
import KPIs from "./KPIs";
import Charts from "./Charts";

function Dashboard() {
  const navigate = useNavigate();

  const irParaRelatorios = () => {
    navigate("/relatorios");
  };

  const irParaRecoendacoes = () => {
    navigate("/recomendacoes");
  };

  const irParaCategorias = () => {
    navigate("/categorias");
  };

  const irParaDespesas = () => {
    navigate("/despesas");
  };

  const irParaReceitas = () => {
    navigate("/receitas");
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema de Apoio à Decisão - Dashboard</h1>
      <KPIs />
      <Charts />
      <button onClick={irParaRelatorios} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Relatórios
      </button>

      <button onClick={irParaRecoendacoes} style={{ marginLeft: "20px", marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Recomendacoes
      </button>

      <button onClick={irParaCategorias} style={{ marginLeft: "20px", marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Gerenciar Categorias
      </button>

      <button onClick={irParaDespesas} style={{ marginLeft: "20px", marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Gerenciar Despesas
      </button>

      <button onClick={irParaReceitas} style={{ marginLeft: "20px", marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Gerenciar Receitas
      </button>

    </div>
  );
}

export default Dashboard;
