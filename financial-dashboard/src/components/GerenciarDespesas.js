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

function GerenciarDespesas() {
  const [despesas, setDespesas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [despesaAtual, setDespesaAtual] = useState({
    id: null,
    descricao: "",
    valor: "",
    data: "",
    dataVencimento: "",
    categoria: "",
    formatoPagamento: "",
  });

  useEffect(() => {
    fetchDespesas();
    fetchCategorias();
  }, []);

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/");
  };


  const fetchDespesas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/despesas");
      setDespesas(response.data);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
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

  const salvarDespesa = async () => {
    try {
      if (despesaAtual.id) {
        await axios.put(`http://localhost:8000/api/despesas/${despesaAtual.id}`, despesaAtual);
      } else {
        await axios.post("http://localhost:8000/api/despesas", despesaAtual);
      }
      fetchDespesas();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
    }
  };

  const deletarDespesa = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/despesas/${id}`);
      fetchDespesas();
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  const abrirDialog = (despesa = { id: null, descricao: "", valor: "", data: "", dataVencimento: "", categoria: "", formatoPagamento: "" }) => {
    setDespesaAtual(despesa);
    setOpen(true);
  };

  const fecharDialog = () => setOpen(false);

  return (
    <div>
      <h2>Gerenciar Despesas</h2>
      <Button variant="contained" color="primary" onClick={() => abrirDialog()}>
        Nova Despesa
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Data de Vencimento</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Formato de Pagamento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((despesa) => (
            <TableRow key={despesa.id}>
              <TableCell>{despesa.id}</TableCell>
              <TableCell>{despesa.descricao}</TableCell>
              <TableCell>R$ {despesa.valor.toFixed(2)}</TableCell>
              <TableCell>{despesa.data}</TableCell>
              <TableCell>{despesa.dataVencimento}</TableCell>
              <TableCell>{despesa.categoria?.nome}</TableCell>
              <TableCell>{despesa.formatoPagamento}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => abrirDialog(despesa)}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => deletarDespesa(despesa.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={fecharDialog}>
        <DialogTitle>{despesaAtual.id ? "Editar Despesa" : "Nova Despesa"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            value={despesaAtual.descricao}
            onChange={(e) => setDespesaAtual({ ...despesaAtual, descricao: e.target.value })}
          />
          <TextField
            label="Valor"
            fullWidth
            margin="normal"
            type="number"
            value={despesaAtual.valor}
            onChange={(e) => setDespesaAtual({ ...despesaAtual, valor: e.target.value })}
          />
          <TextField
            label="Data"
            fullWidth
            margin="normal"
            type="date"
            value={despesaAtual.data}
            onChange={(e) => setDespesaAtual({ ...despesaAtual, data: e.target.value })}
          />
          <TextField
            label="Data de Vencimento"
            fullWidth
            margin="normal"
            type="date"
            value={despesaAtual.dataVencimento}
            onChange={(e) => setDespesaAtual({ ...despesaAtual, dataVencimento: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoria</InputLabel>
            <Select
              value={despesaAtual.categoria}
              onChange={(e) => setDespesaAtual({ ...despesaAtual, categoria: e.target.value })}
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Formato de Pagamento</InputLabel>
            <Select
              value={despesaAtual.formatoPagamento}
              onChange={(e) => setDespesaAtual({ ...despesaAtual, formatoPagamento: e.target.value })}
            >
              <MenuItem value="CARTAO">Cartão</MenuItem>
              <MenuItem value="DINHEIRO">Dinheiro</MenuItem>
              <MenuItem value="TRANSFERENCIA">Transferência</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialog}>Cancelar</Button>
          <Button onClick={salvarDespesa} variant="contained" color="primary">
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

export default GerenciarDespesas;
