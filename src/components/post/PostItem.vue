<template>
  <section class="p-4">
    <header class="mb-4">
      <h3 class="text-lg font-bold">{{ capitalizeTitle }}</h3>
    </header>
    <article>{{ post.body }}</article>
    <footer class="flex items-center justify-between">
      <router-link
        :to="{ name: 'User', params: { id: post.user.id } }"
        class="user -mx-5 px-5 py-2 flex items-center gap-2 hover:bg-gray-200"
      >
        <UserLogo
          :size="10"
          :online="post.user.active"
          :logo="post.user.avatar"
          :first-name="post.user.firstName"
          :last-name="post.user.lastName"
          :membership="post.user.membership"
        />
        <div class="ml-2 flex items-center gap-2 flex-1">
          <span class="font-bold text-gray-900">{{ fullName }}</span>
          <span class="font-medium text-gray-500">{{ post.user.id }}</span>
        </div>
      </router-link>
      <time class="text-gray-500" :datetime="post.date">{{ createdAt }}</time>
    </footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserLogo from "@/components/shared/UserLogo.vue";

export default defineComponent({
  name: "PostItem",
  components: {
    UserLogo,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    createdAt() {
      return this.post.date.toLocaleDateString();
    },
    capitalizeTitle() {
      return this.post.title.charAt(0).toUpperCase() + this.post.title.slice(1);
    },
    fullName() {
      console.log(this.post.user);
      return this.post.user.firstName + " " + this.post.user.lastName;
    },
  },
});
</script>

<style scoped lang="scss"></style>
