<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
      </div>
    </header>
    <main class="flex flex-col flex-1 overflow-hidden">
      <div
        class="flex flex-col flex-1 overflow-hidden max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
      >
        <div class="flex flex-col flex-1 overflow-hidden px-4 py-6 sm:px-0">
          <div
            class="flex flex-col flex-1 overflow-auto border-4 border-dashed border-gray-200 rounded-lg"
          >
            <slot name="content"></slot>
          </div>

          <footer>
            <slot name="footer"> </slot>
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageGrid",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
