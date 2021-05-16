import React, { FormEvent, useState } from 'react';
import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useStyles } from '../styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function login(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { Authentication } = useAuth();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      senha,
    };

    await api.post('/api/login', data).then(() => {
      Authentication();  
      router.push('/');
    })
    .catch((e) => {
      alert('E-mail ou senhas incorretas! :(' + e.message);
    })
  }

  return (
    <Paper className={classes.root} elevation={20}>
      <form className={classes.formLogin} onSubmit={submit}>
        <h1>Log-in</h1>
        <input
          type="email"
          required
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </Paper>
  );
}
