import { createRouter, createWebHistory } from 'vue-router';
import UserMode from './views/UserMode.vue';
import BusinessMode from './views/BusinessMode.vue';
import BusinessMenuManagement from './views/BusinessMenuManagement.vue';
import UserMenuView from './components/UserMenuView.vue';

const routes = [
  { path: '/', component: UserMode },       
  { path: '/business', component: BusinessMode },
  { path: '/business/restaurant/:id', component: BusinessMenuManagement},
  { path: '/restaurant/:id', component: UserMenuView} 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
