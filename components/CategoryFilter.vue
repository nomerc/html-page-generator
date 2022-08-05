<template>
  <div class="border-l-2 mx-2 mb-3 js-filter pl-3 border-black">
    <button
      v-for="{ title, filter } in buttons"
      :key="filter"
      :class="[
        itemFilter === filter ? 'shadow-btn-shadow' : '',
        'm-2 bg-gray-300 pt-2 pb-2 px-6 rounded-full font-sans font-medium text-xs capitalize border-0 hover:shadow-btn-shadow transition-normal',
      ]"
      @click="$emit('change-category-filter', filter)"
    >
      <img
        v-if="itemFilter === filter"
        src="@@/static/images/tick.svg"
        alt="selected"
        class="inline-block"
      />
      {{ title }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    buttons: {
      type: Array,
      default() {
        return []
      },
    },
    itemFilter: {
      type: String,
      default: '',
    },
  },
}
</script>
