import { ref } from 'vue'
import { defineStore } from 'pinia'
import productData from '@/data/inventory.json'

export const useProductStore = defineStore('productStore', () => {
  const importedProductData = productData
  const products = ref(importedProductData)

  // TODO: Fix error json input or move actions for the products here

  return { products }
})
