// projects.js - Funcionalidades da página de projetos

import { updateCurrentYear } from './utils.js';

// Dados dos projetos (pode ser substituído por uma chamada API)
const projectsData = {
    1: {
        title: "Loja Virtual Completa",
        category: "Full-Stack",
        description: "Plataforma de e-commerce desenvolvida com React para o front-end e Node.js para o back-end. O sistema inclui carrinho de compras, checkout seguro com múltiplos métodos de pagamento, painel administrativo completo e integração com APIs de frete.",
        features: [
            "Catálogo de produtos com filtros avançados",
            "Sistema de avaliações e comentários",
            "Cupons de desconto e promoções",
            "Relatórios de vendas e analytics",
            "Integração com PagSeguro e Mercado Pago"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Redux", "Express"],
        duration: "3 meses",
        linesOfCode: "15k",
        demoUrl: "#",
        codeUrl: "#",
        images: [
            "assets/images/projetos/projeto1-full.jpg",
            "assets/images/projetos/projeto1-2.jpg",
            "assets/images/projetos/projeto1-3.jpg"
        ],
        video: null
    },
    2: {
        title: "Dashboard Financeiro",
        category: "Front-End",
        description: "Painel administrativo para visualização de dados financeiros em tempo real, desenvolvido com Vue.js e Chart.js. O dashboard permite a exportação de relatórios em PDF, Excel e CSV, além de notificações em tempo real para eventos importantes.",
        features: [
            "Grágicos interativos e personalizáveis",
            "Exportação de dados em múltiplos formatos",
            "Filtros avançados por período e categoria",
            "Autenticação JWT e controle de acesso",
            "Responsivo para todos os dispositivos"
        ],
        technologies: ["Vue.js", "Chart.js", "Tailwind CSS", "Firebase"],
        duration: "6 semanas",
        linesOfCode: "8k",
        demoUrl: "#",
        codeUrl: "#",
        images: [
            "assets/images/projetos/projeto2-1.jpg",
            "assets/images/projetos/projeto2-2.jpg",
            "assets/images/projetos/projeto2-3.jpg"
        ],
        video: null
    },
    3: {
        title: "App Fitness Track",
        category: "Mobile",
        description: "Aplicativo mobile para acompanhamento de atividades físicas e nutrição, desenvolvido com React Native. O app se integra com wearables como Apple Watch e Fitbit, oferecendo estatísticas detalhadas e planos personalizados de treino e dieta.",
        features: [
            "Acompanhamento de atividades em tempo real",
            "Planos de treino personalizados",
            "Controle nutricional com scanner de alimentos",
            "Integração com Apple Health e Google Fit",
            "Comunidade e desafios sociais"
        ],
        technologies: ["React Native", "Firebase", "Redux", "Expo"],
        duration: "4 meses",
        linesOfCode: "12k",
        demoUrl: "#",
        codeUrl: "#",
        images: [
            "assets/images/projetos/projeto3-1.jpg",
            "assets/images/projetos/projeto3-2.jpg"
        ],
        video: "assets/videos/projeto3-preview.mp4"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCurrentYear();
        initFilters();
        initSearch();
        initGallery();
        initModals();
        initVideoPlayers();
    } catch (error) {
        console.error('Error initializing projects page:', error);
    }
});

// Filtros de projetos
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filtra projetos
            projectCards.forEach(card => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
}

// Busca de projetos
function initSearch() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const tech = card.dataset.tech.toLowerCase();
            const isVisible = title.includes(searchTerm) || tech.includes(searchTerm);
            
            if (searchTerm === '' || isVisible) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Galeria de imagens
function initGallery() {
    const galleries = document.querySelectorAll('.project-gallery, .project-media a.gallery-item');
    
    galleries.forEach(gallery => {
        lightGallery(gallery, {
            selector: '.gallery-item',
            download: false,
            thumbnail: true,
            zoom: true
        });
    });
}

// Modais de detalhes do projeto
function initModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-body');
    const detailButtons = document.querySelectorAll('.link-details, .project-quickview');
    
    // Abrir modal
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projectsData[projectId];
            
            if (project) {
                renderProjectModal(project, modalContent);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar modal
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Renderizar conteúdo do modal
function renderProjectModal(project, container) {
    container.innerHTML = `
        <h2 class="modal-project-title">${project.title}</h2>
        <span class="modal-project-category">${project.category}</span>
        
        <div class="modal-project-gallery" id="modal-gallery">
            ${project.images.map(img => `
                <a href="${img}" class="gallery-item">
                    <img src="${img}" alt="${project.title}">
                </a>
            `).join('')}
            ${project.video ? `
                <a href="${project.video}" class="gallery-item">
                    <video muted loop>
                        <source src="${project.video}" type="video/mp4">
                    </video>
                </a>
            ` : ''}
        </div>
        
        <div class="modal-project-content">
            <div class="modal-project-description">
                <h3>Sobre o Projeto</h3>
                <p>${project.description}</p>
                
                <h3>Principais Funcionalidades</h3>
                <ul>
                    ${project.features.map(feat => `<li>${feat}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-details">
                <div class="modal-project-meta">
                    <div class="modal-project-meta-item">
                        <h4>Categoria</h4>
                        <p>${project.category}</p>
                    </div>
                    
                    <div class="modal-project-meta-item">
                        <h4>Tecnologias</h4>
                        <p>${project.technologies.join(', ')}</p>
                    </div>
                    
                    <div class="modal-project-meta-item">
                        <h4>Duração</h4>
                        <p>${project.duration}</p>
                    </div>
                    
                    <div class="modal-project-meta-item">
                        <h4>Linhas de Código</h4>
                        <p>${project.linesOfCode}</p>
                    </div>
                </div>
                
                <h3>Links</h3>
                <div class="modal-project-links">
                    ${project.demoUrl ? `
                        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Ver Demonstração
                        </a>
                    ` : ''}
                    ${project.codeUrl ? `
                        <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Ver Código Fonte
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Inicializar galeria do modal
    lightGallery(document.getElementById('modal-gallery'), {
        selector: '.gallery-item',
        download: false,
        thumbnail: true,
        zoom: true
    });
}

// Controles de vídeo
function initVideoPlayers() {
    document.querySelectorAll('.project-video').forEach(video => {
        const container = video.closest('.project-media');
        const playButton = container.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', () => {
                video.play();
                video.controls = true;
                playButton.style.display = 'none';
            });
            
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            video.addEventListener('ended', () => {
                video.controls = false;
                playButton.style.display = 'flex';
            });
        }
    });
}
