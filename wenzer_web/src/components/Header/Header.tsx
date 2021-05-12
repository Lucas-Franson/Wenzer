import React, { ReactElement } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useStyles } from './styles';

export default function Header():ReactElement {
  const classes = useStyles();

    return (
      <Paper className={classes.root} elevation={2}>
        <p>Wenzer + NextJS + Material-UI</p>
        <Button variant="contained" color="primary" >Sign-in</Button>
      </Paper>
    );
}