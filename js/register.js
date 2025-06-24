// Función de validación mejorada
function validateForm(formData) {
    const errors = {};
    const { nombre, apellido, email, password, tipo_usuario, terms } = formData;

    // Validar nombre
    if (!nombre.trim()) {
        errors.nombre = 'El nombre es requerido';
    } else if (nombre.trim().length < 2) {
        errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
        errors.nombre = 'El nombre solo puede contener letras y espacios';
    }

    // Validar apellido
    if (!apellido.trim()) {
        errors.apellido = 'El apellido es requerido';
    } else if (apellido.trim().length < 2) {
        errors.apellido = 'El apellido debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.trim())) {
        errors.apellido = 'El apellido solo puede contener letras y espacios';
    }

    // Validar email
    if (!email.trim()) {
        errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = 'El email no tiene un formato válido';
    }

    // Validar contraseña
    if (!password) {
        errors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])/.test(password)) {
        errors.password = 'La contraseña debe contener al menos una letra minúscula';
    } else if (!/(?=.*[A-Z])/.test(password)) {
        errors.password = 'La contraseña debe contener al menos una letra mayúscula';
    } else if (!/(?=.*\d)/.test(password)) {
        errors.password = 'La contraseña debe contener al menos un número';
    }

    // Validar tipo de usuario
    if (!tipo_usuario) {
        errors.tipo_usuario = 'El tipo de usuario es requerido';
    } else if (!['cliente', 'administrador'].includes(tipo_usuario)) {
        errors.tipo_usuario = 'Tipo de usuario no válido';
    }

    // Validar términos y condiciones
    if (!terms) {
        errors.terms = 'Debes aceptar los términos y condiciones';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Función para validar un campo específico
function validateField(fieldName, value) {
    const errors = {};
    
    switch (fieldName) {
        case 'nombre':
            if (!value.trim()) {
                errors.nombre = 'El nombre es requerido';
            } else if (value.trim().length < 2) {
                errors.nombre = 'El nombre debe tener al menos 2 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
                errors.nombre = 'El nombre solo puede contener letras y espacios';
            }
            break;
            
        case 'apellido':
            if (!value.trim()) {
                errors.apellido = 'El apellido es requerido';
            } else if (value.trim().length < 2) {
                errors.apellido = 'El apellido debe tener al menos 2 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
                errors.apellido = 'El apellido solo puede contener letras y espacios';
            }
            break;
            
        case 'email':
            if (!value.trim()) {
                errors.email = 'El email es requerido';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                errors.email = 'El email no tiene un formato válido';
            }
            break;
            
        case 'password':
            if (!value) {
                errors.password = 'La contraseña es requerida';
            } else if (value.length < 8) {
                errors.password = 'La contraseña debe tener al menos 8 caracteres';
            } else if (!/(?=.*[a-z])/.test(value)) {
                errors.password = 'La contraseña debe contener al menos una letra minúscula';
            } else if (!/(?=.*[A-Z])/.test(value)) {
                errors.password = 'La contraseña debe contener al menos una letra mayúscula';
            } else if (!/(?=.*\d)/.test(value)) {
                errors.password = 'La contraseña debe contener al menos un número';
            }
            break;
            
        case 'tipo_usuario':
            if (!value) {
                errors.tipo_usuario = 'El tipo de usuario es requerido';
            } else if (!['cliente', 'administrador'].includes(value)) {
                errors.tipo_usuario = 'Tipo de usuario no válido';
            }
            break;
            
        case 'terms':
            if (!value) {
                errors.terms = 'Debes aceptar los términos y condiciones';
            }
            break;
    }
    
    return errors[fieldName] || null;
}

// Función para evaluar la fortaleza de la contraseña
function evaluatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    if (score <= 2) return { strength: 'weak', text: 'Débil' };
    if (score <= 3) return { strength: 'fair', text: 'Regular' };
    if (score <= 4) return { strength: 'good', text: 'Buena' };
    return { strength: 'strong', text: 'Fuerte' };
}

// Función para mostrar la fortaleza de la contraseña
function showPasswordStrength(password) {
    const strengthElement = document.getElementById('passwordStrength');
    if (!strengthElement) return;
    
    const fillElement = strengthElement.querySelector('.strength-fill');
    const textElement = strengthElement.querySelector('.strength-text');
    
    if (!password) {
        strengthElement.style.display = 'none';
        return;
    }
    
    const { strength, text } = evaluatePasswordStrength(password);
    
    // Limpiar clases anteriores
    fillElement.className = 'strength-fill ' + strength;
    textElement.className = 'strength-text ' + strength;
    textElement.textContent = text;
    
    strengthElement.style.display = 'block';
}

// Función para mostrar errores
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }
}

// Función para limpiar errores
function clearError(fieldName) {
    const errorElement = document.getElementById(fieldName + '-error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }
}

// Función para limpiar todos los errores
function clearAllErrors() {
    const fields = ['nombre', 'apellido', 'email', 'password', 'tipo_usuario', 'terms'];
    fields.forEach(field => clearError(field));
    
    const serverError = document.getElementById('server-error');
    if (serverError) {
        serverError.style.display = 'none';
    }
    
    // Limpiar indicador de fortaleza de contraseña
    const strengthElement = document.getElementById('passwordStrength');
    if (strengthElement) {
        strengthElement.style.display = 'none';
    }
}

// Función para obtener los datos del formulario
function getFormData() {
    return {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        tipo_usuario: document.getElementById('tipo_usuario').value,
        terms: document.getElementById('terms').checked
    };
}

// Función para manejar el envío del formulario
async function handleSubmit(e) {
    e.preventDefault();
    clearAllErrors();
    
    const formData = getFormData();
    const { isValid, errors } = validateForm(formData);
    
    if (!isValid) {
        // Mostrar errores de validación
        Object.keys(errors).forEach(field => {
            showError(field, errors[field]);
        });
        return;
    }

    // Debug: Ver qué datos se van a enviar
    const userData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.email,
        clave: formData.password,
        tipo_usuario: formData.tipo_usuario
    };
    
    console.log('Datos que se van a enviar al backend:', userData);
    console.log('Tipo de usuario seleccionado:', formData.tipo_usuario);

    try {
        const response = await fetch('https://01a5-200-118-60-102.ngrok-free.app/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        console.log('Usuario registrado exitosamente:', data);
        // Redirigir al login
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error:', error);
        const serverError = document.getElementById('server-error');
        if (serverError) {
            serverError.textContent = error.message || 'Error al registrar usuario';
            serverError.style.display = 'block';
        }
    }
}

// Función para manejar cambios en los campos
function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Limpiar error del campo
    clearError(name);
    
    // Validar el campo en tiempo real (solo si tiene contenido)
    if (fieldValue && fieldValue.toString().trim() !== '') {
        const error = validateField(name, fieldValue);
        if (error) {
            showError(name, error);
        }
    }
    
    // Mostrar fortaleza de contraseña en tiempo real
    if (name === 'password') {
        showPasswordStrength(value);
    }
}

// Event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Agregar event listeners para validación en tiempo real
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', handleChange); // Validar cuando pierde el foco
        input.addEventListener('input', handleChange); // Validar mientras escribe
        input.addEventListener('change', handleChange); // Validar cuando cambia
    });
    
    // Event listener específico para el checkbox de términos
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', handleChange);
    }
});