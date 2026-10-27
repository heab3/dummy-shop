
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductList from './components/ProductList.vue'
import Pagination from './components/Pagination.vue'

const products = ref([])
const categories = ref([])

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)

const pageSize = 8
const loading = ref(true)
const error = ref('')

const selectedProduct = ref(null)
const cartCount = ref(0)
const showLogin = ref(false)

async function fetchProducts() {
  loading.value = true
  error.value = ''

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=0'),
      fetch('https://dummyjson.com/products/categories')
    ])

    if (!productsResponse.ok || !categoriesResponse.ok) {
      throw new Error('មិនអាចទាញយកទិន្នន័យពី API បានទេ។')
    }
    console.log('productsResponse',productsResponse)
    console.log('categoriesResponse',categoriesResponse)
    const productsData = await productsResponse.json()
    const categoriesData = await categoriesResponse.json()

    console.log('productsData',productsData)
    console.log('categoriesData',categoriesData)
    products.value = productsData.products
    categories.value = categoriesData
  } catch (err) {
    console.log('fetch product error',err)
    error.value = err.message || 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យ។'
  } finally {
    loading.value = false
  }
}

// Search + Category Filter
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return products.value.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query)

    const matchesCategory =
      !selectedCategory.value ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

// គណនាចំនួនទំព័រ
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize)
})

// យក Products សម្រាប់ទំព័របច្ចុប្បន្ន
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize

  return filteredProducts.value.slice(start, start + pageSize)
})

// ពេល Search ឬ Category ផ្លាស់ប្តូរ ត្រឡប់ទៅទំព័រ 1
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

function changeSearch(query) {
  searchQuery.value = query
}

function changeCategory(category) {
  selectedCategory.value = category
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function viewDetails(product) {
  selectedProduct.value = product
}

function addToCart() {
  cartCount.value++
  selectedProduct.value = null
}

function handleHeaderAction(action) {
  if (action === 'home') {
    searchQuery.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
    return
  }

  window.alert(`អ្នកមាន ${cartCount.value} items ក្នុង Cart។`)
}

onMounted(fetchProducts)

</script>

<template>
  <main class="store-container">
    <AppHeader
      :cart-count="cartCount"
      @login="showLogin = true"
      @cart="handleHeaderAction"
    />

    <section class="store-content">
      <SearchBar @search="changeSearch" />

      <CategoryFilter
        :categories="categories"
        :selected-category="selectedCategory"
        :total="filteredProducts.length"
        @change="changeCategory"
      />

      <div v-if="loading" class="status-message">
        <span class="loader"></span>
        <p>កំពុងទាញយក Products...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button class="details-button retry-button" @click="fetchProducts">
          Try Again
        </button>
      </div>

      <template v-else>
        <ProductList
          :products="paginatedProducts"
          @view-details="viewDetails"
        />

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="changePage"
        />
      </template>
    </section>

    <!-- Product Details Modal -->
    <div
      v-if="selectedProduct"
      class="modal-backdrop"
      @click.self="selectedProduct = null"
      @keydown.esc="selectedProduct = null"
    >
      <section class="modal-card" role="dialog" aria-modal="true">
        <button
          class="modal-close"
          aria-label="Close"
          @click="selectedProduct = null"
        >
          ×
        </button>

        <img
          class="modal-image"
          :src="selectedProduct.thumbnail"
          :alt="selectedProduct.title"
        />

        <h2>{{ selectedProduct.title }}</h2>
        <p class="product-category">
          {{ selectedProduct.category.replaceAll('-', ' ') }}
        </p>

        <p class="modal-description">
          {{ selectedProduct.description }}
        </p>

        <div class="modal-meta">
          <strong class="product-price">
            ${{ Number(selectedProduct.price).toFixed(2) }}
          </strong>
          <span class="product-rating">
            ★ {{ Number(selectedProduct.rating).toFixed(1) }}
          </span>
        </div>

        <button class="details-button" @click="addToCart">
          Add to Cart
        </button>
      </section>
    </div>

    <!-- Simple Login Modal -->
    <div
      v-if="showLogin"
      class="modal-backdrop"
      @click.self="showLogin = false"
    >
      <section class="modal-card login-card" role="dialog" aria-modal="true">
        <button class="modal-close" @click="showLogin = false">×</button>

        <h2>Login</h2>
        <p>Login UI សម្រាប់បន្តអភិវឌ្ឍន៍។</p>

        <label class="login-label">
          Username
          <input type="text" placeholder="Enter username" />
        </label>

        <label class="login-label">
          Password
          <input type="password" placeholder="Enter password" />
        </label>

        <button class="details-button" @click="showLogin = false">
          Close
        </button>
      </section>
    </div>
  </main>
</template>
