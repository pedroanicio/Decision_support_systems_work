import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function GerenciarReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [receitaAtual, setReceitaAtual] = useState({
    id: null,
    descricao: "",
    valor: "",
    data: "",
    categoria: "",
    fonte: "",
    recorrente: "",
  });

  useEffect(() => {
    fetchReceitas();
    fetchCategorias();
  }, []);

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/");
  };


  const fetchReceitas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/receitas");
      setReceitas(response.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const salvarReceita = async () => {
    try {
      if (receitaAtual.id) {
        await axios.put(`http://localhost:8000/api/receitas/${receitaAtual.id}`, receitaAtual);
      } else {
        await axios.post("http://localhost:8000/api/receitas", receitaAtual);
      }
      fetchReceitas();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
    }
  };

  const deletarReceita = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/receitas/${id}`);
      fetchReceitas();
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
    }
  };

  const abrirDialog = (receita = { id: null, descricao: "", valor: "", data: "", categoria: "", fonte: "", recorente: "" }) => {
    setReceitaAtual(receita);
    setOpen(true);
  };

  const fecharDialog = () => setOpen(false);

  return (
    <div>
      <h2>Gerenciar Receitas</h2>
      <Button variant="contained" color="primary" onClick={() => abrirDialog()}>
        Nova Receita
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Fonte</TableCell>
            <TableCell>Recorrente</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receitas.map((receita) => (
            <TableRow key={receita.id}>
              <TableCell>{receita.id}</TableCell>
              <TableCell>{receita.descricao}</TableCell>
              <TableCell>R$ {receita.valor.toFixed(2)}</TableCell>
              <TableCell>{receita.data}</TableCell>
              <TableCell>{receita.categoria?.nome}</TableCell>
              <TableCell>{receita.fonte}</TableCell>
              <TableCell>{receita.recorrente}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => abrirDialog(receita)}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => deletarReceita(receita.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={fecharDialog}>
        <DialogTitle>{receitaAtual.id ? "Editar Receita" : "Nova Receita"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            value={receitaAtual.descricao}
            onChange={(e) => setReceitaAtual({ ...receitaAtual, descricao: e.target.value })}
          />
          <TextField
            label="Valor"
            fullWidth
            margin="normal"
            type="number"
            value={receitaAtual.valor}
            onChange={(e) => setReceitaAtual({ ...receitaAtual, valor: e.target.value })}
          />
          <TextField
            label="Data"
            fullWidth
            margin="normal"
            type="date"
            value={receitaAtual.data}
            onChange={(e) => setReceitaAtual({ ...receitaAtual, data: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoria</InputLabel>
            <Select
              value={receitaAtual.categoria}
              onChange={(e) => setReceitaAtual({ ...receitaAtual, categoria: e.target.value })}
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Fonte</InputLabel>
            <Select
              value={receitaAtual.fonte}
              onChange={(e) => setReceitaAtual({ ...receitaAtual, fonte: e.target.value })}
            >
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Investimento">Investimento</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Recorrente</InputLabel>
            <Select
              value={receitaAtual.recorrente}
              onChange={(e) => setReceitaAtual({ ...receitaAtual, recorrente: e.target.value })}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialog}>Cancelar</Button>
          <Button onClick={salvarReceita} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <button onClick={voltar} style={{marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Voltar
      </button>

    </div>
  );
}

export default GerenciarReceitas;
