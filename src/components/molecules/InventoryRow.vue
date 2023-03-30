<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'
import { onUpdated, ref, type Ref } from 'vue';
import InventoryView from '../atoms/InventoryView.vue'

export interface Props {
  segments: ISegment[]
}

const props = defineProps<Props>()

/**
 * Variables for generating colored sections.
 * The onBeforeMount function will loop over the colors infinitely
 **/
 const segmentColors = ['primary', 'secondary', 'tertiary', 'quartinary', 'senary']
const renderedSegmentColors: Ref<string[]> = ref([])
let colorIndex = 0;

onUpdated(() => {
  props.segments.map(() => {

    // if we reach the maximum amount of colors, begin again with the colors array.
    if (colorIndex > segmentColors.length - 1) {
      colorIndex = 0
    }

    renderedSegmentColors.value.push(segmentColors[colorIndex])
    colorIndex++
  })
})
</script>

<template>
  <ul class="inventoryStatusList">
    <InventoryView v-for="(segment, index) in props.segments" :segmentColor="renderedSegmentColors[index]" :segment="segment" :key="index" />
  </ul>
</template>

<style lang="scss" scoped>
.inventoryStatusList {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin: 1.2rem 0 0 0;
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
