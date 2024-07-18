<script setup lang="ts">
import { type HTMLAttributes, useSlots } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { Loader2 } from 'lucide-vue-next'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const slots = useSlots()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <template v-if="loading">
      <Loader2 :class="cn('h-4 w-4 animate-spin', slots.default && 'mr-2')" />
    </template>
    <slot />
  </Primitive>
</template>
