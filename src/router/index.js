import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CalendarPage from "@/views/CalendarPage.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;