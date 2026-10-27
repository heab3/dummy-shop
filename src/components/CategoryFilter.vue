
<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['change'])
</script>

<template>
  <div class="filter-row">
    <select
      :value="selectedCategory"
      class="category-select"
      aria-label="Filter by category"
      @change="emit('change', $event.target.value)"
    >
      <option value="">All Categories</option>

      <option
        v-for="category in categories"
        :key="category.slug"
        :value="category.slug"
      >
        {{ category.name }}
      </option>
    </select>

    <span class="product-total">
      Total: {{ total }} products
    </span>
  </div>
</template>
