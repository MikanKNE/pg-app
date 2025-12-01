'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import MessageSnackbar from '../components/MessageSnackbar';
import { useRouter } from 'next/navigation';
import { apiAuthFetch, errorHandling } from '@/lib/apiFetch';

type Memo = {
  id: number;
  title: string;
  content: string | null;
};

export default function MemosPage() {
  // 新規作成用
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // メモ一覧
  const [memos, setMemos] = useState<Memo[]>([]);

  // 編集用
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // メッセージ
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ユーザー情報
  const [userEmail, setUserEmail] = useState('');

  const router = useRouter();

  // ログアウト
  async function logout() {
    setError('');
    try {
      await apiAuthFetch(`/api/auth/logout`, { method: 'POST' });
    } finally {
      localStorage.removeItem('user_session');
      router.push('/');
    }
  }

  // メモ一覧取得
  const loadMemos = async () => {
    await errorHandling(async () => {
      const json = await apiAuthFetch('/api/memos');
      setMemos(json);
    }, setError);
  };

  useEffect(() => {
    loadMemos();

    // ユーザー情報取得
    const session = localStorage.getItem('user_session');
    if (session) {
      const user = JSON.parse(session);
      if (user.email) setUserEmail(user.email);
      else if (user.user?.email) setUserEmail(user.user.email);
    }
  }, []);

  // メモ作成
  async function createMemo() {
    if (!title) return setError('タイトルを入力してください');
    await errorHandling(async () => {
      await apiAuthFetch('/api/memos', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });
      setTitle('');
      setContent('');
      await loadMemos();
      setSuccessMessage('メモを登録しました');
    }, setError);
  }

  // メモ削除
  async function deleteMemo(id: number) {
    await errorHandling(async () => {
      await apiAuthFetch(`/api/memos/${id}`, { method: 'DELETE' });
      await loadMemos();
    }, setError);
  }

  // 編集開始
  function startEdit(memo: Memo) {
    setEditingId(memo.id);
    setEditTitle(memo.title);
    setEditContent(memo.content || '');
  }

  // 編集キャンセル
  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  }

  // メモ更新
  async function updateMemo() {
    if (editingId === null) return;
    await errorHandling(async () => {
      await apiAuthFetch(`/api/memos/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      cancelEdit();
      await loadMemos();
      setSuccessMessage('メモを更新しました');
    }, setError);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mt-24 px-4 space-y-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          {/* ユーザー情報とログアウト */}
          <div className="flex justify-between items-center mb-4">
            <Typography className="truncate">{userEmail}</Typography>
            <Button
              variant="outlined"
              onClick={logout}
              sx={{ ml: 2 }}
            >
              ログアウト
            </Button>
          </div>

          {/* メモ作成 */}
          <Typography variant="h5" className="text-center font-bold mb-4">
            メモ作成
          </Typography>

          <TextField
            fullWidth
            label="タイトル"
            sx={{ mb: 1 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="内容"
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

      {/* メモ一覧 */}
      {memos.map((memo) => (
        <Card key={memo.id} className="w-full max-w-md shadow">
          <CardContent>
            {editingId === memo.id ? (
              <>
                <TextField
                  fullWidth
                  label="タイトル"
                  sx={{ mb: 1 }}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="内容"
                  multiline
                  rows={3}
                  sx={{ mb: 1 }}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Button onClick={updateMemo} sx={{ mr: 1 }}>更新</Button>
                <Button onClick={cancelEdit}>キャンセル</Button>
              </>
            ) : (
              <>
                <Typography variant="h6">{memo.title}</Typography>
                <Typography>{memo.content}</Typography>
                <Button onClick={() => startEdit(memo)} sx={{ mr: 1 }}>編集</Button>
                <Button onClick={() => deleteMemo(memo.id)}>削除</Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      {/* スナックバー */}
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
