<template>
  <div class="relative lg:flex-1">
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none lg:flex-1"
    >
      <svg
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <input
      type="text"
      v-model="searchText"
      class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search"
      required
    />
    <button
      type="submit"
      class="absolute right-2.5 bottom-3.5 flex items-center text-sm leading-6 text-slate-400"
      v-show="searchText"
      @click="searchText = ''"
    >
      <XIcon class="h-6" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { XIcon } from "@heroicons/vue/outline";

export default defineComponent({
  name: "NavbarSearch",
  components: {
    XIcon,
  },
  emits: ["search"],
  data() {
    return {
      searchText: "",
    };
  },
  watch: {
    searchText() {
      const text = this.searchText.length >= 1 ? this.searchText : "";
      this.$emit("search", { text });
    },
  },
});
</script>

<style scoped lang="scss"></style>
