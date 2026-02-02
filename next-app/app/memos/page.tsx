'use client';

import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import MessageSnackbar from '../components/MessageSnackbar';
import { apiAuthFetch, errorHandling } from '@/lib/apiFetch';

/**
 * メモ型
 */
type Memo = {
  id: number;
  title: string;
  content: string | null;
};

export default function MemosPage() {
  /* -----------------------------
   * state
   * ----------------------------- */

  // 新規作成
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // AI要約中
  const [isSummarizing, setIsSummarizing] = useState(false);

  // 一覧
  const [memos, setMemos] = useState<Memo[]>([]);

  // 編集
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // メッセージ
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ユーザー情報
  const [userEmail, setUserEmail] = useState('');

  const router = useRouter();

  /* -----------------------------
   * 共通処理
   * ----------------------------- */

  // メモ一覧取得
  const loadMemos = async () => {
    await errorHandling(async () => {
      const json = await apiAuthFetch('/api/memos');
      setMemos(json);
    }, setError);
  };

  /* -----------------------------
   * 初期処理
   * ----------------------------- */
  useEffect(() => {
    loadMemos();

    const session = localStorage.getItem('user_session');
    if (!session) return;

    try {
      const user = JSON.parse(session);
      if (user.email) setUserEmail(user.email);
      else if (user.user?.email) setUserEmail(user.user.email);
    } catch {
      // JSON壊れてても落とさない
    }
  }, []);

  /* -----------------------------
   * 認証
   * ----------------------------- */

  // ログアウト
  async function logout() {
    setError('');
    try {
      await apiAuthFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('user_session');
      router.push('/');
    }
  }

  /* -----------------------------
   * AI 要約
   * ----------------------------- */

  async function summarizeByAI() {
    if (!title) {
      setError('要約するタイトルを入力してください');
      return;
    }

    setIsSummarizing(true);
    setError('');

    await errorHandling(async () => {
      const res = await apiAuthFetch('/api/ai/summary', {
        method: 'POST',
        body: JSON.stringify({
          query: title,
        }),
      });

      // Difyの結果を内容に反映
      setContent(res.summary);
      setSuccessMessage('AI要約が完了しました');
    }, setError);

    setIsSummarizing(false);
  }

  /* -----------------------------
   * CRUD
   * ----------------------------- */

  // 作成
  async function createMemo() {
    if (!title) {
      setError('タイトルを入力してください');
      return;
    }

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

  // 削除
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
    setEditContent(memo.content ?? '');
  }

  // 編集キャンセル
  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  }

  // 更新
  async function updateMemo() {
    if (editingId === null) return;

    await errorHandling(async () => {
      await apiAuthFetch(`/api/memos/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      cancelEdit();
      await loadMemos();
      setSuccessMessage('メモを更新しました');
    }, setError);
  }

  /* -----------------------------
   * JSX
   * ----------------------------- */
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-24 px-4 space-y-4 overflow-y-auto">
      {/* ヘッダー */}
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography className="truncate">
              {userEmail}
            </Typography>
            <Button variant="outlined" onClick={logout}>
              ログアウト
            </Button>
          </div>

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

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            disabled={isSummarizing}
            onClick={summarizeByAI}
          >
            {isSummarizing ? 'AI要約中...' : 'AIで要約'}
          </Button>

          <TextField
            fullWidth
            label="内容（AI要約結果）"
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

      {/* 一覧 */}
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
                <Button onClick={updateMemo} sx={{ mr: 1 }}>
                  更新
                </Button>
                <Button onClick={cancelEdit}>
                  キャンセル
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6">
                  {memo.title}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  {memo.content}
                </Typography>
                <Button onClick={() => startEdit(memo)} sx={{ mr: 1 }}>
                  編集
                </Button>
                <Button onClick={() => deleteMemo(memo.id)}>
                  削除
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      {/* メッセージ */}
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
