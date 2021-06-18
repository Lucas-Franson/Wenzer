import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            primary: string;
            primaryLight: string,
            secondary: string;
            tertiary: string;
            background: string;

            white: {
                light: string,
                dark: string
            };
            black: string;
            grey: string;

            succes: string;
            info: string;
            warning: string;
        }
    };
}
