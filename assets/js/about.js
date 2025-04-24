// about.js - Funcionalidades da página "Sobre Mim"

import { updateCurrentYear } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCurrentYear();
        initSkillsChart();
        animateTimeline();
    } catch (error) {
        console.error('Error initializing about page:', error);
    }
});

// Inicializa o gráfico de habilidades
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Front-End', 'Back-End', 'Banco de Dados', 'DevOps', 'UI/UX', 'Gestão'],
            datasets: [{
                label: 'Nível de Habilidade',
                data: [90, 85, 80, 75, 70, 65],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointRadius: 4
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Anima os itens da linha do tempo
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}