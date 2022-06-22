<template>
  <PageGrid title="Dashboard">
    <template v-slot:content>
      <PostList :posts="posts" />
    </template>
    <template v-slot:footer>
      <ListPagination
        :page="page"
        :count="count"
        :limit="limit"
        @changePage="changePage"
      />
    </template>
  </PageGrid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostList from "@/components/post/PostList.vue";
import ListPagination from "@/components/shared/ListPagination.vue";
import PageGrid from "@/components/shared/PageGrid.vue";

import { getPosts } from "@/api";
import { IPostOutDto } from "@/models";

export default defineComponent({
  name: "HomePage",
  components: {
    PageGrid,
    PostList,
    ListPagination,
  },
  data() {
    return {
      posts: [] as IPostOutDto[],
      page: 1,
      count: 0,
      limit: 10,
    };
  },
  async mounted() {
    await this.getPosts(this.page, this.limit);
  },
  methods: {
    async changePage(page: number): Promise<void> {
      await this.getPosts(page, this.limit);
    },
    async getPosts(page: number, limit: number): Promise<void> {
      try {
        const res = await getPosts(page, limit);
        this.posts = res.data;
        this.page = res.page;
        this.count = res.count;
        this.limit = res.limit;
        console.log("res", res);
      } catch (error) {
        console.log("e", error);
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
