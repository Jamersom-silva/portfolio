// Validação do formulário de contato
export function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            // Simular envio
            console.log('Formulário válido, enviando...');
            showSuccessMessage(form);
        }
    });
    
    // Validação em tempo real
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    
    form.querySelectorAll('input, textarea').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) return true;
    
    if (input.validity.valid) {
        errorElement.style.display = 'none';
        input.style.borderColor = '#ddd';
        return true;
    } else {
        errorElement.textContent = getErrorMessage(input);
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
        return false;
    }
}

function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return 'Este campo é obrigatório';
    } else if (input.validity.typeMismatch && input.type === 'email') {
        return 'Por favor, insira um email válido';
    } else {
        return 'Por favor, preencha este campo corretamente';
    }
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Mensagem enviada com sucesso! Entrarei em contato em breve.</p>
    `;
    
    form.parentNode.insertBefore(successMessage, form);
    form.style.display = 'none';
    
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 100);
}