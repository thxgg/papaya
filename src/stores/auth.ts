import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { AdminUser, LoginRequest, LoginResponse } from '@/types'
import { api } from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const sessionId = useLocalStorage('sessionId', null)
  const user = ref<AdminUser | null>(null)
  const loading = ref(false)

  async function check() {
    loading.value = true
    const { data, error } = await api<LoginResponse>('/admin/sessions').get().json()
    loading.value = false

    if (error.value) {
      throw new Error(error.value.message)
    }

    if (!data.value) {
      throw new Error('Invalid response')
    }

    sessionId.value = data.value.sessionId
    user.value = data.value.user
  }

  if (sessionId.value) {
    check()
  }

  async function login(request: LoginRequest) {
    loading.value = true
    const { data, error } = await api<LoginResponse>('/admin/sessions').post(request).json()
    loading.value = false

    if (error.value) {
      throw new Error(error.value.message)
    }

    if (!data.value) {
      throw new Error('Invalid response')
    }

    sessionId.value = data.value.sessionId
    user.value = data.value.user
  }

  async function logout() {
    loading.value = true
    const { error } = await api('/admin/sessions').delete()
    loading.value = false

    if (error.value) {
      throw new Error(error.value.message)
    }

    sessionId.value = null
    user.value = null
  }

  function clearSession() {
    sessionId.value = null
    user.value = null
  }

  return { sessionId, user, loading, login, logout, clearSession }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
