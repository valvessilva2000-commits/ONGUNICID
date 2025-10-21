export function initializePageScripts() {
    
    // Script para menu mobile (Hambúrguer)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Script para o Modal de Feedback
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (modal && openModalBtn && closeModalBtn) {
        const openModal = () => modal.classList.remove('hidden');
        const closeModal = () => modal.classList.add('hidden');
        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }
    
    // Script para o Toast de Notificação
    const toast = document.getElementById('toast');
    const showToastBtn = document.getElementById('show-toast-btn');
    if (toast && showToastBtn) {
        showToastBtn.addEventListener('click', () => {
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        });
    }

    // Script para Copiar a Chave PIX
    const copyPixBtn = document.getElementById('copy-pix-btn');
    const pixKeyInput = document.getElementById('pix-key');
    if (copyPixBtn && pixKeyInput) {
        copyPixBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pixKeyInput.value).then(() => {
                copyPixBtn.textContent = 'COPIADO!';
                copyPixBtn.classList.add('bg-feedback-success');
                setTimeout(() => {
                    copyPixBtn.textContent = 'COPIAR';
                    copyPixBtn.classList.remove('bg-feedback-success');
                }, 2000);
            }).catch(err => console.error('Erro ao copiar a chave PIX: ', err));
        });
    }

    // Lógica dos Gráficos para a Página de Transparência
    const isTransparencyPage = !!document.getElementById('pieChart');
    if (isTransparencyPage) {
        try {
            const themeColors = tailwind.config.theme.extend.colors;
            Chart.defaults.font.family = 'Inter', 'sans-serif';

            // Gráfico de Pizza
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Educação (45%)', 'Saúde (25%)', 'Geração de Renda (20%)', 'Administrativo (10%)'],
                    datasets: [{ data: [45, 25, 20, 10], backgroundColor: [themeColors.primary['500'], themeColors.secondary['500'], themeColors.feedback['success'], themeColors.neutral['300']], borderColor: themeColors.neutral['100'], hoverOffset: 8 }]
                },
                options: { responsive: true, plugins: { legend: { position: 'top' } } }
            });

            // Gráfico de Linha
            const lineCtx = document.getElementById('lineChart').getContext('2d');
            new Chart(lineCtx, {
                type: 'line',
                data: { labels: ['2020', '2021', '2022', '2023', '2024'], datasets: [{ label: 'Número de Voluntários', data: [120, 180, 250, 350, 510], fill: false, borderColor: themeColors.primary['600'], backgroundColor: themeColors.primary['600'], tension: 0.1 }] },
                options: { responsive: true, scales: { y: { beginAtZero: true } } }
            });

            // Gráfico de Barras
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: { labels: ['Zona Leste', 'Zona Norte', 'Zona Sul', 'Centro', 'Zona Oeste'], datasets: [{ label: 'Pessoas Atendidas', data: [4500, 2200, 1800, 500, 1000], backgroundColor: [themeColors.primary['400'], themeColors.primary['500'], themeColors.primary['600'], themeColors.primary['700'], themeColors.primary['800']] }] },
                options: { responsive: true, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
            });
        } catch (e) {
            console.error("Erro ao renderizar os gráficos:", e);
        }
    }
}