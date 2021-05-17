import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#B732A2',
    },
    secondary: {
      main: '#222222',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#18191A',
    },
    text: {
      primary: '#FFFFFF',
    },    
  },
});

export default theme;