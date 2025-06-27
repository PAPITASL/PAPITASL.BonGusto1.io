// Variables globales
let usuarios = [];

// Inicializar dashboard sin validación de usuario
// Ahora el dashboard se abre siempre, sin importar el login

document.addEventListener('DOMContentLoaded', function() {
    fetchUsuarios();
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

// Agrego el código JS para las nuevas gráficas
const rococoRainbow = [
  '#f6c1c7', '#fcd5ce', '#ffe5b4',
  '#d0f4de', '#b8d0eb', '#cabbe9',
  '#ffd6ec', '#e0c3fc'
];

function renderMiniBarChart() {
  const ctx = document.getElementById('miniBarChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ventas',
        data: [120, 180, 150, 220, 200, 280],
        backgroundColor: rococoRainbow[0],
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: rococoRainbow[0],
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: false,
          grid: { display: false }
        },
        x: {
          display: false,
          grid: { display: false }
        }
      },
      elements: {
        bar: { borderWidth: 0 }
      }
    }
  });
}

function renderMiniPieChart() {
  const ctx = document.getElementById('miniPieChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Rápida', 'Postres', 'Bebidas', 'Vegetariano'],
      datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: rococoRainbow.slice(0, 4),
        borderWidth: 0,
        cutout: '60%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      },
      elements: {
        arc: { borderWidth: 0 }
      }
    }
  });
}

// Inicialización automática al cargar la página
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    renderMiniBarChart();
    renderMiniPieChart();
  });
} else {
  renderMiniBarChart();
  renderMiniPieChart();
}

// Función para simular error del servidor (500)
function simulateServerError() {
    // Mostrar indicador de carga
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Guardando...';
    button.disabled = true;
    
    // Simular delay de procesamiento
    setTimeout(() => {
        // Simular error del servidor
        const shouldError = Math.random() < 0.7; // 70% de probabilidad de error
        
        if (shouldError) {
            // Redirigir a la página de error 500
            window.location.href = '500.html';
        } else {
            // Simular éxito
            button.innerHTML = '✅ ¡Guardado!';
            button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = 'linear-gradient(135deg, rgb(41, 216, 132) 0%, rgb(35, 185, 113) 100%)';
            }, 2000);
        }
    }, 2000);
} 