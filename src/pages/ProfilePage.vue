<template>
  <PageGrid title="Profile">
    <template v-slot:content>
      <UserInfo :user="$store.state.user.user" />
    </template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageGrid from "@/components/shared/PageGrid.vue";
import UserInfo from "@/components/user/UserInfo.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    PageGrid,
    UserInfo,
  },
});
</script>

<style scoped lang="scss"></style>
