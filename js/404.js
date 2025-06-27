// Efectos interactivos para la página de error 404
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de escritura para el mensaje de error
    const funnyText = document.querySelector('.funny-text');
    if (funnyText) {
        const originalText = funnyText.textContent;
        funnyText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                funnyText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar el efecto después de 2 segundos
        setTimeout(typeWriter, 2000);
    }
    
    // Efecto hover para los elementos de ayuda
    const helpItems = document.querySelectorAll('.help-item');
    helpItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de click
        item.addEventListener('click', function() {
            const icon = this.querySelector('.help-icon');
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 500);
            
            // Mostrar mensaje según el tipo de ayuda
            const helpType = this.textContent.trim();
            let message = '';
            
            switch(helpType) {
                case 'Llamar al soporte':
                    message = '📞 Llamando al soporte técnico...';
                    break;
                case 'Enviar email':
                    message = '✉️ Abriendo cliente de email...';
                    break;
                case 'Chat en vivo':
                    message = '💬 Iniciando chat en vivo...';
                    break;
            }
            
            if (message) {
                showNotification(message);
            }
        });
    });
    
    // Función para mostrar notificaciones
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Efecto de partículas flotantes adicionales
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['🍕', '🍔', '🥤', '🥗', '🍟', '🍦'][Math.floor(Math.random() * 6)];
        particle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle 8s ease-in-out infinite;
        `;
        
        document.body.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                document.body.removeChild(particle);
            }
        }, 8000);
    }
    
    // Crear partículas cada 3 segundos
    setInterval(createFloatingParticle, 3000);
    
    // Efecto de click en los botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Agregar estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
            50% { transform: translateY(-30px) rotate(180deg); opacity: 0.2; }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efecto de entrada para el contenido
    const errorContent = document.querySelector('.error-content');
    if (errorContent) {
        errorContent.style.opacity = '0';
        errorContent.style.transform = 'translateY(30px)';
        errorContent.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            errorContent.style.opacity = '1';
            errorContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Contador de visitas (simulado)
    let visitCount = localStorage.getItem('404Visits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('404Visits', visitCount);
    
    // Mostrar mensaje especial después de varias visitas
    if (visitCount > 3) {
        setTimeout(() => {
            showNotification('🎯 ¡Eres un experto en encontrar páginas que no existen!');
        }, 5000);
    }
}); 