'use client';

import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MessageSnackbar from './components/MessageSnackbar';
import { useRouter } from 'next/navigation';
import { apiFetch, errorHandling } from '@/lib/apiFetch';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  
  const login = async () => {
    await errorHandling(async () => {
      const json = await apiFetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!json.access_token || !json.refresh_token) {
        throw new Error('トークンが取得できませんでした.');
      }
      localStorage.setItem('user_session', JSON.stringify(json));
      router.push('/memos');
    }, setError);
  };

  const loginGithub = () => {
    window.location.href = '/api/auth/oauth2/github';
  };

  const register = async () => {
    await errorHandling(async () => {
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSuccessMessage(
        '登録リクエストを送信しました。Supabaseから確認メールが届いているか確認してください。'
      );
    }, setError);
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('user_session')) {
        router.push('/memos');
        return;
      }
      const sessionData = Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );
      const accessToken = sessionData?.access_token;
      if (!accessToken) return;
      const userData = await apiFetch('/api/auth/user', {}, accessToken);
      if (userData.email) sessionData.user = userData;
      localStorage.setItem('user_session', JSON.stringify(sessionData));
      router.push('/memos');
    })();
  }, [router]);

  return (
    <div className="w-full flex items-center justify-center mt-24 px-4">
      <Card className="w-full max-w-md shadow-xl" variant="outlined">
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }} className="text-center font-bold">
            ログイン／新規登録
          </Typography>

          <TextField
            label="メールアドレス"
            fullWidth
            type="email"
            sx={{ mb: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="パスワード"
            fullWidth
            type="password"
            sx={{ mb: 1 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            className="w-full py-2"
            sx={{
              mb: 1, bgcolor: 'gray', color: 'white',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={login}
          >
            ログイン
          </Button>

          <Button
            variant="contained"
            className="w-full py-2"
            sx={{
              mb: 1, bgcolor: 'gray', color: 'white',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={register}
          >
            新規登録
          </Button>

          <Button
            variant="contained"
            className="w-full py-2 flex items-center gap-2"
            sx={{
              bgcolor: 'black', color: 'white',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={loginGithub}
          >
            <GitHubIcon />
            GitHub ログイン
          </Button>
        </CardContent>
      </Card>

      {/* エラー */}
      <MessageSnackbar
        message={error}
        severity="error"
        onClose={() => setError('')}
      />

      {/* 成功 */}
      <MessageSnackbar
        message={successMessage}
        severity="success"
        onClose={() => setSuccessMessage('')}
      />
    </div>
  );
}
