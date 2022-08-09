<template>
  <div id="target" class="overflow-hidden font-sans">
    <section
      class="fixed left-0 top-0 bottom-0 overflow-y-auto bg-white p-8 w-2/3"
    >
      <Header />
      <FrameworkFilter
        :css-frameworks="css_frameworks"
        :css-filter="cssFilter"
        :is-changeable="isFrameworkChangeable"
        @change-css-filter="changeCssFilter"
      />
      <CategoryFilter
        :buttons="buttons"
        :item-filter="itemFilter"
        @change-category-filter="changeCategoryFilter"
      />

      <div
        v-dragula="items"
        :style="gHeight ? 'height: ' + gHeight : ''"
        class="flex flex-wrap flex-col items-start justify-start js-snippets"
        drake="first"
      >
        <figure
          v-for="item in items"
          v-show="
            (itemFilter === 'js-snippet' || itemFilter === item.type) &&
            cssFilter === item.css_framework
          "
          :key="item.image"
          class="js-snippet w-1/2 p-2"
        >
          <img
            :src="`images/${item.image}.png`"
            alt=""
            class="border border-gray-300 cursor-move hover:shadow transition-normal hover:translate-y-1 hover:border-black"
          />
        </figure>
      </div>
    </section>
    <section
      class="bg-gray-300 p-8 pb-0 w-1/3 flex flex-col fixed top-0 bottom-0 right-0"
    >
      <header class="mb-4">
        <button
          class="shadow text-center py-3 px-4 bg-black w-full hover:text-green-500 text-white js-download transition-normal"
          @click="generateHtml"
        >
          Generate HTML File with Functional CSS
        </button>
      </header>
      <div
        v-dragula="itemsDest"
        drake="first"
        class="flex flex-col flex-1 border js-droppable border-gray-300 overflow-y-auto"
      >
        <figure
          v-for="item in itemsDest"
          v-show="!hiddenItemIds.includes(item.id)"
          :key="item.id"
          class="js-snippet p-2 vue-element relative"
        >
          <div
            class="remove-button bg-white hidden absolute top-0 left-0 js-delete-btn px-4 py-2 shadow"
            @click="removeItem(item.id)"
          >
            <i class="far fa-trash-alt pointer-events-none"></i>
          </div>
          <img
            :src="`images/${item.image}.png`"
            alt=""
            class="border border-gray-300 cursor-move hover:shadow transition-normal hover:translate-y-1 hover:border-black"
          />
        </figure>
      </div>
      <Credits />
      <div class="bg-white hidden fixed js-delete-btn px-4 py-2 shadow">
        Delete <i class="far fa-trash-alt pointer-events-none"></i>
      </div>
    </section>
  </div>
</template>

<script>
import imagesLoaded from 'imagesloaded'
import Header from '../components/Header.vue'
import Credits from '../components/Credits.vue'
import { itemSet } from '~/static/data'
import FrameworkFilter from '~/components/FrameworkFilter.vue'
import CategoryFilter from '~/components/CategoryFilter.vue'
export default {
  components: { FrameworkFilter, CategoryFilter, Header, Credits },

  data() {
    return {
      itemFilter: 'js-snippet',
      cssFilter: 'css-tailwind',
      drag: false,
      gHeight: '',
      hiddenItemIds: [],
      itemsDest: [],
      items: itemSet,
    }
  },
  computed: {
    list() {
      return this.itemsDest
        .filter((item) => !this.hiddenItemIds.includes(item.id))
        .map((item) => item.image)
    },
    isFrameworkChangeable() {
      if (
        this.itemsDest.filter((item) => !this.hiddenItemIds.includes(item.id))
          .length > 0
      )
        return false
      return true
    },

    buttons() {
      return [
        { title: 'All', filter: 'js-snippet' },
        { title: 'Blog', filter: 'st-blog' },
        { title: 'Contact', filter: 'st-contact' },
        { title: 'Content', filter: 'st-content' },
        { title: 'CTA', filter: 'st-cta' },
        { title: 'E-Commerce', filter: 'st-ecommerce' },
        { title: 'Feature', filter: 'st-feature' },
        { title: 'Footer', filter: 'st-footer' },
        { title: 'Gallery', filter: 'st-gallery' },
        { title: 'Header', filter: 'st-header' },
        { title: 'Hero', filter: 'st-hero' },
        { title: 'Pricing', filter: 'st-pricing' },
        { title: 'Statistic', filter: 'st-statistic' },
        { title: 'Step', filter: 'st-step' },
        { title: 'Team', filter: 'st-team' },
        { title: 'Testimonial', filter: 'st-testimonial' },
      ]
    },
    css_frameworks() {
      return [
        { title: 'Tailwind', image: 'tailwind', filter: 'css-tailwind' },
        { title: 'Bootstrap', image: 'bootstrap', filter: 'css-bootstrap' },
      ]
    },
  },
  watch: {
    itemsDest(items, oldItems) {
      this.itemsDest.forEach((item) => {
        if (!item.id) {
          item.id = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5)
          const badElement = document.querySelector(
            '.js-droppable > .js-snippet:not(.vue-element)'
          )
          badElement.remove()
        }
      })
    },
  },
  created() {
    if (this.$dragula) {
      const service = this.$dragula.$service
      service.options('first', {
        revertOnSpill: true,
        copySortSource: false,
        copy(el, source) {
          return source.classList.contains('js-snippets')
        },
        accepts(el, target, source, sibling) {
          return !target.classList.contains('js-snippets')
        },
      })
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const snippets = document.querySelector('.js-snippets')
      ;['resize', 'load'].forEach((event) => {
        window.addEventListener(event, () => {
          imagesLoaded(snippets, () => {
            this.masonry('.js-snippets', '.js-snippet', 0, 2, 2, 1)
          })
        })
      })
      imagesLoaded(snippets, () => {
        this.masonry('.js-snippets', '.js-snippet', 0, 2, 2, 1)
      })
    }
  },
  methods: {
    generateHtml() {
      if (this.list && this.list.length) {
        this.$download(this.cssFilter, this.list)
      }
    },
    removeItem(itemId) {
      this.hiddenItemIds = [...this.hiddenItemIds, itemId]
    },
    masonry(grid, gridCell, gridGutter, dGridCol, tGridCol, mGridCol) {
      const gc = document.querySelectorAll(gridCell)
      const gcLength = gc.length
      let gHeight = 0
      for (let i = 0; i < gcLength; ++i) {
        gHeight += gc[i].offsetHeight + parseInt(gridGutter)
      }
      if (window.screen.width >= 1024) {
        this.gHeight =
          gHeight / dGridCol + gHeight / (gcLength + 1) + 100 + 'px'
      } else if (window.screen.width < 1024 && window.screen.width >= 768) {
        this.gHeight = gHeight / tGridCol + gHeight / (gcLength + 1) + 'px'
      } else {
        this.gHeight = gHeight / mGridCol + gHeight / (gcLength + 1) + 'px'
      }
    },
    changeCssFilter(filter) {
      this.cssFilter = filter
    },
    changeCategoryFilter(filter) {
      this.itemFilter = filter
    },
  },
}
</script>

<style lang="scss">
.drag-image {
}
.js-droppable > .js-snippet {
  width: 100%;
  padding: 0;
}

.js-droppable > .js-snippet:hover > .js-delete-btn {
  display: block;
}

.js-droppable > .js-snippet > img:hover {
  transform: none;
  border-color: #dae1e7;
}
.menu-button::after {
  content: ' ';
  display: inline-block;
}
.remove-button {
  z-index: 100;
}
</style>
