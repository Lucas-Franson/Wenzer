import Routes from './Routes/index';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/GlobalStyles';
import { useTheme } from './Styles/Hook/theme';
import { AuthProvider } from './Services/Authentication/auth';
import { useWenzer, WenzerProvider } from './hooks/useWenzer';
import { useRef } from 'react';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <WenzerProvider>
          <GlobalStyles />
          <Routes />
        </WenzerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
