import { ref } from 'vue'
import { defineStore } from 'pinia'
import productData from '@/data/inventory.json';

export const useProductStore = defineStore('productStore', () => {
  const importedProductData = productData;
  const products = ref(importedProductData);

  function restockProducts() {
    products.value = productData;
  }

  return { products, restockProducts }
})
