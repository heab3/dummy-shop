
<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['login', 'cart'])
</script>

<template>
  <header class="app-header">
    <a class="brand" href="#" @click.prevent="$emit('cart', 'home')">
      <span class="brand-icon">✿</span>
      <span>My Store</span>
    </a>

    <div class="header-actions">
      <button
        class="cart-button"
        aria-label="Shopping cart"
        @click="emit('cart')"
      >
        🛒
        <span v-if="cartCount > 0" class="cart-count">
          {{ cartCount }}
        </span>
      </button>

      <button class="login-button" @click="emit('login')">
        Login
      </button>
    </div>
  </header>
</template>
