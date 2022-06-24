<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <NavbarContainer :user="$store.state.user.user" @logout="logout" />
    <div class="flex flex-col flex-1 overflow-hidden">
      <router-view @changeAuth="initCurrentUser" :user="user"></router-view>
    </div>
    <FooterContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavbarContainer from "@/components/navbar/NavbarContainer.vue";
import FooterContainer from "@/components/FooterContainer.vue";

import { isLoginPage, redirectToLogin, redirectToHome } from "@/router";
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
      const isLogin = await this.$store.dispatch("user/initCurrentUser");
      if (isLoginPage() && isLogin) {
        redirectToHome();
      } else if (!isLoginPage() && !isLogin) {
        redirectToLogin();
      }
    },

    async logout() {
      const isSuccess = await this.$store.dispatch("user/logout");
      if (isSuccess) {
        clearToken();
        redirectToLogin();
      }
    },
  },
});
</script>

<style lang="scss"></style>
