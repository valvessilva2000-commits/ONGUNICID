const getHeader = (activePage = '') => {
    const isActive = (page) => page === activePage 
        ? 'text-primary-600 font-semibold border-b-2 border-primary-600' 
        : 'text-neutral-600 hover:text-primary-600';

    return `
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#/" class="text-2xl font-bold text-primary-600">ONG Mãos que Ajudam</a>
        <div class="hidden md:flex space-x-8 items-center">
             <a href="#/" class="${isActive('inicio')}">Início</a>
             <a href="#/sobre" class="${isActive('sobre')}">Sobre Nós</a>
             <div class="relative dropdown">
                 <a href="#/projetos" class="${isActive('projetos')}">Projetos <i class="fas fa-chevron-down text-xs"></i></a>
                 <div class="dropdown-menu absolute hidden bg-white shadow-lg rounded-md mt-2 py-2 w-48 z-10">
                     <a href="#/projetos#educacao" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Educação</a>
                     <a href="#/projetos#saude" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Saúde</a>
                     <a href="#/projetos#renda" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Geração de Renda</a>
                 </div>
             </div>
             <a href="#/voluntariado" class="${isActive('voluntariado')}">Voluntariado</a>
             <a href="#/doacoes" class="${isActive('doacoes')}">Doações</a>
             <a href="#/transparencia" class="${isActive('transparencia')}">Transparência</a>
             <a href="#/blog" class="${isActive('blog')}">Blog</a>
             <a href="#/contato" class="${isActive('contato')}">Contato</a>
        </div>
         <a href="#/doacoes" class="hidden md:block bg-primary-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600 transition duration-300">
            Doe Agora
        </a>
        <button class="md:hidden" id="mobile-menu-button">
            <i class="fas fa-bars text-2xl"></i>
        </button>
    </nav>
    <div class="hidden md:hidden" id="mobile-menu"></div>
    `;
};

const getFooter = () => { /* ... seu código do footer completo aqui ... */ };

export { getHeader, getFooter };