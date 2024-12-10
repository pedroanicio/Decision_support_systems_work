import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

function Recomendacoes() {

  const navigate = useNavigate();

  const voltar = () => {
    navigate("/");
  };

  const recomendacoes = [
    "Reduza despesas em Marketing para melhorar o saldo em 10%.",
    "Invista mais em vendas online, pois geram maior retorno.",
    "Analise despesas recorrentes em aluguel para possíveis reduções.",
  ];

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Recomendações
      </Typography>
      <Card>
        <CardContent>
          <List>
            {recomendacoes.map((recomendacao, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={recomendacao} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <button onClick={voltar} style={{marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Voltar
      </button>
    </Container>
  );
}

export default Recomendacoes;
