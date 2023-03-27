<script setup lang="ts">
export interface Props {
  segments: ISegment[]
  inShoppingCart: number
}

import type { ISegment } from '@/scripts/interfaces'
import { onBeforeMount, onMounted } from 'vue'
import SegmentView from '../atoms/SegmentView.vue'

const props = defineProps<Props>()

/**
 * Variables for generating colored sections.
 * The onBeforeMount function will loop over the colors infinitely
**/
const segmentColors = ['primary', 'secondary', 'tertiary', 'quartinary', 'senary']
let renderedSegmentColors: string[] = []
let colorIndex = 0
let timer = 100

onBeforeMount(() => {
  props.segments.map(() => {
    // if we reach the maximum amount of colors, begin again with the colors array.
    if (colorIndex > (segmentColors.length - 1)) {
      colorIndex = 0
    }

    renderedSegmentColors.push(segmentColors[colorIndex])
    colorIndex++
  })
})

/**
 * When the component is mounted it is hidden by default.
 * By adding a interval and increasing it gradually, each segment gets show one by one
*/
onMounted(() => {
  const segments = document.querySelectorAll('.segment')

  segments.forEach((segment) => {
    segment.classList.add('segment--hidden')

    setTimeout(() => {
      segment.classList.remove('segment--hidden')
    }, timer)

    timer += 100
  })
})
</script>

<template>
  <ul class="segmentsList">
    <SegmentView
      v-for="(segment, index) in props.segments"
      :inShoppingCart="props.inShoppingCart"
      :segmentColor="renderedSegmentColors[index]"
      :segment="segment"
      :index="index"
      :key="index"
    />
  </ul>
</template>

<style lang="scss" scoped>
.segmentsList {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  padding: 0;

  @include breakpoint('md') {
    grid-template-columns: 1fr 1fr;
  }

  @include breakpoint('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
