<script setup lang="ts">
import { z } from 'zod'
import { ref } from 'vue'
import consola from 'consola'
import Button from './ui/button/Button.vue'

defineProps<{
  msg: string
}>()

const schema = z.string({
  required_error: 'This field is required',
}).min(5, {
  message: 'This field must be at least 5 characters',
})
const text = ref()
const errors = ref<string[]>([])

function validate() {
  const res = schema.safeParse(text.value)
  if (!res.success) {
    errors.value = res.error.format()._errors
  }
  else {
    errors.value = []
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      {{ msg }}
    </h1>
    <h2 class="text-3xl text-sky-700">
      Hi
    </h2>
    <input v-model="text">
    <Button @click="validate">
      {{ $t('hello') }}
    </Button>
    <pre>
    {{ errors }}
    </pre>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
