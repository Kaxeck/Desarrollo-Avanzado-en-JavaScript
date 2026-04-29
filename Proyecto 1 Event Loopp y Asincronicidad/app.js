const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

// Agregar un nuevo pedido al hacer clic en el botón
addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

// Función para agregar un pedido a la lista
function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

// Función para actualizar el estado de un pedido en la lista
function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

// Función para procesar un pedido
async function processOrder(order) {
    // Simular la preparación del pedido usando setTimeout y Promise
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula el tiempo de preparación
    // Actualizar el estado del pedido a "Completado"
    updateOrderStatus(order, 'Completado');
}