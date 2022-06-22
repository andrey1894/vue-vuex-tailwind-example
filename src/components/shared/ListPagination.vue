<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ start }}</span>
          to
          <span class="font-medium">{{ end }}</span>
          of
          <span class="font-medium">{{ count }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            :disabled="page === 1"
            :class="{
              'text-gray-300': page === 1,
              'text-gray-500 hover:bg-gray-50': page !== 1,
            }"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <button
            v-for="item in paginationNumbers"
            :key="item"
            :disabled="item === page || item === -1"
            :class="{
              'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':
                item === page,
              'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                item !== page && item !== -1,
              'bg-white border-gray-300': item === -1,
            }"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {{ item !== -1 ? item : "..." }}
          </button>
          <button
            :disabled="item === lastPage"
            :class="{
              'text-gray-300': page === lastPage,
              'text-gray-500 hover:bg-gray-50': page !== lastPage,
            }"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      largeSize: 11,
      logoSrc: "",
    };
  },
  computed: {
    start(): number {
      return (this.page - 1) * this.limit + 1;
    },
    end(): number {
      return this.start + this.limit - 1;
    },
    lastPage(): number {
      return Math.ceil(this.count / this.limit);
    },
    paginationNumbers(): number[] {
      const maxPages = 4;
      let start = 1;
      let end = this.lastPage;
      let showMultiPagesDotsStart = false;
      let showMultiPagesDotsEnd = false;
      if (this.count > maxPages + 1) {
        // 1 ... 5, 6, 7, 8
        if (this.page > this.lastPage - maxPages + 1) {
          start = this.lastPage - maxPages + 1;
          end = this.lastPage;
          showMultiPagesDotsStart = true;
        } else if (this.page < maxPages) {
          // 1, 2, 3, 4 ... 8
          start = 1;
          end = maxPages;
          showMultiPagesDotsEnd = true;
        } else {
          // 4, 5, 6, 7, ... 10
          start = this.page - 1;
          end = this.page + maxPages - 2;
          showMultiPagesDotsEnd = true;
        }
      }

      let pagination = this.range(start, end + 1); // _.range(1, 4) => [1, 2, 3]   That's why we need this.lastPage + 1
      if (showMultiPagesDotsStart) {
        pagination = [1, -1, ...pagination];
      }

      if (showMultiPagesDotsEnd) {
        pagination = [...pagination, -1, this.lastPage];
      }

      return pagination;
    },
  },
  methods: {
    range(start: number, end: number): number[] {
      const rangeVal = [];
      for (let i = start; i < end; i++) {
        rangeVal.push(i);
      }
      return rangeVal;
    },
  },
});
</script>

<style scoped lang="scss"></style>
