<template>
  <nav class="bg-gray-800 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center flex-1">
          <router-link class="flex-shrink-0" to="/">
            <img
              class="h-10 w-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </router-link>
          <div class="flex-1">
            <div class="ml-10 flex items-baseline space-x-4 flex-1">
              <div class="relative flex-1">
                <NavbarSearch @search="searchUsers($event.text)" />
                <NavbarSearchResult
                  v-show="users && users.length"
                  :users="users"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="ml-4 flex items-center md:ml-6">
            <router-link
              to="/notifications"
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <BellIcon class="w-6" />
            </router-link>

            <!-- Profile dropdown -->
            <div class="ml-3 relative" @click="showMenu = !showMenu">
              <div>
                <button
                  v-if="user"
                  type="button"
                  class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <UserLogo
                    :size="10"
                    :online="user.active"
                    :logo="user.avatar"
                    :first-name="user.firstName"
                    :last-name="user.lastName"
                    :membership="user.membership"
                  />
                </button>
              </div>

              <div
                v-show="showMenu"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  >Your Profile</router-link
                >

                <router-link
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  >Settings</router-link
                >

                <button
                  @click="$emit('logout')"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BellIcon } from "@heroicons/vue/outline";
import NavbarSearch from "./NavbarSearch.vue";
import NavbarSearchResult from "./NavbarSearchResult.vue";
import UserLogo from "@/components/shared/UserLogo.vue";
import { searchUsers } from "@/api";
import { IUserOutDto } from "@/models";

export default defineComponent({
  name: "NavbarComponent",
  components: {
    BellIcon,
    UserLogo,
    NavbarSearch,
    NavbarSearchResult,
  },
  props: {
    user: Object,
  },
  emits: ["logout"],
  data() {
    return {
      users: [] as IUserOutDto[],
      searchText: "",
      showMenu: false,
    };
  },
  methods: {
    async searchUsers(searchText: string) {
      this.searchText = searchText;
      this.users = searchText ? await searchUsers(searchText) : [];
    },
  },
});
</script>

<style scoped lang="scss"></style>
