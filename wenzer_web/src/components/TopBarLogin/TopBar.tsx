import React from 'react';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Button } from '@material-ui/core';

import { useStyles } from './styles';

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar className={classes.container}>
          <Box className={classes.title}>
            <Link href="/">
              <img
                src="/Logo_wenzer.png"
                alt="Logo"
                style={{ width: '50px', marginRight: '10px' }}
              />
            </Link>
            <h2>Wenzer</h2>
          </Box>
          <Box className={classes.sectionDesktop}>
            <Link href="/welcome">
              <Button
                className={classes.button}
                type="button"
                variant="outlined"
                color="primary"
              >
                Entrar
              </Button>
            </Link>
            <Link href="register">
              <Button
                className={classes.button}
                type="button"
                variant="contained"
                color="primary"
              >
                Cadastre-se
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
