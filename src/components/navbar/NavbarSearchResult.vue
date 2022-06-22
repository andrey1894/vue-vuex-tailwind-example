<template>
  <div class="absolute z-10 mt-3 w-full">
    <div
      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white overflow-hidden flex flex-row"
    >
      <div class="relative flex flex-col px-5 py-6 flex-1">
        <template v-for="(users, key) in usersGroup" :key="key">
          <div>
            <span class="text-slate-500 font-medium text-xs">
              {{ key }} ({{ users.length }})
            </span>
          </div>
          <a
            v-for="user in users"
            :key="user.id"
            @mouseover="selectedUser = user"
            @mouseleave="selectedUser = null"
            href="#"
            class="user -mx-5 px-5 py-2 flex items-center gap-2 hover:bg-gray-200"
          >
            <UserLogo
              :size="10"
              :online="user.active"
              :logo="user.avatar"
              :first-name="user.firstName"
              :last-name="user.lastName"
              :membership="user.membership"
            />
            <div class="ml-2 flex items-center gap-2 flex-1">
              <span class="font-bold text-gray-900"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
              <span class="font-medium text-gray-500">{{ user.id }}</span>
            </div>
            <div class="py-1 px-2 bg-green-100 rounded" v-if="!user.membership">
              <span class="text-green-500 text-sm font-semibold">New</span>
            </div>
            <ChevronRightIcon
              class="h-9 text-gray-500"
              :class="{ 'opacity-0': user !== selectedUser }"
            />
          </a>
        </template>
      </div>

      <div class="px-16 py-10 flex-1 flex flex-col border-l-2">
        <template v-if="selectedUser">
          <div class="border-b-2 py-4 flex flex-col items-center">
            <div class="h-16">
              <UserLogo
                :size="16"
                :online="selectedUser.active"
                :logo="selectedUser.avatar"
                :first-name="selectedUser.firstName"
                :last-name="selectedUser.lastName"
                :membership="selectedUser.membership"
              />
            </div>
            <span class="font-bold text-gray-900">
              {{ selectedUser.firstName }}
            </span>
            <span class="font-medium text-gray-500">{{ selectedUser.id }}</span>
          </div>
          <div class="flex flex-col py-4 gap-2">
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Membership</span>
              <span class="basis-1/2 font-bold">
                {{ selectedUser.membership }}
              </span>
            </div>
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Phone</span>
              <span class="basis-1/2 font-medium text-gray-400">
                {{ selectedUser.phone }}
              </span>
            </div>
            <div class="flex flex-row flex-1">
              <span class="basis-1/4 font-medium">Email</span>
              <a
                :href="'mailto:' + selectedUser.emailAddress"
                class="basis-1/2 font-bold text-cyan-500"
              >
                {{ selectedUser.emailAddress }}
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChevronRightIcon } from "@heroicons/vue/solid";
import {
  ChatIcon,
  PhoneIcon,
  ChatAltIcon,
  LocationMarkerIcon,
} from "@heroicons/vue/outline";

import UserLogo from "@/components/shared/UserLogo.vue";
import { IUserGroup, IUserOutDto } from "@/models";

export default defineComponent({
  name: "NavbarSearchResult",
  components: {
    UserLogo,
    ChevronRightIcon,
    ChatIcon,
    PhoneIcon,
    ChatAltIcon,
    LocationMarkerIcon,
  },
  props: {
    users: Array,
  },
  data() {
    return {
      selectedUser: null,
    };
  },
  computed: {
    usersGroup() {
      const users = (this.users || []) as IUserOutDto[];
      return users.reduce((usersGroup: IUserGroup, user: IUserOutDto) => {
        if (!usersGroup[user.relationship]) {
          usersGroup[user.relationship] = [];
        }
        usersGroup[user.relationship].push(user);
        return usersGroup;
      }, {} as IUserGroup);
    },
  },
});
</script>

<style scoped lang="scss"></style>
