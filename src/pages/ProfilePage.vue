<template>
  <PageGrid title="Profile">
    <template v-slot:content>
      <div class="px-16 py-10 flex-1 flex flex-col border-l-2">
        <template v-if="user">
          <div class="border-b-2 py-4 flex flex-col items-center">
            <div class="h-16">
              <UserLogo
                :size="16"
                :online="user.active"
                :logo="user.avatar"
                :first-name="user.firstName"
                :last-name="user.lastName"
                :membership="user.membership"
              />
            </div>
            <span class="font-bold text-gray-900">
              {{ user.firstName }}
            </span>
            <span class="font-medium text-gray-500">{{ user.id }}</span>
          </div>
          <div class="flex flex-col py-4 gap-2">
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Membership</span>
              <span class="basis-1/2 font-bold">
                {{ user.membership }}
              </span>
            </div>
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Phone</span>
              <span class="basis-1/2 font-medium text-gray-400">
                {{ user.phone }}
              </span>
            </div>
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Email</span>
              <a
                :href="'mailto:' + user.emailAddress"
                class="basis-1/2 font-bold text-cyan-500"
              >
                {{ user.emailAddress }}
              </a>
            </div>
          </div>
          <div class="flex items-center mt-8 justify-around gap-2">
            <button
              type="button"
              class="p-3 bg-gray-100 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200"
            >
              <ChatIcon class="h-8" />
            </button>
            <button
              type="button"
              class="p-3 bg-gray-100 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200"
            >
              <PhoneIcon class="h-8" />
            </button>
            <button
              type="button"
              class="p-3 bg-gray-100 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200"
            >
              <ChatAltIcon class="h-8" />
            </button>
            <button
              type="button"
              class="p-3 bg-gray-100 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-200"
            >
              <LocationMarkerIcon class="h-8" />
            </button>
          </div>
        </template>
      </div>
    </template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ChatIcon,
  PhoneIcon,
  ChatAltIcon,
  LocationMarkerIcon,
} from "@heroicons/vue/outline";

import PageGrid from "@/components/shared/PageGrid.vue";
import UserLogo from "@/components/shared/UserLogo.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    PageGrid,
    UserLogo,
    ChatIcon,
    PhoneIcon,
    ChatAltIcon,
    LocationMarkerIcon,
  },
  props: {
    user: Object,
  },
});
</script>

<style scoped lang="scss"></style>
