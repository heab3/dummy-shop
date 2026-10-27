
<script setup>
import { ref } from 'vue'

const searchText = ref('')

const emit = defineEmits(['search'])

function submitSearch() {
  emit('search', searchText.value.trim())
}
</script>

<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <label class="search-input-wrapper">
      <span class="search-icon">⌕</span>

      <input
        v-model="searchText"
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        @input="submitSearch"
      />
    </label>

    <button class="search-button" type="submit" aria-label="Search">
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    </button>
  </form>
</template>
