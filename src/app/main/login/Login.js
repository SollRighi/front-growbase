import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function Login() {
  const login = useSelector(({ auth }) => auth.login);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.email || login.error.password)) {
      formRef.current.updateInputsWithError({
        ...login.error,
      });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    console.log(model);
    apiSol
      .post('login', {
        nome: model.email,
        senha: model.password,
      })
      .then((resposta) => {
        localStorage.setItem('usuarioLogadoGrowdev', JSON.stringify(resposta.data.usuario));
        history.push('/todos-recados');
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(err.response.data);
      });
  }

  useEffect(() => {
    localStorage.removeItem('usuarioLogadoGrowdev');
  }, []);

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
              Entre!
            </Typography>

            <Formsy
              onValidSubmit={handleSubmit}
              onValid={enableButton}
              onInvalid={disableButton}
              ref={formRef}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                className="mb-16"
                type="text"
                name="email"
                label="nome"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        email
                      </Icon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password"
                label="Senha"
                InputProps={{
                  className: 'pr-2',
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        <Icon className="text-20" color="action">
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={!isFormValid}
                value="legacy"
              >
                Login
              </Button>
            </Formsy>

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">N??o tem uma conta?</span>
              <Link className="font-medium" to="/nova-conta">
                Crie uma agora
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </Root>
  );
}

export default Login;
