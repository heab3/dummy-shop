
<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details'])
</script>

<template>
  <article class="product-card">
    <div class="product-image-wrapper">
      <img
        class="product-image"
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
      />
    </div>

    <div class="product-info">
      <h2 class="product-title" :title="product.title">
        {{ product.title }}
      </h2>

      <p class="product-category">
        {{ product.category.replaceAll('-', ' ') }}
      </p>

      <div class="product-price-rating">
        <span class="product-price">
          ${{ Number(product.price).toFixed(2) }}
        </span>

        <span class="product-rating">
          <span class="star">★</span>
          {{ Number(product.rating).toFixed(1) }}
        </span>
      </div>

      <button
        class="details-button"
        @click="emit('view-details', product)"
      >
        View Details
      </button>
    </div>
  </article>
</template>
