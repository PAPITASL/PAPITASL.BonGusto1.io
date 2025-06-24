// Variables globales
let usuarios = [];
let chart = null;

// Inicializar dashboard sin validación de usuario
// Ahora el dashboard se abre siempre, sin importar el login

document.addEventListener('DOMContentLoaded', function() {
    fetchUsuarios();
    updateChart();
    initializeNavigation();
});

// Inicializar navegación del menú
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const menu = this.getAttribute('data-menu');
            showMenu(menu);
        });
    });
}

// Función para mostrar menú específico
function showMenu(menu) {
    // Actualizar menú activo
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-menu="${menu}"]`).classList.add('active');

    // Ocultar todos los contenidos
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.style.display = 'none';
    });

    // Mostrar contenido correspondiente
    const contentId = `${menu}-content`;
    const content = document.getElementById(contentId);
    if (content) {
        content.style.display = 'block';
    }

    // Actualizar título
    const titles = {
        'dashboard': 'Dashboard',
        'usuarios': 'Usuarios',
        'productos': 'Productos',
        'pedidos': 'Pedidos',
        'reportes': 'Reportes',
        'configuracion': 'Configuración'
    };
    document.getElementById('page-title').textContent = titles[menu] || 'Dashboard';

    // Cargar datos si es necesario
    if (menu === 'usuarios') {
        fetchUsuarios();
    }
}

// Función para obtener usuarios del backend
async function fetchUsuarios() {
    const loadingMessage = document.getElementById('usuarios-loading-message') || document.getElementById('dashboard-loading-message');
    const errorMessage = document.getElementById('usuarios-error-message') || document.getElementById('dashboard-error-message');
    const refreshBtn = document.getElementById('usuarios-refresh-btn') || document.getElementById('dashboard-refresh-btn');
    
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (errorMessage) errorMessage.style.display = 'none';
    if (refreshBtn) refreshBtn.disabled = true;
    
    try {
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos falsos de usuarios
        usuarios = [
            {
                id: 1,
                nombre: 'Juan',
                apellido: 'Pérez',
                correo: 'juan.perez@email.com',
                tipo_usuario: 'administrador',
                fecha_creacion: '2024-01-15T10:30:00Z',
                estado: 'activo'
            },
            {
                id: 2,
                nombre: 'María',
                apellido: 'García',
                correo: 'maria.garcia@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-02-20T14:15:00Z',
                estado: 'activo'
            },
            {
                id: 3,
                nombre: 'Carlos',
                apellido: 'López',
                correo: 'carlos.lopez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-03-10T09:45:00Z',
                estado: 'activo'
            },
            {
                id: 4,
                nombre: 'Ana',
                apellido: 'Rodríguez',
                correo: 'ana.rodriguez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-04-05T16:20:00Z',
                estado: 'activo'
            },
            {
                id: 5,
                nombre: 'Luis',
                apellido: 'Martínez',
                correo: 'luis.martinez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-05-12T11:30:00Z',
                estado: 'activo'
            },
            {
                id: 6,
                nombre: 'Carmen',
                apellido: 'Fernández',
                correo: 'carmen.fernandez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-06-18T13:45:00Z',
                estado: 'activo'
            },
            {
                id: 7,
                nombre: 'Roberto',
                apellido: 'González',
                correo: 'roberto.gonzalez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-07-22T08:15:00Z',
                estado: 'activo'
            },
            {
                id: 8,
                nombre: 'Patricia',
                apellido: 'Hernández',
                correo: 'patricia.hernandez@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-08-30T15:30:00Z',
                estado: 'activo'
            },
            {
                id: 9,
                nombre: 'Miguel',
                apellido: 'Díaz',
                correo: 'miguel.diaz@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-09-14T12:00:00Z',
                estado: 'activo'
            },
            {
                id: 10,
                nombre: 'Isabel',
                apellido: 'Moreno',
                correo: 'isabel.moreno@email.com',
                tipo_usuario: 'cliente',
                fecha_creacion: '2024-10-25T17:45:00Z',
                estado: 'activo'
            }
        ];
        
        renderUsuarios();
        updateStats();
        updateChart();
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = error.message || 'Error al obtener usuarios';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (refreshBtn) refreshBtn.disabled = false;
    }
}

// Función para renderizar la tabla de usuarios
function renderUsuarios() {
    const tbody = document.getElementById('usuarios-table-body');
    if (!tbody) return;
    
    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No hay usuarios registrados</td></tr>';
        return;
    }

    tbody.innerHTML = usuarios.map(usuario => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${usuario.id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${usuario.nombre}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${usuario.apellido}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${usuario.correo}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <span style="background: ${usuario.tipo_usuario === 'administrador' ? '#8B0000' : '#007bff'}; color: white; padding: 4px 8px; border-radius: 4px;">
                    ${usuario.tipo_usuario === 'administrador' ? '👑 Admin' : '👤 Cliente'}
                </span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${usuario.fecha_creacion ? 
                    new Date(usuario.fecha_creacion).toLocaleDateString('es-ES') : 
                    'N/A'
                }
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <button onclick="handleBorrarUsuario(${usuario.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Borrar</button>
                <button onclick="handleDesactivarUsuario(${usuario.id})" style="background: #ffc107; color: black; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Desactivar</button>
            </td>
        </tr>
    `).join('');
}

// Función para actualizar estadísticas
function updateStats() {
    const totalUsuariosElement = document.getElementById('total-usuarios');
    if (totalUsuariosElement) {
        totalUsuariosElement.textContent = usuarios.length;
    }
}

// Función para actualizar el gráfico
function updateChart() {
    const usuariosAdmin = usuarios.filter(u => u.tipo_usuario === 'administrador').length;
    const usuariosCliente = usuarios.filter(u => u.tipo_usuario === 'cliente').length;

    const canvas = document.getElementById('usuariosChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Administradores', 'Clientes'],
            datasets: [{
                data: [usuariosAdmin, usuariosCliente],
                backgroundColor: ['#8B0000', '#FFD700'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 2,
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}

// Función para manejar borrado de usuario
function handleBorrarUsuario(id) {
    if (confirm(`¿Estás seguro de que quieres borrar el usuario con ID: ${id}?`)) {
        alert(`Usuario con ID ${id} borrado (funcionalidad no implementada)`);
    }
}

// Función para manejar desactivación de usuario
function handleDesactivarUsuario(id) {
    if (confirm(`¿Estás seguro de que quieres desactivar el usuario con ID: ${id}?`)) {
        alert(`Usuario con ID ${id} desactivado (funcionalidad no implementada)`);
    }
}

// Función para manejar logout
function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
} 