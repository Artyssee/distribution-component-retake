<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { faker } from '@faker-js/faker'

const store = useProductStore()
</script>

<template>
  <main class="main">
    <h1 class="main__heading">Shoes currently available</h1>
    <ul class="productList">
      <li class="productListItem" v-for="product in store.$state.products" :key="product.id">
        <RouterLink
          class="productListItemLink"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          <img
            class="productListItemLink__image"
            :src="faker.image.unsplash.objects(100, 100, 'shoe')"
            :alt="product.productName"
          />
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
  border: 1px solid $mint-green;
  transition: 0.2s ease-in-out;
  background-color: $primary-white;
  border-radius: 8px;

  &:hover {
    scale: 1.025;
    border-color: $primary-black;
  }
}

.productListItemLink {
  display: flex;
  flex-direction: row;
  text-decoration: none;

  &__image {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 40%;
    height: 200px;
    background-color: $mint-green;
  }
}

.productArticle {
  display: flex;
  flex-direction: column;
  color: $primary-black;
  padding: 1.2rem;
}
</style>
