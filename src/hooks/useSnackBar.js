import React from 'react';
import { useSnackbar } from 'notistack';

function useSnackBar(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const success = (message) => {
        enqueueSnackbar(message, {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }
        })
    }
    const error = (message) => {
        enqueueSnackbar(message, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }
        })
    }
    return {
        success,
        error
    }
}

export default useSnackBar;