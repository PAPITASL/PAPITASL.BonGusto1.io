let pedidos = [];
let pagos = [];
let reservas = [];
let menuItems = [];

document.addEventListener('DOMContentLoaded', function() {
    fetchPedidos();
    initializeNavigation();
});

function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const menu = this.getAttribute('data-menu');
            showMenu(menu);
        });
    });
}

function showMenu(menu) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-menu="${menu}"]`).classList.add('active');

    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.style.display = 'none';
    });

    const contentId = `${menu}-content`;
    const content = document.getElementById(contentId);
    if (content) {
        content.style.display = 'block';
    }

    const titles = {
        'pedidos': 'Gestión de Pedidos',
        'pagos': 'Pagos',
        'reservas': 'Reservas',
        'menu': 'Menú'
    };
    document.getElementById('page-title').textContent = titles[menu] || 'Gestión de Pedidos';

    if (menu === 'pedidos') {
        fetchPedidos();
    } else if (menu === 'pagos') {
        fetchPagos();
    } else if (menu === 'reservas') {
        fetchReservas();
    } else if (menu === 'menu') {
        fetchMenu();
    }
}

async function fetchPedidos() {
    const loadingMessage = document.getElementById('pedidos-loading-message');
    const errorMessage = document.getElementById('pedidos-error-message');
    const refreshBtn = document.getElementById('pedidos-refresh-btn');
    
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (errorMessage) errorMessage.style.display = 'none';
    if (refreshBtn) refreshBtn.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        pedidos = [
            {
                id: '#1234',
                cliente: 'Juan Pérez',
                productos: 'Pizza Margherita, Coca Cola',
                total: '$15.49',
                estado: 'Entregado',
                fecha: '25/06/2025 19:30'
            },
            {
                id: '#1235',
                cliente: 'María García',
                productos: 'Hamburguesa Clásica, Ensalada',
                total: '$18.49',
                estado: 'En Preparación',
                fecha: '25/06/2025 20:15'
            }
        ];
        
        renderPedidos();
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = error.message || 'Error al obtener pedidos';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (refreshBtn) refreshBtn.disabled = false;
    }
}

function renderPedidos() {
    const tbody = document.getElementById('pedidos-table-body');
    if (!tbody) return;
    
    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No hay pedidos disponibles</td></tr>';
        return;
    }

    tbody.innerHTML = pedidos.map(pedido => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pedido.id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pedido.cliente}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pedido.productos}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pedido.total}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <span style="background: ${getEstadoColor(pedido.estado)}; color: ${pedido.estado === 'En Preparación' ? 'black' : 'white'}; padding: 4px 8px; border-radius: 4px;">
                    ${pedido.estado}
                </span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pedido.fecha}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <button onclick="handleVerPedido('${pedido.id}')" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Ver</button>
                <button onclick="handleActualizarEstado('${pedido.id}')" style="background: rgb(41, 216, 132); color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Actualizar</button>
            </td>
        </tr>
    `).join('');
}

async function fetchPagos() {
    const loadingMessage = document.getElementById('pagos-loading-message');
    const errorMessage = document.getElementById('pagos-error-message');
    const refreshBtn = document.getElementById('pagos-refresh-btn');
    
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (errorMessage) errorMessage.style.display = 'none';
    if (refreshBtn) refreshBtn.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        pagos = [
            {
                id: '#P001',
                cliente: 'Juan Pérez',
                monto: '$15.49',
                metodo: 'Tarjeta',
                estado: 'Completado',
                fecha: '25/06/2025 19:30'
            },
            {
                id: '#P002',
                cliente: 'María García',
                monto: '$18.49',
                metodo: 'Efectivo',
                estado: 'Pendiente',
                fecha: '25/06/2025 20:15'
            }
        ];
        
        renderPagos();
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = error.message || 'Error al obtener pagos';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (refreshBtn) refreshBtn.disabled = false;
    }
}

function renderPagos() {
    const tbody = document.getElementById('pagos-table-body');
    if (!tbody) return;
    
    if (pagos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No hay pagos disponibles</td></tr>';
        return;
    }

    tbody.innerHTML = pagos.map(pago => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pago.id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pago.cliente}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pago.monto}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pago.metodo}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <span style="background: ${getEstadoColor(pago.estado)}; color: ${pago.estado === 'Pendiente' ? 'black' : 'white'}; padding: 4px 8px; border-radius: 4px;">
                    ${pago.estado}
                </span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${pago.fecha}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <button onclick="handleVerPago('${pago.id}')" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Ver</button>
            </td>
        </tr>
    `).join('');
}

async function fetchReservas() {
    const loadingMessage = document.getElementById('reservas-loading-message');
    const errorMessage = document.getElementById('reservas-error-message');
    const refreshBtn = document.getElementById('reservas-refresh-btn');
    
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (errorMessage) errorMessage.style.display = 'none';
    if (refreshBtn) refreshBtn.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        reservas = [
            {
                id: '#R001',
                cliente: 'Ana López',
                fecha: '26/06/2025',
                hora: '19:00',
                personas: 4,
                estado: 'Confirmada'
            },
            {
                id: '#R002',
                cliente: 'Carlos Gómez',
                fecha: '26/06/2025',
                hora: '20:30',
                personas: 2,
                estado: 'Pendiente'
            }
        ];
        
        renderReservas();
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = error.message || 'Error al obtener reservas';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (refreshBtn) refreshBtn.disabled = false;
    }
}

function renderReservas() {
    const tbody = document.getElementById('reservas-table-body');
    if (!tbody) return;
    
    if (reservas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No hay reservas disponibles</td></tr>';
        return;
    }

    tbody.innerHTML = reservas.map(reserva => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${reserva.id}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${reserva.cliente}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${reserva.fecha}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${reserva.hora}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${reserva.personas}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <span style="background: ${getEstadoColor(reserva.estado)}; color: ${reserva.estado === 'Pendiente' ? 'black' : 'white'}; padding: 4px 8px; border-radius: 4px;">
                    ${reserva.estado}
                </span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <button onclick="handleVerReserva('${reserva.id}')" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Ver</button>
                <button onclick="handleConfirmarReserva('${reserva.id}')" style="background: rgb(41, 216, 132); color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Confirmar</button>
            </td>
        </tr>
    `).join('');
}

async function fetchMenu() {
    const loadingMessage = document.getElementById('menu-loading-message');
    const errorMessage = document.getElementById('menu-error-message');
    const refreshBtn = document.getElementById('menu-refresh-btn');
    
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (errorMessage) errorMessage.style.display = 'none';
    if (refreshBtn) refreshBtn.disabled = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        menuItems = [
            {
                nombre: 'Pizza Margherita',
                descripcion: 'Pizza con salsa de tomate, mozzarella y albahaca',
                precio: '$12.99'
            },
            {
                nombre: 'Hamburguesa Clásica',
                descripcion: 'Hamburguesa con carne, lechuga, tomate y queso',
                precio: '$8.99'
            },
            {
                nombre: 'Ensalada César',
                descripcion: 'Ensalada con lechuga, pollo, croutones y aderezo César',
                precio: '$6.99'
            }
        ];
        
        renderMenu();
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = error.message || 'Error al obtener el menú';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (refreshBtn) refreshBtn.disabled = false;
    }
}

function renderMenu() {
    const container = document.getElementById('menu-items');
    if (!container) return;
    
    if (menuItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No hay elementos en el menú</p>';
        return;
    }

    container.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p class="price">${item.precio}</p>
        </div>
    `).join('');
}

function getEstadoColor(estado) {
    const colores = {
        'Entregado': 'rgb(41, 216, 132)',
        'En Preparación': '#ffc107',
        'En Camino': '#17a2b8',
        'Pendiente': '#6c757d',
        'Completado': 'rgb(41, 216, 132)',
        'Confirmada': 'rgb(41, 216, 132)'
    };
    return colores[estado] || '#6c757d';
}

function handleVerPedido(id) {
    alert(`Ver detalles del pedido ${id} (funcionalidad no implementada)`);
}

function handleActualizarEstado(id) {
    alert(`Actualizar estado del pedido ${id} (funcionalidad no implementada)`);
}

function handleVerPago(id) {
    alert(`Ver detalles del pago ${id} (funcionalidad no implementada)`);
}

function handleVerReserva(id) {
    alert(`Ver detalles de la reserva ${id} (funcionalidad no implementada)`);
}

function handleConfirmarReserva(id) {
    alert(`Confirmar reserva ${id} (funcionalidad no implementada)`);
}

function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Función para simular error 404 (página no encontrada)
function simulateNotFoundError() {
    // Mostrar indicador de carga
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '🔍 Buscando menú...';
    button.disabled = true;
    
    // Simular delay de búsqueda
    setTimeout(() => {
        // Simular que no se encuentra el menú
        const shouldError = Math.random() < 0.8; // 80% de probabilidad de error 404
        
        if (shouldError) {
            // Redirigir a la página de error 404
            window.location.href = '404.html';
        } else {
            // Simular éxito
            button.innerHTML = '✅ Menú encontrado';
            button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
            }, 2000);
        }
    }, 1500);
}