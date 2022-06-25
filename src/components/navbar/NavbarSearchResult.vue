<template>
  <div class="absolute z-10 mt-3 w-full">
    <div
      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white overflow-hidden flex flex-row search-result-wrapper"
    >
      <div class="relative flex flex-col px-5 py-6 flex-1 overflow-auto">
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

      <UserInfo :user="selectedUser" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChevronRightIcon } from "@heroicons/vue/solid";

import UserLogo from "@/components/shared/UserLogo.vue";
import UserInfo from "@/components/user/UserInfo.vue";
import { IUserGroup, IUserOutDto } from "@/models";

export default defineComponent({
  name: "NavbarSearchResult",
  components: {
    UserLogo,
    ChevronRightIcon,
    UserInfo,
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

<style scoped lang="scss">
.search-result-wrapper {
  max-height: 80vh;
}
</style>
