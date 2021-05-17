import React from 'react';
import Head from 'next/head';
import { Paper } from '@material-ui/core';
import { useStyles } from './styles';
import { useAuth } from '../contexts/AuthContext';
import WelcomeScreen from '../components/InitialScreen';
import Feed from '../components/Feed';

export default function Home() {
  const classes = useStyles();
  const {isAuth} = useAuth();
  return (
    <>
      <Head>
        <title>Wenzer</title>
      </Head>
      {isAuth ? (
         <Paper className={classes.feed}>
            <Feed />
         </Paper>
      ) : (
        <Paper className={classes.initialScreen}>
          <WelcomeScreen/>
        </Paper>
      )}
    </>
  );
}
