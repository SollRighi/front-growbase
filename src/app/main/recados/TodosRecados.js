import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { apiSol } from 'app/services/api/api';
import { useCallback, useEffect, useState } from 'react';
import history from '@history';

export default function TodosRecados() {
  const [usuarioLogado, setUsuarioLogado] = useState();
  const [recados, setRecados] = useState([]);

  function excluirRecado(idRecado) {
    apiSol
      .delete(`/recado/${idRecado}`)
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data);
        atualizaRecados();
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err.response.data);
      });
  }

  function editarRecado(recado) {
    const novaDescricao = prompt('Nova Descrição:', recado.descricao);
    if (novaDescricao == null || novaDescricao === '') {
      return;
    }
    const novoDetalhamento = prompt('Novo Detalhamento:', recado.detalhamento);
    if (novoDetalhamento == null || novoDetalhamento === '') {
      return;
    }

    apiSol
      .put(`/recado/${recado.id}`, {
        descricao: novaDescricao,
        detalhamento: novoDetalhamento,
      })
      .then((res) => {
        alert(res.data);
        atualizaRecados();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }
  const atualizaRecados = useCallback(() => {
    if (!usuarioLogado) return;
    apiSol
      .get(`listarecados/${usuarioLogado.id}`)
      .then((res) => {
        setRecados(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err.response.data);
      });
  }, [usuarioLogado]);

  useEffect(() => {
    atualizaRecados();
  }, [atualizaRecados]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogadoGrowdev'));
    if (!usuario) history.push('/login');
    setUsuarioLogado(usuario);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Detalhamento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recados.map((recado, index) => (
              <TableRow key={index}>
                <TableCell>{recado.descricao}</TableCell>
                <TableCell>{recado.detalhamento}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => editarRecado(recado)}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => excluirRecado(recado.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
