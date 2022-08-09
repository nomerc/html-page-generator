<template>
  <div class="border-l-2 mx-2 mb-8 js-filter pl-3 border-black">
    <button
      v-for="{ title, filter, image } in cssFrameworks"
      :key="filter"
      :class="[
        isChangeable ? '' : 'inactive',
        cssFilter === filter ? 'shadow-btn-shadow' : '',
        'inline-flex items-center rounded-lg text-black font-semibold hover:enabled:text-green-500 px-2 py-1 transition-normal ',
      ]"
      @click="$emit('change-css-filter', filter)"
    >
      <img :src="`images/${image}.svg`" class="inline-block mr-2 w-10" />
      <p class="inline">{{ title }}</p>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    cssFrameworks: {
      type: Array,
      default() {
        return []
      },
    },
    isChangeable: Boolean,
    cssFilter: {
      type: String,
      default() {
        return ''
      },
    },
  },
}
</script>

<style>
.inactive {
  pointer-events: none;
  opacity: 25%;
}
</style>
