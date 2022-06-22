<template>
  <div>
    <PostItem :post="post" v-for="post in posts" :key="post.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostItem from "./PostItem.vue";

export default defineComponent({
  name: "PostList",
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss"></style>
