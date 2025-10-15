/*
================================================================================
|                                                                              |
|                      SCRIPT GERAL - ONG MÃOS QUE AJUDAM                        |
|                                                                              |
================================================================================
|                                                                              |
| Este arquivo contém todos os scripts de interatividade do site.              |
| Ele pode ser incluído em todas as páginas HTML com segurança, pois            |
| cada funcionalidade só é ativada se os elementos HTML existirem na página.   |
|                                                                              |
| Funcionalidades incluídas:                                                   |
| 1. Menu Mobile (Hambúrguer)                                                  |
| 2. Modal de Feedback                                                         |
| 3. Toast de Notificação                                                      |
| 4. Botão para Copiar Chave PIX                                               |
| 5. Gráficos da Página de Transparência                                       |
|                                                                              |
--------------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", function() {

    /**
     * 1. SCRIPT PARA MENU MOBILE (HAMBÚRGUER)
     * Funciona em todas as páginas.
     */
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    /**
     * 2. SCRIPT PARA O MODAL DE FEEDBACK
     * Executado apenas na página de início (index.html).
     */
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (modal && openModalBtn && closeModalBtn) {
        const openModal = () => modal.classList.remove('hidden');
        const closeModal = () => modal.classList.add('hidden');

        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    /**
     * 3. SCRIPT PARA O TOAST DE NOTIFICAÇÃO
     * Executado apenas na página de início (index.html).
     */
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

    /**
     * 4. SCRIPT PARA COPIAR A CHAVE PIX
     * Executado apenas na página de doações (doacoes.html).
     */
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
            }).catch(err => {
                console.error('Erro ao copiar a chave PIX: ', err);
                copyPixBtn.textContent = 'ERRO';
                 setTimeout(() => {
                    copyPixBtn.textContent = 'COPIAR';
                }, 2000);
            });
        });
    }

    /**
     * 5. LÓGICA DOS GRÁFICOS PARA A PÁGINA DE TRANSPARÊNCIA
     * Executado apenas na página de transparência (transparencia.html).
     */
    const isTransparencyPage = !!document.getElementById('pieChart');

    if (isTransparencyPage) {
        const themeColors = tailwind.config.theme.extend.colors;

        Chart.defaults.font.family = 'Inter, sans-serif';
        Chart.defaults.font.weight = '500';

        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Educação (45%)', 'Saúde (25%)', 'Geração de Renda (20%)', 'Administrativo (10%)'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        themeColors.primary['500'],
                        themeColors.secondary['500'],
                        themeColors.feedback['success'],
                        themeColors.neutral['300']
                    ],
                    borderColor: themeColors.neutral['100'],
                    hoverOffset: 8
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'top' } } }
        });

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Número de Voluntários',
                    data: [120, 180, 250, 350, 510],
                    fill: false,
                    borderColor: themeColors.primary['600'],
                    backgroundColor: themeColors.primary['600'],
                    tension: 0.1
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });

        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Zona Leste', 'Zona Norte', 'Zona Sul', 'Centro', 'Zona Oeste'],
                datasets: [{
                    label: 'Pessoas Atendidas',
                    data: [4500, 2200, 1800, 500, 1000],
                    backgroundColor: [
                        themeColors.primary['400'],
                        themeColors.primary['500'],
                        themeColors.primary['600'],
                        themeColors.primary['700'],
                        themeColors.primary['800']
                    ]
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
    }

});