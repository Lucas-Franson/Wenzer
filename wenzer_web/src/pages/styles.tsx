import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  feed: {
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
}));