import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

// Cores para o gráfico de pizza
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Inicializar meses do ano
const MESES = [
  { nome: "01", receita: 0, despesa: 0 },
  { nome: "02", receita: 0, despesa: 0 },
  { nome: "03", receita: 0, despesa: 0 },
  { nome: "04", receita: 0, despesa: 0 },
  { nome: "05", receita: 0, despesa: 0 },
  { nome: "06", receita: 0, despesa: 0 },
  { nome: "07", receita: 0, despesa: 0 },
  { nome: "08", receita: 0, despesa: 0 },
  { nome: "09", receita: 0, despesa: 0 },
  { nome: "10", receita: 0, despesa: 0 },
  { nome: "11", receita: 0, despesa: 0 },
  { nome: "12", receita: 0, despesa: 0 },
];

function Charts() {
  const [barData, setBarData] = useState(MESES);
  const [pieData, setPieData] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    // Requisição para pegar as receitas
    axios
      .get("http://localhost:8000/api/receitas")
      .then((response) => {
        const receitas = processarDadosParaGraficoDeBarrasReceitas(response.data);
        atualizarBarData(receitas, "receita");
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
      });

    // Requisição para pegar as despesas
    axios
      .get("http://localhost:8000/api/despesas")
      .then((response) => {
        const despesas = processarDadosParaGraficoDeBarrasDespesas(response.data);
        atualizarBarData(despesas, "despesa");

        const despesasPorCategoria = processarDespesasParaGraficoDePizza(response.data);
        setPieData(despesasPorCategoria);
      })
      .catch((error) => {
        console.error("Erro ao buscar despesas:", error);
      });
  }, []);

  // Atualiza os dados do gráfico de barras com receitas ou despesas
  const atualizarBarData = (dados, chave) => {
    setBarData((prevData) =>
      prevData.map((mes) => {
        const dado = dados.find((d) => d.nome === mes.nome);
        return {
          ...mes,
          [chave]: dado ? dado[chave] : mes[chave],
        };
      })
    );
  };

  // Processar dados para gráfico de barras (Receitas)
  function processarDadosParaGraficoDeBarrasReceitas(dados) {
    return dados.reduce((acc, item) => {
      const mes = item.data.substring(5, 7);
      const existente = acc.find((d) => d.nome === mes);
      if (existente) {
        existente.receita += item.valor;
      } else {
        acc.push({ nome: mes, receita: item.valor, despesa: 0 });
      }
      return acc;
    }, []);
  }

  // Processar dados para gráfico de barras (Despesas)
  function processarDadosParaGraficoDeBarrasDespesas(dados) {
    return dados.reduce((acc, item) => {
      const mes = item.data.substring(5, 7);
      const existente = acc.find((d) => d.nome === mes);
      if (existente) {
        existente.despesa += item.valor;
      } else {
        acc.push({ nome: mes, receita: 0, despesa: item.valor });
      }
      return acc;
    }, []);
  }

  // Processar despesas para gráfico de pizza
  function processarDespesasParaGraficoDePizza(dados) {
    const despesasPorCategoria = {};

    dados.forEach((item) => {
      if (!despesasPorCategoria[item.categoria.nome]) {
        despesasPorCategoria[item.categoria.nome] = 0;
      }
      despesasPorCategoria[item.categoria.nome] += item.valor;
    });

    return Object.keys(despesasPorCategoria).map((categoria) => ({
      name: categoria,
      value: despesasPorCategoria[categoria],
    }));
  }

  // Função chamada ao clicar em uma fatia do gráfico de pizza
  const handlePieClick = (data) => {
    setCategoriaSelecionada(data.name);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Gráfico de Barras */}
      <div>
        <h3>Receitas x Despesas</h3>
        <BarChart width={800} height={300} data={barData}>
          <XAxis dataKey="nome" tickFormatter={(tick) => `Mês ${tick}`} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="receita" fill="#82ca9d" />
          <Bar dataKey="despesa" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Gráfico de Pizza */}
      <div style={{ marginTop: "20px" }}>
        <h3>Despesas por Categoria</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
            onClick={(data) => handlePieClick(data)}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        {categoriaSelecionada && (
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Categoria selecionada: {categoriaSelecionada}
          </p>
        )}
      </div>
    </div>
  );
}

export default Charts;
