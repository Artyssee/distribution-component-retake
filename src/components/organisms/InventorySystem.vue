<script setup lang="ts">
export interface Props {
  productId: string
  inventory: IProduct[]
  originalInventory: IProduct[]
}

import router from '@/router'
import type { IProduct, ISegment } from '@/scripts/interfaces'
import {
  faCalendarAlt,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref, type Ref } from 'vue'
import InventoryRow from '../molecules/InventoryRow.vue'
// import InventoryRow from '../molecules/InventoryRow.vue'
import SegmentRow from '../molecules/SegmentRow.vue'

const inShoppingCart = ref(0)
const isCurrentSegment = ref(true);
const passedSegmentsArray: Ref<ISegment[]> = ref([]);
const props = defineProps<Props>()

/**
 * Setting the current product by filtering out the incorrect ones.
 * Afterwards the segments are filtered to only display ones with quantity
 */
const originalCurrentProduct = ref(props.originalInventory.filter((product) => product.id === parseInt(props.productId))[0]);

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

const returnToOverview = () => {
  router.push({ name: 'home' })
}

const emit = defineEmits(['restockProducts'])

const setRelevantInput = (e: Event) => {
  passedSegmentsArray.value = [];
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
  isCurrentSegment.value = true;

  const value = parseInt((e.target as HTMLInputElement).value)
  const remainder = ref(0);

  let originalActivesegment = originalCurrentProduct.value.segments.filter((segment: ISegment) => segment.date === activeSegment.value.date)[0];

  // Arrange the value of shoppingcart to be always number and never as String
  if (value) {
    inShoppingCart.value = value
  } else if (value === 0 || String(value) === '') {
    inShoppingCart.value = 0
  } else {
    inShoppingCart.value = 0
  }

  activeSegment.value.quantity -= inShoppingCart.value

  while (activeSegment.value.quantity <= 0) {
    remainder.value = Math.abs(activeSegment.value.quantity);
    activeSegment.value.quantity = 0;
    
    passedSegmentsArray.value.push({
      quantity: originalActivesegment.quantity,
      date: originalActivesegment.date
    })

    activeSegment.value = currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0];
    originalActivesegment = originalCurrentProduct.value.segments.filter((segment: ISegment) => segment.date === activeSegment.value.date)[0];

    if (isCurrentSegment.value === true) {
      isCurrentSegment.value = false;
    }

    activeSegment.value.quantity -= remainder.value;
  }

  passedSegmentsArray.value.push({
    quantity: remainder.value,
    date: activeSegment.value.date
  })

  activeSegment.value.quantity -= remainder.value;

  if (inShoppingCart.value === 0) {
    passedSegmentsArray.value.push({
      quantity: originalCurrentProduct.value.segments[0].quantity,
      date: originalCurrentProduct.value.segments[0].date
    })
  }
}

onMounted(() => {
  passedSegmentsArray.value.push({
    quantity: originalCurrentProduct.value.segments[0].quantity,
    date: originalCurrentProduct.value.segments[0].date
  })
});
</script>

<template>
  <div class="inventorySystem">
    <div class="inventorySystemHeader">
      <button class="inventorySystemButton" type="button" @click="returnToOverview">
        <font-awesome-icon class="inventorySystemButton__icon" :icon="faCircleArrowLeft" />
      </button>
      <h1 class="inventorySystemHeader__heading">Inventory system</h1>
    </div>
    <div class="inventoryInput">
      <div class="inventoryInputContainer">
        <div class="InventoryInputContainerHeading">
          <font-awesome-icon class="inventorySystemButton__icon" :icon="faCalendarAlt" />
          <p v-if="!isCurrentSegment && inShoppingCart > 0" class="inventorySystem__text">Your order can be completed on {{ activeSegment.date }}</p>
          <p v-else-if="isCurrentSegment && inShoppingCart > 0" class="inventorySystem__text">
              Your order can be completed Right now!
          </p>
          <p v-else class="inventorySystem__text">Input your quantity to see the delivery time!</p>
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
      <InventoryRow :segments="passedSegmentsArray" />
    </div>
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
  flex-direction: column;
}

.inventoryInputContainer {
  .inventorySystem__text {
    margin: 0 1.2rem 0 0;
  }
}
.InventoryInputContainerHeading {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
}
</style>
