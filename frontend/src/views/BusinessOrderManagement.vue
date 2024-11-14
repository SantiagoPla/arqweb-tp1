<template>
  <div class="orders-container">
    <h1>Lista de Pedidos</h1>
    <table class="orders-table">
      <thead>
        <tr>
          <th>Número</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Restaurante</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.numero">
          <td>{{ pedido.numero }}</td>
          <td>{{ pedido.nombre }}</td>
          <td>{{ pedido.descripcion }}</td>
          <td>{{ pedido.precio }}</td>
          <td>{{ pedido.restaurante }}</td>
          <td>
            <select v-model="pedido.estado" class="estado-select">
              <option value="Nuevo">Nuevo</option>
              <option value="Preparando">Preparando</option>
              <option value="Enviado">Enviado</option>
              <option value="Pagado">Pagado</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PedidosMode',
  data() {
    return {
      pedidos: [
  { numero: 1, nombre: 'Hamburguesa Clásica', descripcion: 'Hamburguesa con queso, lechuga y tomate', precio: '$8.99', restaurante: 'Burger House', estado: 'Nuevo' },
  { numero: 2, nombre: 'Pizza Margarita', descripcion: 'Pizza con salsa de tomate, mozzarella y albahaca', precio: '$12.50', restaurante: 'Pizza World', estado: 'Preparando' },
  { numero: 3, nombre: 'Sushi Roll', descripcion: 'Roll de sushi con salmón y aguacate', precio: '$15.00', restaurante: 'Sushi Master', estado: 'Enviado' },
  { numero: 4, nombre: 'Ensalada César', descripcion: 'Ensalada con pollo, lechuga, crutones y aderezo César', precio: '$10.00', restaurante: 'Healthy Bites', estado: 'Pagado' },
  { numero: 5, nombre: 'Tacos al Pastor', descripcion: 'Tacos con carne al pastor, piña y cilantro', precio: '$9.50', restaurante: 'Taco Fiesta', estado: 'Nuevo' },
  { numero: 6, nombre: 'Pasta Carbonara', descripcion: 'Pasta con salsa carbonara, tocino y parmesano', precio: '$13.75', restaurante: 'Italiano Ristorante', estado: 'Preparando' },
  { numero: 7, nombre: 'Pollo a la Parrilla', descripcion: 'Pollo a la parrilla con vegetales asados', precio: '$14.00', restaurante: 'Grill Master', estado: 'Enviado' },
  { numero: 8, nombre: 'Burrito de Carne', descripcion: 'Burrito con carne, frijoles, arroz y guacamole', precio: '$11.25', restaurante: 'Mexican Delight', estado: 'Pagado' },
  { numero: 9, nombre: 'Ramen', descripcion: 'Sopa de ramen con cerdo, huevo y vegetales', precio: '$13.00', restaurante: 'Ramen House', estado: 'Nuevo' },
  { numero: 10, nombre: 'Filete de Res', descripcion: 'Filete de res con puré de papas y espárragos', precio: '$20.00', restaurante: 'Steakhouse', estado: 'Preparando' },
  { numero: 11, nombre: 'Sandwich de Pavo', descripcion: 'Sandwich con pavo, queso suizo y mostaza', precio: '$7.50', restaurante: 'Deli Corner', estado: 'Enviado' },
  { numero: 12, nombre: 'Paella', descripcion: 'Paella con mariscos, pollo y chorizo', precio: '$18.00', restaurante: 'Spanish Cuisine', estado: 'Pagado' }
]
    };
  }
};
</script>

<style scoped>
.orders-container {
  padding: 20px;
  background-color: #333;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
}

.orders-container h1 {
  margin-bottom: 20px;
  color: #fff;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th, .orders-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #555;
  color: #ddd;
}

.orders-table th {
  background-color: #444;
  color: #fff;
}

.orders-table tr:hover {
  background-color: #555;
}

.estado-select {
  background-color: #444;
  color: #fff;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 5px;
}

.estado-select option {
  background-color: #333;
  color: #fff;
}
</style>