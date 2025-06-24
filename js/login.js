// Función para validar email
function validateEmail(email) {
    if (!email.trim()) {
        return 'El email es requerido';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return 'El email no tiene un formato válido';
    }
    return null;
}

// Función para validar contraseña
function validatePassword(password) {
    if (!password) {
        return 'La contraseña es requerida';
    }
    if (password.length < 1) {
        return 'La contraseña es requerida';
    }
    return null;
}

// Función para mostrar error
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Agregar clase error a los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.add('error');
    });
}

// Función para mostrar error de campo específico
function showFieldError(fieldName, message) {
    const inputElement = document.getElementById(fieldName);
    if (inputElement) {
        inputElement.classList.add('error');
    }
    
    // Mostrar el error general
    showError(message);
}

// Función para limpiar error
function clearError() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Remover clase error de los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Función para obtener los datos del formulario
function getFormData() {
    return {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
}

// Función para manejar el envío del formulario
async function handleSubmit(e) {
    e.preventDefault();
    clearError();

    const formData = getFormData();
    
    // Validar campos antes de enviar
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) {
        showFieldError('email', emailError);
        return;
    }
    
    if (passwordError) {
        showFieldError('password', passwordError);
        return;
    }

    try {
        const response = await fetch('https://01a5-200-118-60-102.ngrok-free.app/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                correo: formData.email,
                clave: formData.password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        // Debug: Ver la respuesta completa
        console.log('Respuesta completa del backend:', data);
        console.log('Usuario:', data.usuario);
        console.log('Tipo de usuario:', data.usuario?.tipo_usuario);

        // Guardar la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.usuario));
        
        // Redirigir según el tipo de usuario
        if (data.usuario && data.usuario.tipo_usuario === 'administrador') {
            console.log('Redirigiendo a dashboard (administrador)');
            window.location.href = 'dashboard.html';
        } else {
            console.log('Redirigiendo a home (cliente)');
            window.location.href = 'home.html'; // Página para clientes
        }
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Error al iniciar sesión');
    }
}

// Función para manejar cambios en los campos
function handleChange(e) {
    const { name, value } = e.target;
    
    // Limpiar error general
    clearError();
    
    // Validar el campo en tiempo real (solo si tiene contenido)
    if (value && value.trim() !== '') {
        let error = null;
        
        if (name === 'email') {
            error = validateEmail(value);
        } else if (name === 'password') {
            error = validatePassword(value);
        }
        
        if (error) {
            showFieldError(name, error);
        }
    }
}

// Event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Agregar event listeners para validación en tiempo real
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', handleChange); // Validar cuando pierde el foco
        input.addEventListener('input', handleChange); // Validar mientras escribe
    });
});