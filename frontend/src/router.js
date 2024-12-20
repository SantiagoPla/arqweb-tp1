import { createRouter, createWebHistory } from 'vue-router';
import InitialView from './views/InitialView.vue';

import UserMode from './views/UserMode.vue';
import BusinessMode from './views/BusinessMode.vue';
import BusinessMenuManagement from './views/BusinessMenuManagement.vue';
import PlaceOrder from './views/PlaceOrder.vue';
import BusinessOrderManagement from './views/BusinessOrderManagement.vue';
import UserOrderView from './views/UserOrderView.vue'

const routes = [
  { path: '/', component: InitialView },     
  { path: '/user', component: UserMode },       
  { path: '/business', component: BusinessMode },
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
