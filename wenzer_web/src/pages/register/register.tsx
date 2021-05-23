import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Link from 'next/link';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper, Modal, Backdrop } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import SnackbarMessage from '../../components/SnackbarMessage';
import LayoutLogin from '../../components/LayoutLogin';
import LoadingScreen from '../../components/LoadingScreen';
import { useStyles } from './styles';
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext';

export interface SnackbarProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
  isVisible: boolean;
}

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<SnackbarProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      router.push('/');
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    await api.post('/api/cadastrar', data).then(() => {
      handleCreateAccount();

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

  function handleCreateAccount() {
    setOpenModal(true);
  }

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
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
            <Link href="/welcome">
              <p style={{ cursor: 'pointer' }}>
                Ja possui uma conta?{' '}
                <span style={{ color: '#B732A2' }}>Faça login aqui</span>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paperModal}>
            <h2 id="transition-modal-title">Conta cadastrada com sucesso!</h2>
            <h3>Valide seu e-mail para acessar</h3>
            <p id="transition-modal-description">
              Enviamos um email de validação para {email}
            </p>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/welcome')}
              style={{ margin: '0px 5px' }}
            >
              Faça login
            </Button>
          </div>
        </Fade>
      </Modal>
    </LayoutLogin>
  );
};
