import { Paper } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import { useStyles } from '../styles';

export default function login(){
  const classes = useStyles();
  return (
    <Layout>
      <Paper className={classes.root} elevation={20}>
        <form className={classes.formLogin}>
          <h1>Log-in</h1>
          <input type="email" required placeholder="E-mail" />
          <input type="password" required placeholder="Senha" />
          <button type="submit">Sign in</button>
        </form>
      </Paper>
    </Layout>
  );
}
