
<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change'])

const pages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (current >= total - 3) {
    return [
      1, '...',
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total
    ]
  }

  return [
    1,
    '...',
    current - 1,
    current,
    current + 1,
    '...',
    total
  ]
})

function changePage(page) {
  if (
    typeof page === 'number' &&
    page >= 1 &&
    page <= props.totalPages &&
    page !== props.currentPage
  ) {
    emit('change', page)
  }
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="pagination"
    aria-label="Product pagination"
  >
    <button
      class="page-button arrow-button"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="changePage(currentPage - 1)"
    >
      ‹
    </button>

    <template v-for="(page, index) in pages" :key="`${page}-${index}`">
      <span v-if="page === '...'" class="ellipsis">
        …
      </span>

      <button
        v-else
        class="page-button"
        :class="{ active: page === currentPage }"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="page-button arrow-button"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="changePage(currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 32px 0;
}

.page-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #fff;
  color: #334155;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.page-button:hover:not(:disabled):not(.active) {
  border-color: #4f46e5;
  color: #4f46e5;
}

.page-button.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
  box-shadow: 0 3px 8px #4f46e533;
}

.page-button:disabled {
  background: #f8fafc;
  color: #cbd5e1;
  cursor: not-allowed;
}

.arrow-button {
  font-size: 25px;
}

.ellipsis {
  color: #64748b;
  padding: 0 2px;
}

@media (max-width: 480px) {
  .pagination {
    gap: 5px;
  }

  .page-button {
    min-width: 34px;
    height: 36px;
    padding: 0 8px;
    font-size: 13px;
  }
}
</style>
