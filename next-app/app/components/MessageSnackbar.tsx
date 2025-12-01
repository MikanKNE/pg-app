'use client';

import { Snackbar, Alert } from '@mui/material';

interface Props {
  message: string;
  severity?: 'success' | 'error';
  onClose: () => void;
}

export default function MessageSnackbar({ message, severity = 'success', onClose }: Props) {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
