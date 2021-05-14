import { Paper } from '@material-ui/core';
import React, { SyntheticEvent, useState } from 'react';
import Layout from '../../components/Layout';
import { useStyles } from '../styles';
import { useRouter } from 'next/router';

export default function Register(){
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function submit(e : SyntheticEvent) {
    e.preventDefault();

    await fetch('http://localhost:3333/api/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    await router.push('/login');
  }

  return (
    <Layout>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </Paper>
    </Layout>
  );
};
