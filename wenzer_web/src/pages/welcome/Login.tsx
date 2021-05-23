import React, { FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useStyles } from './styles';
import api from '../../services/api';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import LayoutLogin from '../../components/LayoutLogin';
import { useRouter } from 'next/router';
import LoadingScreen from '../../components/LoadingScreen';

import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper } from '@material-ui/core';
import SnackbarMessage from '../../components/SnackbarMessage';
import clsx from 'clsx';

export interface SnackbarProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
  isVisible: boolean;
}

export default function login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<SnackbarProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const router = useRouter();
  const { query } = useRouter();
  const { Authentication, isAuthenticated } = useAuth();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const user = {
      email,
      password
    }

    if(query.token) {
      await api
        .get(`api/verifica-email/${query.token}`)
        .then(async () => {
          await api
            .post('api/login', user)
            .then((data) => {
              const token = data.data;
              Cookies.set('WenzerToken', token, { expires: 60 });
              api.defaults.headers.Authorization = `Bearer ${token.token}`;
              Authentication();
              router.push('/');
            })
            .catch((error) => {
              setShowSnackbar({
                isVisible: true,
                message: 'E-mail ou Senhas incorretas!',
                type: 'error',
              });
            });
        })
        .catch((error) => {
          setShowSnackbar({
            isVisible: true,
            message: 'Valide seu e-mail para logar!',
            type: 'error',
          });
        });

    } else {
      await api
        .post('api/login', user)
        .then((data) => {
          const token = data.data;
          Cookies.set('WenzerToken', token, { expires: 60 });
          api.defaults.headers.Authorization = `Bearer ${token.token}`;
          Authentication();
          router.push('/');
        })
        .catch((error) => {
          setShowSnackbar({
            isVisible: true,
            message: 'E-mail ou Senhas incorretas!',
            type: 'error',
          });
        });
    }
  }

   const handleCloseSnackbar = (
     event?: React.SyntheticEvent,
     reason?: string,
   ) => {
     if (reason === 'clickaway') {
       return;
     }

     setShowSnackbar({
       isVisible: false,
       message: '',
       type: undefined,
     });
   };

  return (
    <LayoutLogin>
      {isLoading && <LoadingScreen />}
      <Paper className={classes.initialScreen} elevation={20}>
        <Box className={classes.container}>
          <Box className={classes.containerTitle}>
            <h1>Compartilhe experiência, ideias e projetos!</h1>
            <p>Encontre pessoas, monte sua equipe e desenvolva suas ideias</p>
            <img
              className={classes.image}
              src="/bg_login.svg"
              alt="login screen"
            />
          </Box>

          <form className={classes.formLogin} onSubmit={submit}>
            <h1 className={classes.loginText}>Faça login</h1>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                E-mail
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type="email"
                required
                style={{ color: '#222' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                required
                style={{ color: '#222' }}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Link href="#">
              <p style={{ cursor: 'pointer' }}>Esqueceu a senha?</p>
            </Link>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Entrar
            </Button>
            <Link href="/register">
              <p style={{ cursor: 'pointer' }}>
                Ainda nao tem uma conta? Registre-se aqui
              </p>
            </Link>
          </form>
        </Box>
        {showSnackbar && (
          <SnackbarMessage
            isVisible={showSnackbar.isVisible}
            message={showSnackbar.message}
            type={showSnackbar.type}
            closeSnackbar={handleCloseSnackbar}
          />
        )}
      </Paper>
    </LayoutLogin>
  );
}

