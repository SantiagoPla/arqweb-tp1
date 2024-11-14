import { createRouter, createWebHistory } from 'vue-router';
import UserMode from './views/UserMode.vue';
import BusinessCreateRestaurant from './views/BusinessCreateRestaurant.vue';
import BusinessMenuManagement from './views/BusinessMenuManagement.vue';
import PlaceOrder from './views/PlaceOrder.vue';
import BusinessOrderManagement from './views/BusinessOrderManagement.vue';
import UserOrderView from './views/UserOrderView.vue'

const routes = [
  { path: '/', component: UserMode },       
  { path: '/business', component: BusinessCreateRestaurant },
  { path: '/business/restaurant/:id', component: BusinessMenuManagement},
  { path: '/restaurant/:restaurantId/tableOrder/', component: PlaceOrder},
  { path: '/business/restaurant/:id/orders', component: BusinessOrderManagement },
  { path: '/restaurant/:restaurantId/order/:orderId', component: UserOrderView },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
