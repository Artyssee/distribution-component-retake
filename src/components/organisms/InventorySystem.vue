<script setup lang="ts">
export interface Props {
  productId: string
}

import router from "@/router";
import type { ISegment } from "@/scripts/interfaces";
import { useProductStore } from "@/stores/product";
import { ref, type Ref } from "vue";
import SegmentRow from "../molecules/SegmentRow.vue";

const inShoppingCart = ref(0);
const store = useProductStore();
const props = defineProps<Props>()

const currentProduct = ref(store.products.filter((product) => product.id === parseInt(props.productId))[0]);
currentProduct.value.segments = currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0);

const activeSegment: Ref<ISegment> = ref(currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0]);
const hasRemainingSegments = ref(true);

const returnToOverview = () => {
  router.push({ name: 'home' });
}

const setRelevantInput = (e: Event) => {
  const value = parseInt((e.target as HTMLInputElement).value);
  const remainder = ref(0);

  // Arrange the value of shoppingcart to be always number and never as String
  if (value) {
    inShoppingCart.value = value;
  } else if (value === 0 || String(value) === "") {
    inShoppingCart.value = 0;
  } else {
    inShoppingCart.value = 0;
  }

  // TODO: Restock is not working probably. Why I don't know yet
  store.restockProducts();

  activeSegment.value.quantity -= inShoppingCart.value;

  if (activeSegment.value.quantity <= 0) {
    remainder.value = Math.abs(activeSegment.value.quantity);

    while(remainder.value > 0 && currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0]) {
        activeSegment.value = currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0];

        while (activeSegment.value.quantity - remainder.value <= 0) {
          remainder.value -= activeSegment.value.quantity;
          activeSegment.value.quantity = 0;
          activeSegment.value = currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0)[0];
        }

        activeSegment.value.quantity -= remainder.value;
        remainder.value = 0;
    }

    if(currentProduct.value.segments.filter((segment: ISegment) => segment.quantity > 0).length === 0) {
      hasRemainingSegments.value = false;
    }
  }
}
</script>

<template>
  <button type="button" @click="returnToOverview">Go back</button>
    <h1>Inventory system</h1>
    <p>Currently in shoppingcart: {{ inShoppingCart }}</p>
    <p>Order can be completed on {{ activeSegment.date }}</p>
    <input type="number" min="0" :value="inShoppingCart" @input="(e: Event) => setRelevantInput(e)" />
    <SegmentRow v-if="hasRemainingSegments" :inShoppingCart="inShoppingCart" :segments="currentProduct.segments" />
    <p v-else>We don't have anything in stock anymore</p>
</template>