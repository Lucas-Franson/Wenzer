import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { Paper } from '@material-ui/core';
import { useStyles } from './styles';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const classes = useStyles();
  const {isAuth} = useAuth();
  return (
    <Layout>
      <Head>
        <title>Wenzer</title>
      </Head>
      <Paper className={classes.root} elevation={20}>
        {isAuth ? (
          <p>Usuario Autenticado</p>
        ) : (
          <p>Faz Login para se autenticar na plataforma</p>
        )}
      </Paper>
    </Layout>
  );
}
