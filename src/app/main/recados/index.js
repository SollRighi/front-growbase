import { TextFieldFormsy } from '@fuse/core/formsy';
import { Button } from '@mui/material';
import Formsy from 'formsy-react';
import { useRef, useEffect, useState } from 'react';
import history from '@history';
import { apiSol } from 'app/services/api/api';

export default function NovoRecado() {
  const [usuarioLogado, setUsuarioLogado] = useState();
  const formRef = useRef(null);

  function handleSubmit(model) {
    if (!usuarioLogado) history.push('/login');

    const salvarDescricao = model.descricao;
    const salvarDetalhamento = model.detalhamento;

    if (!salvarDescricao || !salvarDetalhamento) {
      alert('Preencha todos os campos');
    } else {
      apiSol
        .post(`/recado`, {
          usuario: usuarioLogado.id,
          descricao: salvarDescricao,
          detalhamento: salvarDetalhamento,
        })
        .then((res) => {
          alert(res.data);
          formRef.reset();
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogadoGrowdev'));
    if (!usuario) history.push('/login');
    setUsuarioLogado(usuario);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Formsy
        onValidSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-column justify-center w-full"
      >
        <TextFieldFormsy name="descricao" label="descricao" variant="outlined" required />

        <TextFieldFormsy name="detalhamento" label="Detalhamento" variant="outlined" required />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          aria-label="LOG IN"
          value="legacy"
        >
          Salvar
        </Button>
      </Formsy>
    </div>
  );
}
