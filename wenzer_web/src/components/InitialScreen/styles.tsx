import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  initialScreen: {
    background: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },

  container: {
    width: 'min(90vw, 1300px)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  image: {
    marginTop: '50px',
    objectFit: 'cover',
    width: '500px',
  },

  formLogin: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '450px',
    height: '350px',
    borderRadius: '7px',

    background: theme.palette.text.primary,
    color: theme.palette.secondary.main,
  },

  button: {
    margin: '40px 0',
    padding: '10px 130px',
  },

  loginText: {
    marginBottom: '50px',
    textAlign: 'center'
  },
}));
