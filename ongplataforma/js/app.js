import { getHeader, getFooter } from './templates.js';
import { initializePageScripts } from './main.js';

// Objeto de rotas (sem alterações)
const routes = {
    '/':              { path: 'pages/inicio.html',       pageName: 'inicio' },
    '/sobre':         { path: 'pages/sobre.html',        pageName: 'sobre' },
    '/projetos':      { path: 'pages/projetos.html',     pageName: 'projetos' },
    '/voluntariado':  { path: 'pages/voluntariado.html', pageName: 'voluntariado' },
    '/doacoes':       { path: 'pages/doacoes.html',      pageName: 'doacoes' },
    '/transparencia': { path: 'pages/transparencia.html',pageName: 'transparencia' },
    '/blog':          { path: 'pages/blog.html',         pageName: 'blog' },
    '/contato':       { path: 'pages/contato.html',      pageName: 'contato' },
};

const router = async () => {
    // Lógica para ler a URL (sem alterações)
    const path = window.location.hash.substring(1) || '/';
    const route = routes[path] || routes['/'];

    const contentContainer = document.getElementById('app-content');
    contentContainer.classList.remove('fade-in');
    
    try {
        const response = await fetch(route.path);
        if (!response.ok) throw new Error('Página não encontrada');
        const content = await response.text();
        
        // Injeta o HTML (sem alterações)
        document.getElementById('main-header').innerHTML = getHeader(route.pageName);
        contentContainer.innerHTML = content;
        document.getElementById('main-footer').innerHTML = getFooter();
        
        // Aplica a animação de fade-in (sem alterações)
        setTimeout(() => contentContainer.classList.add('fade-in'), 10);
        
        // ===================================================================
        // A CORREÇÃO ESTÁ AQUI
        // Adicionamos um pequeno atraso para dar tempo ao navegador de 
        // processar o novo HTML antes de rodar os scripts dos componentes.
        setTimeout(initializePageScripts, 50); 
        // ===================================================================
        
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        contentContainer.innerHTML = `<h1 class="text-center text-h1 p-16 text-feedback-error">Erro 404: Página não encontrada.</h1>`;
    }
};

// Event listeners (sem alterações)
window.addEventListener('load', router);
window.addEventListener('hashchange', router);