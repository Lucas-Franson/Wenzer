import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#B732A2',
    },
    secondary: {
      main: '#202020',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#181818',
    },
    text: {
      primary: '#FFFFFF',
    },    
  },
});

export default theme;