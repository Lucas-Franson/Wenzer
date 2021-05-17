import React, { ReactElement } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SnackbarMessageProps } from './types';

export default function UnoSnackbarMessage({
    type,
    message,
    isVisible,
    closeSnackbar,
}: SnackbarMessageProps): ReactElement {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isVisible}
            onClose={closeSnackbar}
            autoHideDuration={5000}
        >
            <Alert severity={type} onClose={closeSnackbar}>
                {message}
            </Alert>
        </Snackbar>
    );
}
