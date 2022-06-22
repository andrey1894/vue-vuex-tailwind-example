<template>
  <PageGrid title="Settings">
    <template v-slot:content></template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageGrid from "@/components/shared/PageGrid.vue";

export default defineComponent({
  name: "SettingsPage",
  components: {
    PageGrid,
  },
});
</script>

<style scoped lang="scss"></style>
