import { useRef } from 'react';
import { Link } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  Icon,
  IconButton,
  Typography,
} from '@mui/material';
import { apiSol } from 'app/services/api/api';
import history from '@history';

import { Root, GradientSection } from './styleds';

export default function NovaConta() {
  const formRef = useRef(null);

  function handleSubmit(model) {

    const nome = model.userNameCadastro;
    const senha = model.senhaCadastro;
    const confirmaçaoSenha = model.senhaConfirmacaoCadastro;
    if (nome === '' || senha === '' || confirmaçaoSenha === '') {
      alert('Por favor preencha todos os dados');
    } else if (senha === confirmaçaoSenha) {
      apiSol
        .post(`/cadastro`, {
          nome,
          senha,
        })
        .then((res) => {
          alert(res.data);
          history.push('/login');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } else {
      alert('Senhas não conferem');
    }
  }

  return (
    <Root className="flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0">
      <GradientSection className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img className="w-128 mb-32" src="assets/images/logos/logo.png" alt="logo" />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <Typography variant="h3" color="inherit" className="font-800 leading-tight">
            Lista de recados
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="subtitle1" color="inherit" className="mt-32">
            lista de recados da Sol
          </Typography>
        </FuseAnimate>
      </GradientSection>

      <FuseAnimate animation={{ translateX: [0, '100%'] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="mb-32 font-bold text-20 sm:text-24">
              Faça seu cadastro
            </Typography>

            <Formsy
              onValidSubmit={handleSubmit}
              ref={formRef}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                className="mb-16"
                type="text"
                name="userNameCadastro"
                label="nome"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="senhaCadastro"
                label="Senha"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="senhaConfirmacaoCadastro"
                label="Confirmação"
                variant="outlined"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                value="legacy"
              >
                Salvar
              </Button>
            </Formsy>

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">Já tem uma conta?</span>
              <Link className="font-medium" to="/login">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </Root>
  );
}
