
<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view-details'])
</script>

<template>
  <div v-if="products.length" class="product-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @view-details="emit('view-details', $event)"
    />
  </div>

  <div v-else class="empty-state">
    <span class="empty-icon">🔎</span>
    <h3>No products found</h3>
    <p>សូមសាកល្បងពាក្យស្វែងរក ឬ Category ផ្សេងទៀត។</p>
  </div>
  
</template>
