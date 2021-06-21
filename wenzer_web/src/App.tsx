import Routes from './Routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/GlobalStyles';
import { useTheme } from './Styles/Hook/theme';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
