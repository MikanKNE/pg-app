document.addEventListener('DOMContentLoaded', () => {

    // --- トークン管理 ---
    const sessionData = JSON.parse(localStorage.getItem('user_session'));
    const accessToken = sessionData?.access_token;

    // --- ログイン済の確認 (初期表示時) ---
    (() => {
        if (!accessToken) {
            localStorage.removeItem('user_session');
            window.location.href = '/index.html';
            return;
        }
        document.getElementById('user-email').textContent = sessionData.user?.email;
    })();

    // --- ログアウト処理 ---
    document.getElementById('logout-btn').onclick = async () => {
        try {
            await apiFetch('/api/auth/logout', { method: 'POST' }, accessToken);
            localStorage.removeItem('user_session');
            window.location.href = '/index.html';
        } catch (error) {
            showError(error.message);
        }
    };

});
