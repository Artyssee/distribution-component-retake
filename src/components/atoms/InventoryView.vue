<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue';

export interface Props {
  segment: ISegment,
  segmentColor?: string;
}

const props = defineProps<Props>()

const showModal = ref(false);
</script>

<template>
  <Transition name="fade">
    <li v-show="props.segment.quantity > 0" @mouseover="() => showModal = true" @mouseleave="() => showModal = false" class="inventoryStatusListItem" :class="`inventoryStatusListItem--${props.segmentColor ? props.segmentColor : ''}`">
        <article class="inventoryStatusListArticle">
          <header class="inventoryStatusListHeader">
            <font-awesome-icon class="inventoryStatusListHeader__icon" :icon="faCalendarAlt" />
            <h2 class="inventoryStatusListHeader__heading">On {{ props.segment.date }}</h2>
          </header>
          <p class="inventoryStatusListHeader__text">{{ props.segment.quantity }} Shoes can be delivered</p>
        </article>
    </li>
  </Transition>
</template>

<style lang="scss" scoped>
// Segment colors
$primary-segment: #a5d49e;
$secondary-segment: #9cb37f;
$tertiary-segment: #522a28;
$quaternary-segment: #c73e1c;
$senary-segment: #c59749;

.inventoryStatusListItem {
  display: flex;
  background-color: $primary-white;
  border-radius: 8px;
  border: 1px solid $mint-green;
  padding: 1.2rem;
  position: relative;
  transition: 0.5s ease-in-out;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    .inventoryStatusListArticle {
      transform: translateX(0);
    }
  }

  &--primary {
    background-color: $primary-segment;
  }
  &--secondary {
    background-color: $secondary-segment;
  }
  &--tertiary {
    color: $primary-white;
    background-color: $tertiary-segment;

    .inventoryStatusListHeader__icon,
    .inventoryStatusListHeader__heading,
    .inventoryStatusListHeader__text {
      color: $primary-white;
    }
  }

  &--quartinary {
    background-color: $quaternary-segment;
    color: $primary-white;
    .inventoryStatusListHeader__icon,
    .inventoryStatusListHeader__heading,
    .inventoryStatusListHeader__text {
      color: $primary-white;
    }
  }

  &--senary {
    background-color: $senary-segment;
  }

  &--hidden {
    opacity: 0;
  }
}

.inventoryStatusListArticle {
  display: flex;
  flex-direction: row;
  transform: translateX(-55%);
  transition: 0.5s ease-in-out;
}

.inventoryStatusListHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;

  &__heading {
    margin: 0 1.2rem -4px 0;
    padding: 0 0 0 0.8rem;
  }

  &__text {
    transition: 0.5s ease-in-out;
  }
}
</style>
