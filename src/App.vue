<template>
  <div class="min-h-screen flex flex-col">
    <NavbarContainer :user="user" @logout="logout" />
    <main class="flex flex-col flex-1">
      <router-view @changeAuth="initCurrentUser" :user="user"></router-view>
    </main>
    <FooterContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavbarContainer from "@/components/navbar/NavbarContainer.vue";
import FooterContainer from "@/components/FooterContainer.vue";

import { isLoginPage, redirectToLogin, redirectToHome } from "@/router";
import { getCurrentUser, logout } from "@/api";
import { IUserOutDto } from "@/models";
import { clearToken } from "@/core";

export default defineComponent({
  name: "App",
  components: {
    NavbarContainer,
    FooterContainer,
  },
  data() {
    return {
      user: null as IUserOutDto | null,
    };
  },
  async mounted() {
    await this.initCurrentUser();
  },
  methods: {
    async initCurrentUser() {
      try {
        this.user = await getCurrentUser();
        if (isLoginPage()) {
          redirectToHome();
        }
      } catch {
        redirectToLogin();
      }
    },

    async logout() {
      try {
        await logout();
        clearToken();
        this.user = null;
        redirectToLogin();
      } catch {
        console.log("err");
      }
    },
  },
});
</script>

<style lang="scss"></style>
