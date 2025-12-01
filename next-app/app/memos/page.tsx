'use client';

import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import MessageSnackbar from '../components/MessageSnackbar';
import { useRouter } from 'next/navigation';
import { apiAuthFetch, errorHandling  } from '@/lib/apiFetch';

export default function MemosPage() {
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  async function logout() {
    setError('');
    try {
      await apiAuthFetch(`/api/auth/logout`, {
        method: 'POST',
      });
    } finally {
      localStorage.removeItem('user_session');
      router.push('/');
    }
  }

  async function createMemo() {
    if (!memo) {
      setError('登録失敗しました。');
      return;
    }
    setSuccessMessage('メモを登録しました。');
  }

  return (
    <div className="w-full flex items-center justify-center mt-24 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={logout}
          >
            ログアウト
          </Button>
          
          <Typography variant="h5" className="text-center font-bold mb-4">
            メモ作成
          </Typography>

          <TextField
            fullWidth
            label="メモ内容"
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={createMemo}
          >
            登録
          </Button>
        </CardContent>
      </Card>

      <MessageSnackbar
        message={error}
        severity="error"
        onClose={() => setError('')}
      />

      <MessageSnackbar
        message={successMessage}
        severity="success"
        onClose={() => setSuccessMessage('')}
      />
    </div>
  );
}
