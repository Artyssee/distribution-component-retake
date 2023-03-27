<script setup lang="ts">
export interface Props {
  productId: string
  inventory: IProduct[]
}

import router from '@/router'
import type { IProduct, ISegment } from '@/scripts/interfaces'
import { ref, type Ref } from 'vue'
import InventoryRow from '../molecules/InventoryRow.vue'
import SegmentRow from '../molecules/SegmentRow.vue'

const inShoppingCart = ref(0)
const props = defineProps<Props>()

/**
 * Setting the current product by filtering out the incorrect ones.
 * Afterwards the segments are filtered to only display ones with quantity
 */
const currentProduct = ref(
  props.inventory.filter((product) => product.id === parseInt(props.productId))[0]
)
currentProduct.value.segments = currentProduct.value.segments.filter(
  (segment: ISegment) => segment.quantity > 0
)

/**
 * Setting the currently active product segment from which the quantity can be extracted
 */
const activeSegment: Ref<ISegment> = ref(
  currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0]
)

// Variable for deciding if there is a segment with a quantity left within it, otherwise show that the product is out of stock
const hasRemainingSegments = ref(true)

const returnToOverview = () => {
  router.push({ name: 'home' })
}

const emit = defineEmits(['restockProducts'])

const setRelevantInput = (e: Event) => {
  emit('restockProducts')

  currentProduct.value = props.inventory.filter(
    (product) => product.id === parseInt(props.productId)
  )[0]
  currentProduct.value.segments = currentProduct.value.segments.filter(
    (segment: ISegment) => segment.quantity > 0
  )
  activeSegment.value = currentProduct.value.segments.filter(
    (segment: ISegment) => segment.quantity > 0
  )[0]

  const value = parseInt((e.target as HTMLInputElement).value)
  const remainder = ref(0)

  // Arrange the value of shoppingcart to be always number and never as String
  if (value) {
    inShoppingCart.value = value
  } else if (value === 0 || String(value) === '') {
    inShoppingCart.value = 0
  } else {
    inShoppingCart.value = 0
  }

  activeSegment.value.quantity -= inShoppingCart.value

  /**
   * Check if there is a remainder from the quantity minus the shoppincart value.
   * If there is, convert it to a positive number and keep looping over segments until the remainder minus the quantity does not equal or go below zero.
   */
  if (activeSegment.value.quantity <= 0) {
    remainder.value = Math.abs(activeSegment.value.quantity)

    while (
      remainder.value > 0 &&
      currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0]
    ) {
      activeSegment.value = currentProduct.value.segments.filter(
        (segment: ISegment) => segment.quantity > 0
      )[0]

      while (activeSegment.value.quantity - remainder.value <= 0) {
        remainder.value -= activeSegment.value.quantity
        activeSegment.value.quantity = 0
        activeSegment.value = currentProduct.value.segments.filter(
          (segment: ISegment) => segment.quantity > 0
        )[0]
      }

      activeSegment.value.quantity -= remainder.value
      remainder.value = 0
    }

    if (
      currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0).length === 0
    ) {
      hasRemainingSegments.value = false
    }
  }
}
</script>

<template>
  <button type="button" @click="returnToOverview">Go back</button>
  <h1>Inventory system</h1>
  <InventoryRow :segments="currentProduct.segments" />
  <p>Currently in shoppingcart: {{ inShoppingCart }}</p>
  <p>Order can be completed on {{ activeSegment.date }}</p>
  <input type="number" min="0" :value="inShoppingCart" @input="(e: Event) => setRelevantInput(e)" />
  <SegmentRow
    v-if="hasRemainingSegments"
    :inShoppingCart="inShoppingCart"
    :segments="currentProduct.segments"
  />
  <p v-else>We don't have anything in stock anymore</p>
</template>

<style lang="scss" scoped></style>
