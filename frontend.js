// ========== GOOGLE LOGIN REAL ==========
function initGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '205977709770-3d0am349pfuhpv45soo1qt5o6h7cbofk.apps.googleusercontent.com',
    callback: handleGoogleCredential
  });
  
  google.accounts.id.renderButton(
    document.getElementById('google-login-btn'),
    { theme: 'outline', size: 'large', width: '100%' }
  );
}

async function handleGoogleCredential(response) {
  const { credential } = response;
  
  showToast('⏳ Verifikasi Google...', false);
  
  try {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential })
    });
    
    const data = await res.json();
    
    if (data.success) {
      localStorage.setItem('hiroko_token', data.token);
      localStorage.setItem('hiroko_user', JSON.stringify(data.user));
      
      currentUser = data.user;
      isPremium = data.user.premium;
      
      document.getElementById('auth-overlay').style.display = 'none';
      updateUserUI();
      updatePlanUI();
      
      showToast(`✅ Selamat datang, ${data.user.name}!`, false);
      
      // LOAD SESSIONS DARI BACKEND
      await loadSessionsFromBackend();
    } else {
      showToast('❌ Login Google gagal!', true);
    }
  } catch(e) {
    console.error(e);
    showToast('❌ Server error! Coba lagi.', true);
  }
}