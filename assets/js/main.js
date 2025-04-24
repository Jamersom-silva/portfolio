// Configurações gerais e inicialização
import { updateCurrentYear } from './utils.js';
import { setupMobileMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCurrentYear();
        setupMobileMenu();
        
        // Verifica se o tema foi salvo no localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Configura o botão de alternar tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            updateThemeIcon(savedTheme);
        }
    } catch (error) {
        console.error('Error initializing main scripts:', error);
    }
});

// Alternar entre tema claro e escuro
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Atualiza o ícone do tema
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}