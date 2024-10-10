import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from "@/pages/LoginPage.vue";
import UserCreatePage from "@/pages/UserCreatePage.vue";
import VerifyUserPage from "@/pages/VerifyUserPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: () => LoginPage
  },
  {
    path: '/user/create',
    name: 'userCreate',
    component: () => UserCreatePage
  },
  {
    path: '/user/verify',
    name: 'vefifyUser',
    component: () => VerifyUserPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
