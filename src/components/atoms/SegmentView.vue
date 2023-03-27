<script setup lang="ts">
import type { ISegment } from '@/scripts/interfaces'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

export interface Props {
  segment: ISegment
  inShoppingCart: number
  segmentColor: string
  index: number
}

const props = defineProps<Props>()

const showModal = ref(false)

const setShowModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <Transition name="fade">
    <div v-if="props.index != 0 && showModal" class="segmentPopup">
      <font-awesome-icon class="segmentPopup__icon" :icon="faCalendarAlt" />
      <p>Available on: {{ props.segment.date }}</p>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-if="props.index === 0 && showModal" class="segmentPopup">
      <font-awesome-icon class="segmentPopup__icon" :icon="faCalendarAlt" />
      <p>Available Now!</p>
    </div>
  </Transition>
  <Transition name="fade">
    <li
      v-if="props.segment.quantity > 0"
      class="segment"
      v-on:mouseover="setShowModal"
      v-on:mouseleave="setShowModal"
      :class="`segment--${props.segmentColor}`"
    >
      <p class="segment__body">{{ props.segment.quantity }} units left in stock</p>
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

.segment {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  transition: 0.25s ease-in;
  pointer-events: all;

  &__body {
    display: flex;
    align-items: center;
    color: $primary-black;
    width: 100%;
    min-height: 60px;
    height: 100%;
    margin-left: 20px;
    padding: 0;
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

    .segment__heading,
    .segment__body {
      color: $primary-white;
    }
  }

  &--quartinary {
    background-color: $quaternary-segment;
    color: $primary-white;

    .segment__heading,
    .segment__body {
      color: $primary-white;
    }
  }

  &--senary {
    background-color: $senary-segment;
  }

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.segmentPopup {
  min-width: 200px;
  position: absolute;
  display: flex;
  align-items: center;
  height: auto;
  background-color: $primary-white;
  border: 1px solid $mint-green;
  border-radius: 8px;
  padding: 1.2rem;
  z-index: 1;
  top: -104px;
  margin-right: 2rem;

  &__icon {
    width: 2rem;
    height: 2rem;
    padding-left: 0;
    margin-left: 0;
    padding-right: 0.8rem;
  }

  &__text {
    color: $primary-black;
    width: 100%;
  }
}
</style>
