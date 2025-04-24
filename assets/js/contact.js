// contact.js - Funcionalidades da página de contato

import { updateCurrentYear } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCurrentYear();
        initContactForm();
        initMap();
    } catch (error) {
        console.error('Error initializing contact page:', error);
    }
});

// Inicializa o formulário de contato
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm(form)) {
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            
            // Simular envio (substituir por chamada real à API)
            try {
                await simulateFormSubmission(form);
                showSuccessModal();
                form.reset();
            } catch (error) {
                showErrorModal();
            } finally {
                submitBtn.classList.remove('loading');
            }
        }
    });
    
    // Validação em tempo real
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
}

// Validação do formulário
function validateForm(form) {
    let isValid = true;
    
    form.querySelectorAll('input, textarea, select').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validação individual de campos
function validateField(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) return true;
    
    if (input.validity.valid) {
        errorElement.style.display = 'none';
        input.style.borderColor = '';
        return true;
    } else {
        errorElement.textContent = getErrorMessage(input);
        errorElement.style.display = 'block';
        input.style.borderColor = 'var(--accent-color)';
        return false;
    }
}

// Mensagens de erro personalizadas
function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return 'Este campo é obrigatório';
    } else if (input.validity.typeMismatch && input.type === 'email') {
        return 'Por favor, insira um email válido';
    } else if (input.id === 'consent' && !input.checked) {
        return 'Você deve aceitar os termos';
    } else {
        return 'Por favor, preencha este campo corretamente';
    }
}

// Simular envio do formulário (substituir por chamada real à API)
function simulateFormSubmission(form) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', new FormData(form));
            resolve();
        }, 1500);
    });
}

// Mostrar modal de sucesso
function showSuccessModal() {
    const modal = createModal(
        '<i class="fas fa-check-circle modal-icon"></i>' +
        '<h2>Mensagem Enviada!</h2>' +
        '<p>Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.</p>'
    );
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Mostrar modal de erro
function showErrorModal() {
    const modal = createModal(
        '<i class="fas fa-exclamation-circle modal-icon"></i>' +
        '<h2>Ocorreu um Erro</h2>' +
        '<p>Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.</p>'
    );
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Criar modal genérico
function createModal(content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = content;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-primary modal-close';
    closeBtn.textContent = 'Fechar';
    closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.remove(), 300);
    });
    
    modalContent.appendChild(closeBtn);
    modalOverlay.appendChild(modalContent);
    
    // Fechar ao clicar fora
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.remove(), 300);
        }
    });
    
    return modalOverlay;
}

// Inicializar mapa Leaflet
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Coordenadas do seu local (substitua pelas suas)
    const myLocation = [-23.5505, -46.6333]; // Exemplo: São Paulo
    
    const map = L.map('map').setView(myLocation, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker(myLocation).addTo(map)
        .bindPopup('Meu Local de Trabalho')
        .openPopup();
}