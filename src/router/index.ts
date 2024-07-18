import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'Login' },
    },
    {
      path: '/login',
      name: 'Login',
      meta: { public: true },
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

router.beforeEach((to, _) => {
  if (!to.meta.public) {
    if (!useAuthStore().sessionId) {
      return { name: 'Login' }
    }
  }
})

export default router
