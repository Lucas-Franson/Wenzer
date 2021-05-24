import React, { useEffect } from 'react';
import Head from 'next/head';
import { useStyles } from '../styles/pages/home/styles';
import { useAuth } from '../contexts/AuthContext';
import Feed from '../components/Feed';
import Layout from '../components/Layout'; 
import { Paper } from '@material-ui/core';
import { useRouter, Router } from 'next/router';

export default function Home() {

  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   (function loading() {
  //     if (!isAuthenticated) {
  //       router.push('/welcome');
  //     }
  //   })();
  // }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>Wenzer</title>
      </Head>

      <Layout>
        <Paper className={classes.feed}>
          <Feed />
        </Paper>
      </Layout>

      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )} */}
    </>
  );
}


