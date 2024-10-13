import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from "@/pages/LoginPage.vue";
import UserCreatePage from "@/pages/UserCreatePage.vue";
import VerifyUserPage from "@/pages/VerifyUserPage.vue";
import ResetPasswordMailSendPage from "@/pages/ResetPasswordMailSendPage.vue";

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
    name: 'verifyUser',
    component: () => VerifyUserPage
  },
  {
    path: '/user/password/reset/send',
    name: 'resetPassword',
    component: () => ResetPasswordMailSendPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
