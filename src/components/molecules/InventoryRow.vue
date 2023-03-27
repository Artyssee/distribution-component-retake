<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'
import InventoryView from '../atoms/InventoryView.vue'

export interface Props {
  segments: ISegment[]
}

const props = defineProps<Props>()
</script>

<template>
  <ul class="inventoryStatusList">
    <InventoryView v-for="(segment, index) in props.segments" :segment="segment" :key="index" />
  </ul>
</template>

<style lang="scss" scoped>
.inventoryStatusList {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  padding: 0;
  list-style-type: none;

  @include breakpoint('md') {
    grid-template-columns: 1fr 1fr;
  }

  @include breakpoint('lg') {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
  }
}
</style>
