<script setup lang="ts">
export interface Props {
  productId: string
  inventory: IProduct[]
}

import router from '@/router'
import type { IProduct, ISegment } from '@/scripts/interfaces'
import {
  faCalendarAlt,
  faCircleArrowLeft,
  faShoppingBasket
} from '@fortawesome/free-solid-svg-icons'
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, type Ref } from 'vue'
// import InventoryRow from '../molecules/InventoryRow.vue'
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
  <div class="inventorySystem">
    <div class="inventorySystemHeader">
      <button class="inventorySystemButton" type="button" @click="returnToOverview">
        <font-awesome-icon class="inventorySystemButton__icon" :icon="faCircleArrowLeft" />
      </button>
      <h1 class="inventorySystemHeader__heading">Inventory system</h1>
    </div>
    <!-- <InventoryRow :segments="currentProduct.segments" /> -->
    <div class="inventoryInput">
      <div class="inventoryInputContainer">
        <div class="InventoryInputContainerHeading">
          <font-awesome-icon class="inventorySystemButton__icon" :icon="faCalendarAlt" />
          <p class="inventorySystem__text">Order can be completed on {{ activeSegment.date }}</p>
        </div>
        <div class="">
          <input
            class="inventorySystem__input"
            type="number"
            min="0"
            :value="inShoppingCart"
            @input="(e: Event) => setRelevantInput(e)"
          />
        </div>
      </div>
      <Transition name="fade">
        <div v-if="inShoppingCart > 0" class="inventoryContainer">
          <font-awesome-icon class="inventorySystemButton__icon" :icon="faShoppingBasket" />
          <p class="inventoryInput__inShoppingCart">
            Currently in shoppingcart: {{ inShoppingCart }}
          </p>
        </div>
      </Transition>
    </div>
    <SegmentRow
      v-if="hasRemainingSegments"
      :inShoppingCart="inShoppingCart"
      :segments="currentProduct.segments"
    />
    <p class="inventorySystem__text inventorySystem__text--large" v-else>
      We don't have anything in stock anymore
    </p>
  </div>
</template>

<style lang="scss" scoped>
.inventorySystem {
  display: flex;
  flex-direction: column;
  color: $primary-black;
  margin: 0 8px;

  &__input {
    color: $primary-black;
    border: 1px solid $primary-black;
    border-radius: 2.4px;
    padding: 0.4rem;
    outline: none;

    // Code for hiding number increment for number input fields
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    &[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield; /* Firefox */
    }
  }
}

.inventorySystemHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.inventorySystemButton {
  color: $primary-black;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 20px;
  padding: 0;

  &:hover {
    cursor: pointer;
    color: $indigo-dye;
    scale: 1.2;
    transition: 0.25s ease-in-out;
  }

  &__icon {
    width: 2rem;
    height: 2rem;
    padding-left: 0;
    margin-left: 0;
    padding-right: 0.8rem;
  }
}

.inventoryContainer {
  color: $primary-black;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: $primary-white;
  border: 1px solid $mint-green;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin-top: 0.8rem;
}
.inventoryInput {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.inventoryInputContainer {
  background-color: $primary-white;
  padding: 0.8rem 1.2rem;
  border: 1px solid $mint-green;
  border-radius: 8px;

  @include breakpoint('md') {
    margin-right: 1.2rem;
  }
}
.InventoryInputContainerHeading {
  display: flex;
  align-items: center;
}
</style>
