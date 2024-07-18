<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { AutoForm } from '@/components/ui/auto-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type LoginRequest, LoginRequestSchema } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useTitle } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const { t, locale } = useI18n()
useTitle(t('loginPage.pageTitle'))

const LoginFormSchema = LoginRequestSchema.omit({ totp: true })
const loginForm = useForm({
  validationSchema: toTypedSchema(LoginFormSchema),
})

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)
const { login } = authStore
</script>

<template>
  <main class="flex flex-col items-center justify-center space-y-6 w-screen h-screen">
    <Card class="max-w-400px">
      <CardHeader class="text-center">
        <CardTitle class="space-y-4">
          <img alt="Code Hospitality logo" src="@/assets/logo-wide.png" class="p-4">
          <Separator />
          <h1 class="text-3xl">
            {{ t('loginPage.title') }}
          </h1>
          <Button @click="() => locale = locale === 'en' ? 'bg' : 'en'">
            {{ locale === 'en' ? 'BG' : 'EN' }}
          </Button>
        </CardTitle>
        <CardDescription>
          {{ t('loginPage.description') }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-12">
        <AutoForm
          :form="loginForm" :schema="LoginFormSchema"
          :field-config="{
            username: { label: t('api.auth.username') },
            password: { label: t('api.auth.password') },
          }"
          class="space-y-6" @submit="(data) => {
            login(data as LoginRequest)
          }"
        >
          <Button class="w-full" type="submit" :loading="loading">
            {{ t('loginPage.submit') }}
          </Button>
        </AutoForm>
      </CardContent>
      <CardFooter>
        <Button variant="link" class="w-full">
          {{ t('loginPage.forgotPassword') }}
        </Button>
      </CardFooter>
    </Card>
  </main>
</template>
