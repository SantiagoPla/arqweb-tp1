import { createRouter, createWebHistory } from 'vue-router';
import UserMode from './views/UserMode.vue';
import BusinessMode from './views/BusinessMode.vue';

const routes = [
  { path: '/', component: UserMode },       
  { path: '/business', component: BusinessMode } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
