import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Link from 'next/link';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper } from '@material-ui/core';
import SnackbarMessage from '../../components/SnackbarMessage';
import { useStyles } from './styles';
import clsx from 'clsx';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState({
    isVisible: false,
    message: '',
    type: undefined,
  });


  const router = useRouter();
  const classes = useStyles();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    await api.post('/api/cadastrar', data).then(() => {
      router.push('/login');

    }).catch((e) => {
      setShowSnackbar({
        isVisible: true,
        message: 'E-mail ja cadastrado na plataforma!',
        type: 'error',
      });
    })

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
    <Paper className={classes.initialScreen} elevation={20}>
      <Box className={classes.container}>
        <Box className={classes.containerTitle}>
          <h1>Compartilhe experiência, ideias e projetos!</h1>
          <p>Encontre pessoas, monte sua equipe e desenvolva suas ideias</p>
          <img
            className={classes.image}
            src="/bg_register.svg"
            alt="login screen"
          />
        </Box>

        <form className={classes.formLogin} onSubmit={submit}>
          <h1>Cadastre-se</h1>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
          >
            <InputLabel htmlFor="filled-adornment-password">Nome</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type="text"
              required
              style={{ color: '#222' }}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
          >
            <InputLabel htmlFor="filled-adornment-password">E-mail</InputLabel>
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
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
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
            Cadastrar
          </Button>
          <Link href="/login">
            <p style={{ cursor: 'pointer' }}>
              Ja possui uma conta? Faça login aqui
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
  );
};
