export interface SnackbarMessageProps {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error' | undefined;
    isVisible: boolean;
    closeSnackbar: () => void;
}
