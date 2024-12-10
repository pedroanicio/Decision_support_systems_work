import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

function Relatorios() {

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/");
  };

  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/receitas").then((response) => setReceitas(response.data));
    axios.get("http://localhost:8000/api/despesas").then((response) => setDespesas(response.data));
  }, []);

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Relatórios Detalhados
      </Typography>

      <Typography variant="h6" gutterBottom>
        Receitas
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receitas.map((receita) => (
              <TableRow key={receita.id}>
                <TableCell>{receita.id}</TableCell>
                <TableCell>{receita.descricao}</TableCell>
                <TableCell>R$ {receita.valor.toLocaleString()}</TableCell>
                <TableCell>{receita.data}</TableCell>
                <TableCell>{receita.categoria?.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Despesas
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.map((despesa) => (
              <TableRow key={despesa.id}>
                <TableCell>{despesa.id}</TableCell>
                <TableCell>{despesa.descricao}</TableCell>
                <TableCell>R$ {despesa.valor.toLocaleString()}</TableCell>
                <TableCell>{despesa.data}</TableCell>
                <TableCell>{despesa.categoria?.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <button onClick={voltar} style={{marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Voltar
      </button>
    </Container>
  );
}

export default Relatorios;
