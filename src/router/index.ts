import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from "@/pages/LoginPage.vue";
import UserCreatePage from "@/pages/UserCreatePage.vue";
import VerifyUserPage from "@/pages/VerifyUserPage.vue";
import ResetPasswordMailSendPage from "@/pages/ResetPasswordMailSendPage.vue";
import TimelinePage from "@/pages/TimelinePage.vue"
import {isTokenExpired} from "@/utils/jwtUtil";
import {showError} from "@/utils/toastUtil";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requireAuth: true }
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
    component: () => VerifyUserPage,
    meta: { requireAuth: true }
  },
  {
    path: '/user/password/reset/send',
    name: 'resetPassword',
    component: () => ResetPasswordMailSendPage
  },
  {
    path: '/post/timeline',
    name: 'timeline',
    component: () => TimelinePage,
    meta: { requireAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if(to.meta.requireAuth && (!token || isTokenExpired(token))) {
    showError('トークンの有効期限が切れています。再度ログインしてください。')
    next({name: 'login'})
  }
  else {
    next()
  }
})

export default router
