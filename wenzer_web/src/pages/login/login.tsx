import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { useStyles } from '../styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { Authentication } = useAuth();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await fetch('http://localhost:3333/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    Authentication();
    await router.push('/');

    // await api.post('/api/login', data).then(async (data) => {
    //   Authentication();
    //   console.log(data.headers);
    //   await router.push('/');

    // }).catch((e) => {
    //   alert(e.message);
    // })
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </Paper>
  );
}
