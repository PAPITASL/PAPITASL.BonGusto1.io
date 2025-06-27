// Efectos interactivos para la página de error 500
document.addEventListener('DOMContentLoaded', function() {
    
    // Simulación de progreso de reparación
    let repairProgress = 0;
    const statusDot = document.querySelector('.status-dot');
    const estimatedTime = document.querySelector('.estimated-time span:last-child');
    
    function updateRepairProgress() {
        repairProgress += Math.random() * 10;
        if (repairProgress > 100) repairProgress = 100;
        
        // Cambiar color del punto de estado según el progreso
        if (repairProgress < 30) {
            statusDot.style.background = '#ff6b6b';
        } else if (repairProgress < 70) {
            statusDot.style.background = '#ffa726';
        } else {
            statusDot.style.background = 'rgb(41, 216, 132)';
        }
        
        // Actualizar tiempo estimado
        const remainingTime = Math.max(0, Math.ceil((100 - repairProgress) / 10));
        if (estimatedTime) {
            estimatedTime.textContent = `Tiempo estimado: ${remainingTime}-${remainingTime + 2} minutos`;
        }
        
        // Si el progreso llega al 100%, mostrar mensaje de éxito
        if (repairProgress >= 100) {
            setTimeout(() => {
                showNotification('✅ ¡Sistema reparado! Puedes intentar de nuevo.');
                statusDot.style.background = 'rgb(41, 216, 132)';
                statusDot.style.animation = 'none';
            }, 1000);
        }
    }
    
    // Actualizar progreso cada 3 segundos
    setInterval(updateRepairProgress, 3000);
    
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
                case 'Llamar al soporte técnico':
                    message = '📞 Conectando con el equipo técnico...';
                    break;
                case 'Reportar el error':
                    message = '📋 Generando reporte de error...';
                    break;
                case 'Chat con soporte':
                    message = '💬 Iniciando chat con soporte técnico...';
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
    
    // Efecto de partículas técnicas flotantes
    function createTechnicalParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['⚙️', '🔧', '⚠️', '🔨', '🛠️', '📡'][Math.floor(Math.random() * 6)];
        particle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: rotateParticle 10s linear infinite;
        `;
        
        document.body.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                document.body.removeChild(particle);
            }
        }, 10000);
    }
    
    // Crear partículas cada 4 segundos
    setInterval(createTechnicalParticle, 4000);
    
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
        @keyframes rotateParticle {
            0% { transform: rotate(0deg) translateY(0px); opacity: 0.1; }
            50% { transform: rotate(180deg) translateY(-25px); opacity: 0.2; }
            100% { transform: rotate(360deg) translateY(0px); opacity: 0.1; }
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
    
    // Simulación de logs de error
    function addErrorLog() {
        const logs = [
            '🔍 Analizando configuración del servidor...',
            '🔧 Verificando conexiones de base de datos...',
            '⚡ Comprobando servicios de caché...',
            '🌐 Validando endpoints de API...',
            '📊 Revisando métricas de rendimiento...'
        ];
        
        const randomLog = logs[Math.floor(Math.random() * logs.length)];
        
        // Crear elemento de log temporal
        const logElement = document.createElement('div');
        logElement.textContent = randomLog;
        logElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #00ff00;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.8rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(logElement);
        
        // Animar entrada
        setTimeout(() => {
            logElement.style.opacity = '1';
            logElement.style.transform = 'translateY(0)';
        }, 100);
        
        // Remover después de 2 segundos
        setTimeout(() => {
            logElement.style.opacity = '0';
            logElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (logElement.parentNode) {
                    document.body.removeChild(logElement);
                }
            }, 300);
        }, 2000);
    }
    
    // Mostrar logs cada 5 segundos
    setInterval(addErrorLog, 5000);
    
    // Contador de errores 500
    let errorCount = localStorage.getItem('500Errors') || 0;
    errorCount = parseInt(errorCount) + 1;
    localStorage.setItem('500Errors', errorCount);
    
    // Mostrar mensaje especial después de varios errores
    if (errorCount > 2) {
        setTimeout(() => {
            showNotification('😅 Parece que tienes mala suerte con los errores del servidor');
        }, 8000);
    }
    
    // Efecto de vibración para el número de error cuando hay problemas críticos
    if (errorCount > 5) {
        const digits = document.querySelectorAll('.digit');
        digits.forEach(digit => {
            digit.style.animation = 'shake 0.5s ease-in-out infinite';
        });
        
        // Agregar animación de shake
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(shakeStyle);
    }
}); 