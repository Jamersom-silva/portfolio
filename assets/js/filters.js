// Configura o sistema de filtro de projetos
export function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    if (filterButtons.length === 0 || projectCards.length === 0) return;
  
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            // Adiciona classe active no botão clicado
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            
            const filter = button.dataset.filter;
            
            // Filtra os projetos
            projectCards.forEach(card => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                card.style.display = shouldShow ? 'block' : 'none';
                card.setAttribute('aria-hidden', !shouldShow);
            });
    
            // Anima a transição
            animateProjectFilter();
        });
    });
}
  
// Animação suave ao filtrar projetos
function animateProjectFilter() {
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        grid.style.opacity = '0.5';
        grid.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            grid.style.opacity = '1';
        }, 300);
    }
}