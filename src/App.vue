<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTitle } from '@/lib/utils'

useTitle('-', { titleTemplate: '%s | Code Hospitality CMS' })
</script>

<template>
  <RouterView />
</template>
