import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function GerenciarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState({ id: null, nome: "", descricao: "" });

  // Fetch inicial
  useEffect(() => {
    fetchCategorias();
  }, []);
  

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const salvarCategoria = async () => {
    try {
      if (categoriaAtual.id) {
        await axios.put(`http://localhost:8000/api/categorias/${categoriaAtual.id}`, categoriaAtual);
      } else {
        await axios.post("http://localhost:8000/api/categorias", categoriaAtual);
      }
      fetchCategorias();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const deletarCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categorias/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const abrirDialog = (categoria = { id: null, nome: "", descricao: "" }) => {
    setCategoriaAtual(categoria);
    setOpen(true);
  };

  const fecharDialog = () => setOpen(false);

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Gerenciar Categorias</h2>
      <Button variant="contained" color="primary" onClick={() => abrirDialog()}>
        Nova Categoria
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell>{categoria.id}</TableCell>
              <TableCell>{categoria.nome}</TableCell>
              <TableCell>{categoria.descricao}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => abrirDialog(categoria)}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => deletarCategoria(categoria.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={fecharDialog}>
        <DialogTitle>{categoriaAtual.id ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={categoriaAtual.nome}
            onChange={(e) => setCategoriaAtual({ ...categoriaAtual, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            value={categoriaAtual.descricao}
            onChange={(e) => setCategoriaAtual({ ...categoriaAtual, descricao: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialog}>Cancelar</Button>
          <Button onClick={salvarCategoria} variant="contained" color="primary">
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

export default GerenciarCategorias;
