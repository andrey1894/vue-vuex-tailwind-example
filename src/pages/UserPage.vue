<template>
  <PageGrid title="Profile">
    <template v-slot:content>
      <UserInfo :user="user" />
    </template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageGrid from "@/components/shared/PageGrid.vue";
import UserInfo from "@/components/user/UserInfo.vue";
import { IUserOutDto } from "@/models";
import { getUserById } from "@/api";

export default defineComponent({
  name: "UserPage",
  components: {
    PageGrid,
    UserInfo,
  },
  data() {
    return {
      user: null as IUserOutDto | null,
    };
  },
  async mounted() {
    this.user = await getUserById(+this.$route.params.id);
  },
});
</script>

<style scoped lang="scss"></style>
