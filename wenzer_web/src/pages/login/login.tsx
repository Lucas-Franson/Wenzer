import { Paper } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import Layout from '../../components/Layout';
import { useStyles } from '../styles';

export default function login(){
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await fetch('http://localhost:3333/api/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

  }

  return (
    <Layout>
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
    </Layout>
  );
}
