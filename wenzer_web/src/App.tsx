import Routes from './Routes/index';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/GlobalStyles';
import { useTheme } from './Styles/Hook/theme';
import { AuthProvider } from './Services/Authentication/auth';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
