<script setup lang="ts">
import inventorySystem from '@/components/organisms/InventorySystem.vue'
import inventory from '@/data/inventory.json'
import type { IProduct } from '@/scripts/interfaces'
import { ref, type Ref } from 'vue'

export interface Props {
  // Passing it via router makes it a string
  id: string
}

const props = defineProps<Props>()
let currentInventory: Ref<IProduct[]> = ref(structuredClone(inventory))

const restockProducts = () => {
  currentInventory.value = structuredClone(inventory)
}
</script>

<template>
  <main>
    <inventorySystem
      :inventory="currentInventory"
      :product-id="props.id"
      @restock-products="restockProducts"
    />
  </main>
</template>
