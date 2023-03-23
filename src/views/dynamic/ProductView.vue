<script setup lang="ts">
import inventorySystem from '@/components/organisms/InventorySystem.vue';

export interface Props {
  // Passing it via router makes it a string
  id: string
}

const props = defineProps<Props>()
</script>

<template>
    <inventorySystem :product-id="props.id" />
</template>