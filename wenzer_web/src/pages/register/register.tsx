import { colors, Paper } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import Layout from '../../components/Layout';
import { useStyles } from '../styles';
import { useRouter } from 'next/router';
import api from '../../services/api';

export default function Register(){
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      email,
      senha,
    };

    await api.post('/api/cadastrar', data).then(() => {
      router.push('/login');
    })

  }

  return (
      <Paper className={classes.root} elevation={20}>
        <form className={classes.formLogin} onSubmit={submit}>
          <h1>Register</h1>
          <input
            type="text"
            required
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
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
};
