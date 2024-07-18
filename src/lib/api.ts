import { createFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

export const api = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const sessionId = useAuthStore().sessionId

      if (sessionId) {
        options.headers = {
          ...options.headers,
          'X-Auth-Token': sessionId,
        }
      }

      return { options }
    },
    onFetchError(ctx) {
      if (ctx.response?.status === 401) {
        useAuthStore().clearSession()
      }
      return ctx
    },
  },
})
