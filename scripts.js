// scripts.js (Versão Final Completa)

// --- FUNÇÃO GLOBAL PARA A GALERIA ---
// Esta função precisa ficar fora do 'DOMContentLoaded' para ser acessível pelo 'onclick' no HTML.
function trocarImagem(miniaturaClicada, novaLegenda) {
    const imagemPrincipal = document.getElementById('imagem-principal-galeria');
    const legenda = document.getElementById('legenda-galeria');

    if (imagemPrincipal && legenda) {
        // Usa 'dataset.src' para imagens com lazy loading ou 'src' como fallback
        imagemPrincipal.src = miniaturaClicada.dataset.src || miniaturaClicada.src;
        legenda.textContent = novaLegenda;

        // Atualiza qual miniatura está com a borda ativa
        document.querySelectorAll('.galeria-miniaturas .miniatura').forEach(m => m.classList.remove('ativa'));
        miniaturaClicada.classList.add('ativa');
    }
}


// --- LÓGICA PRINCIPAL DO SITE ---
// Executa somente após o carregamento completo da estrutura da página.
document.addEventListener('DOMContentLoaded', () => {
    
    // FUNCIONALIDADE 1: MODO CLARO/ESCURO
    const themeSwitch = document.getElementById('theme-switch-slider');
    const body = document.body;
    if (themeSwitch) {
        // Verifica se há um tema salvo no armazenamento local do navegador
        if (localStorage.getItem('theme') === 'light') {
            body.classList.add('light-mode');
        }
        // Adiciona o evento de clique para alternar o tema
        themeSwitch.parentElement.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            // Salva a preferência do usuário no armazenamento local
            localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // FUNCIONALIDADE 2: ANIMAÇÃO AO ROLAR (SCROLL REVEAL) E CARREGAMENTO DE IMAGENS (LAZY LOADING)
    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Ação para Lazy Loading: carrega a imagem
                if (target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src'); // Remove para não carregar de novo
                }

                // Ação para Scroll Reveal: torna o elemento visível
                target.classList.add('visible');

                // Para de observar o elemento para otimizar a performance
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Aplica o observador a todos os elementos que precisam de animação ou lazy loading
    document.querySelectorAll('.reveal-on-scroll, [data-src]').forEach(el => intersectionObserver.observe(el));


    // FUNCIONALIDADE 3: GRÁFICOS (PÁGINA DE TRANSPARÊNCIA)
    // Esta função só será chamada se a biblioteca Chart.js estiver carregada
    const renderizarGraficos = () => {
        // Gráfico de Pizza: Distribuição de Recursos
        const ctxPizza = document.getElementById('graficoPizza');
        if (ctxPizza) {
            new Chart(ctxPizza, {
                type: 'pie',
                data: {
                    labels: ['Cirurgias', 'Medicamentos', 'Logística Familiar', 'Custos Administrativos'],
                    datasets: [{
                        label: 'Distribuição de Recursos (%)',
                        data: [50, 25, 15, 10],
                        backgroundColor: ['#D4AF37', '#b89c31', '#9e892b', '#847625'],
                        borderColor: 'var(--cor-card)',
                        borderWidth: 2
                    }]
                }
            });
        }
        
        // Gráfico de Linha: Evolução de Voluntários
        const ctxLinha = document.getElementById('graficoLinha');
        if (ctxLinha) {
            new Chart(ctxLinha, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
                    datasets: [{
                        label: 'Novos Voluntários Cadastrados',
                        data: [5, 8, 12, 10, 15, 18, 22, 25, 23, 30],
                        borderColor: '#D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        fill: true,
                        tension: 0.1
                    }]
                }
            });
        }

        // Gráfico de Barras: Impacto por Região
        const ctxBarras = document.getElementById('graficoBarras');
        if (ctxBarras) {
            new Chart(ctxBarras, {
                type: 'bar',
                data: {
                    labels: ['Luanda', 'Huambo', 'Benguela', 'Bié'],
                    datasets: [{
                        label: 'Crianças Atendidas por Região',
                        data: [18, 12, 9, 5],
                        backgroundColor: '#D4AF37'
                    }]
                }
            });
        }
    };
    // Garante que os gráficos só tentem ser renderizados na página correta
    if (window.location.pathname.includes('transparencia.html')) {
        renderizarGraficos();
    }

    // FUNCIONALIDADE 4: MÁSCARAS DE FORMULÁRIO (PÁGINA DE VOLUNTARIADO)
    // Verifica se a biblioteca IMask foi carregada antes de tentar usá-la
    if (typeof IMask !== 'undefined') {
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) IMask(telefoneInput, { mask: '(00) 00000-0000' });

        const cpfInput = document.getElementById('cpf');
        if (cpfInput) IMask(cpfInput, { mask: '000.000.000-00' });
        
        const cepInput = document.getElementById('cep');
        if (cepInput) IMask(cepInput, { mask: '00000-000' });
    }
});

