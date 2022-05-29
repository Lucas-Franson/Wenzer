import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './Styles/Hook/theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { useWenzer } from './hooks/useWenzer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

