// Configura o menu mobile responsivo
export function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuButton || !mainNav) return;
  
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });
  
    // Fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuButton.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    });
  
    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-button') &&
            mainNav.classList.contains('active')) {
            menuButton.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
        }
    });
  
    // Resize observer
    const resizeObserver = new ResizeObserver(entries => {
        if (window.innerWidth > 768) {
            menuButton.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
        }
    });
    
    resizeObserver.observe(document.body);
}