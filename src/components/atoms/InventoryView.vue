<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'

export interface Props {
  segment: ISegment
}

const props = defineProps<Props>()
</script>

<template>
  <Transition name="fade">
    <li v-if="props.segment.quantity > 0" class="inventorySatusList__item">
      <p>
        <strong>On: {{ props.segment.date }}</strong>
      </p>
      <p>{{ props.segment.quantity >= 0 ? props.segment.quantity : 0 }}</p>
    </li>
  </Transition>
</template>

<style lang="scss" scoped>
// Vue transition for fading out segments
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
