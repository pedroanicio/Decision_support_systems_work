import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

function KPIs() {
  const [kpis, setKpis] = useState({
    receitaTotal: 0,
    despesaTotal: 0,
    saldoAtual: 0,
  });

  useEffect(() => {
    async function fetchKPIs() {
      try {
        const receitasResponse = await axios.get("http://localhost:8000/api/receitas");
        const despesasResponse = await axios.get("http://localhost:8000/api/despesas");

        const receitaTotal = receitasResponse.data.reduce((sum, receita) => sum + receita.valor, 0);
        const despesaTotal = despesasResponse.data.reduce((sum, despesa) => sum + despesa.valor, 0);
        const saldoAtual = receitaTotal - despesaTotal;

        setKpis({ receitaTotal, despesaTotal, saldoAtual });
      } catch (error) {
        console.error("Erro ao buscar KPIs:", error);
      }
    }

    fetchKPIs();
  }, []);

  const kpiData = [
    { title: "Receita Total", value: kpis.receitaTotal, color: "#4caf50" },
    { title: "Despesa Total", value: kpis.despesaTotal, color: "#f44336" },
    { title: "Saldo Atual", value: kpis.saldoAtual, color: "#2196f3" },
  ];

  return (
    <Grid container spacing={3} style={{ marginBottom: "20px" }}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card style={{ borderLeft: `5px solid ${kpi.color}` }}>
            <CardContent>
              <Typography variant="h6">{kpi.title}</Typography>
              <Typography variant="h4" style={{ color: kpi.color }}>
                R$ {kpi.value.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default KPIs;
