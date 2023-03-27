<script setup lang="ts">
import { useProductStore } from '@/stores/product'

const store = useProductStore()
</script>

<template>
  <main class="main">
    <h1 class="main__heading">Shoes currently available</h1>
    <ul class="productList">
      <!-- TODO: Maybe make into seperate component later -->
      <li class="productListItem" v-for="product in store.$state.products" :key="product.id">
        <RouterLink
          class="productListItemLink"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          <article class="productArticle">
            <h2>{{ product.productName }}</h2>
            <p>Current available stock {{ product.segments[0].quantity }}</p>
          </article>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.main {
  &__heading {
    padding-left: 2rem;
  }
}

.productList {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 2rem;

  @include breakpoint('md') {
    grid-template-columns: 1fr 1fr;
  }

  @include breakpoint('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.productListItem {
  display: flex;
  flex-direction: column;
  border: 1px solid $primary-black;
  transition: 0.2s ease-in-out;

  &:hover {
    scale: 1.025;
  }
}

.productListItemLink {
  text-decoration: none;
}

.productArticle {
  color: $primary-black;
  padding: 1.2rem;
}
</style>
