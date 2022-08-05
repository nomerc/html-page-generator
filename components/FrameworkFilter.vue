<template>
  <div class="border-l-2 mx-2 mb-3 js-filter pl-3 border-black">
    <button
      v-for="{ title, filter, image } in cssFrameworks"
      :key="filter"
      :class="[
        'text-black font-semibold hover:text-green-500 px-2 py-1 transition-normal menu-button',
      ]"
      @click="$emit('change-css-filter', filter)"
    >
      <img :src="`images/${image}.svg`" class="inline-block mr-2 w-10 -mb-2" />
      {{ title }}
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
  },
}
</script>
