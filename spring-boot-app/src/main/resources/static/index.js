document.addEventListener('DOMContentLoaded', () => {
    
    // --- ユーザ登録(メール) ---
    document.getElementById('signup-btn').onclick = async () => {
        showError('');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await apiFetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            alert('登録リクエストを送信しました。Supabaseから確認メールが届いているか確認してください。');
        } catch (error) {
            showError(error.message);
        }
    };

    // --- ログイン済の確認 (初期表示時) ---
    (async () => {
        // URLの # 以降よりセッション情報取得
        const sessionData = Object.fromEntries(new URLSearchParams(window.location.hash.substring(1)));
        const accessToken = sessionData?.access_token;
        if (!accessToken) return;
        // ユーザ情報(Eメール)取得してメモに遷移
        const userData = await apiFetch('/api/auth/user', {}, accessToken);
        if (userData.email) sessionData.user = userData;        
        localStorage.setItem('user_session', JSON.stringify(sessionData));
        window.location.href = '/memo.html';
    })();
});