import { createContext, useState, ReactElement, ReactNode, useContext } from 'react';

import dark from '../Themes/dark';
import light from "../Themes/light";

interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface IChildrenContext {
    children: ReactNode;
}

interface ITheme {
  title: string;

  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    tertiary: string;
    background: string;

    white: {
      light: string,
      dark: string,
    };
    black: string;
    grey: string;

    succes: string;
    info: string;
    warning: string;
  };
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider({ children }: IChildrenContext): ReactElement {
  const [theme, setTheme] = useState<ITheme>(() => {
      const themeSaved = localStorage.getItem('WenzerTheme');

      if(themeSaved) {
          return JSON.parse(themeSaved);
      } else {
          return dark
      }
  });

  function toggleTheme() {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem("WenzerTheme", JSON.stringify(light));
    } else {
      setTheme(dark);
      localStorage.setItem("WenzerTheme", JSON.stringify(dark));
    }
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);
    return context;
}

export {useTheme, ThemeProvider }