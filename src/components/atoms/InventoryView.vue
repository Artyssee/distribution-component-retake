<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export interface Props {
  segment: ISegment
}

const props = defineProps<Props>()
</script>

<template>
  <Transition name="fade">
    <li v-if="props.segment.quantity > 0" class="inventoryStatusListItem">
      <div class="inventoryStatusDateContainer">
        <font-awesome-icon class="inventorySystemButton__icon" :icon="faCalendarAlt" />
        <p class="inventoryStatusDateContainer__text">
          <strong>On {{ props.segment.date }}</strong>
        </p>
      </div>

      <p>Products in stock: {{ props.segment.quantity >= 0 ? props.segment.quantity : 0 }}</p>
    </li>
  </Transition>
</template>

<style lang="scss" scoped>
.inventoryStatusListItem {
  background-color: $secondary-white;
  border-radius: 8px;
  border: 1px solid $mint-green;
  padding: 1.2rem;

  &:hover {
    border-color: $primary-black;
  }
}

.inventoryStatusDateContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  &__text {
    margin-top: 0;
    margin-bottom: -4px;
    padding-left: 0.8rem;
  }
}
</style>
