// EVENT LISTENER UNTUK BUTTON MULAI CHAT
        // UDAH LANGSUNG REDIRECT KE halaman.html
        document.getElementById('startChatBtn')?.addEventListener('click', (e) => {
            // GAK USAH preventDefault biar linknya jalan
            // Redirectnya udah otomatis dari href="halaman.html"
            console.log("Redirecting ke halaman.html...");
        });

        // TAMBAHAN: KALO MAU PAKAI ANIMASI LOADING, UNCOMMENT YG INI
        /*
        document.getElementById('startChatBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = e.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengarahkan...';
            setTimeout(() => {
                window.location.href = 'halaman.html';
            }, 300);
        });
        */