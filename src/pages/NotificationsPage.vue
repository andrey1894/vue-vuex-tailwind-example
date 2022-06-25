<template>
  <PageGrid title="Notifications">
    <template v-slot:content>
      <div class="p-4 flex flex-col gap-3">
        <button
          @click="$store.dispatch('ui/clearNotifications')"
          :disabled="!notifications.length"
          :class="{
            'hover:bg-blue-500 text-blue-700 hover:text-white border-blue-500 hover:border-transparent':
              notifications.length,
            'text-blue-400 border-blue-300': !notifications.length,
          }"
          class="bg-transparent font-semibold py-2 px-4 border rounded"
        >
          Clear all
        </button>
        <div
          v-for="(notification, index) in notifications"
          :key="notification"
          class="p-3 w-full flex items-center justify-between gap-3 bg-teal-200 text-teal-600 rounded-md"
        >
          <span>{{ notification.message }}</span>
          <button
            @click="$store.dispatch('ui/removeNotification', { index })"
            class="w-4 hover:opacity-75"
          >
            <XIcon />
          </button>
        </div>
      </div>
    </template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { XIcon } from "@heroicons/vue/outline";

import PageGrid from "@/components/shared/PageGrid.vue";

export default defineComponent({
  name: "NotificationsPage",
  components: {
    PageGrid,
    XIcon,
  },
  mounted() {
    this.$store.dispatch("ui/resetNotificationsStatus");
  },
  computed: {
    notifications() {
      return this.$store.state.ui.notifications;
    },
  },
});
</script>

<style scoped lang="scss"></style>
