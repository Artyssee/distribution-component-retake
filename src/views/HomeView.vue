<script setup lang="ts">
import { useProductStore } from "@/stores/product";

const store = useProductStore();
</script>

<template>
  <main>
    <h2>Current products</h2>
    <ul>
      <li v-for="product in store.$state.products" :key="product.id">
        {{ product.id }}
        <RouterLink :to="{ name: 'product', params: { id: product.id }}">
          {{ product.productName }} {{ product.id }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
