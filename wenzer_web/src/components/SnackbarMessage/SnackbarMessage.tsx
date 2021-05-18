import React, { ReactElement } from 'react';
import { makeStyles, Snackbar, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SnackbarMessageProps } from './types';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: '50px'
  },
}));

export default function UnoSnackbarMessage({
    type,
    message,
    isVisible,
    closeSnackbar,
}: SnackbarMessageProps): ReactElement {

  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  const classes = useStyles();

  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className={classes.root}
      open={isVisible}
      onClose={closeSnackbar}
      autoHideDuration={3500}
      TransitionComponent={SlideTransition}
    >
      <Alert severity={type} onClose={closeSnackbar}>
        {message}
      </Alert>
    </Snackbar>

  );
}
