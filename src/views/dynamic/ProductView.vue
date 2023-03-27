<script setup lang="ts">
import inventorySystem from '@/components/organisms/InventorySystem.vue'
import inventory from '@/data/inventory.json'

export interface Props {
  // Passing it via router makes it a string
  id: string
}

const props = defineProps<Props>()
// let currentInventory = inventory

// const restockProducts = () => {
//   currentInventory = inventory
// }
</script>

<template>
  <main>
      <inventorySystem
      :inventory="inventory"
      :product-id="props.id"
    />
  </main>
</template>
