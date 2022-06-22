<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div
            class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto"
          >
            <PostList :posts="posts" />
          </div>

          <ListPagination :page="page" :count="count" :limit="limit" />
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostList from "@/components/post/PostList.vue";
import ListPagination from "@/components/shared/ListPagination.vue";
import { getPosts } from "@/api";
import { IPostOutDto } from "@/models";

export default defineComponent({
  name: "HomePage",
  components: {
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
    try {
      const res = await getPosts(this.page, this.limit);
      this.posts = res.data;
      this.page = res.page;
      this.count = res.count;
      this.limit = res.limit;
      console.log("res", res);
    } catch (error) {
      console.log("e", error);
    }
  },
});
</script>

<style scoped lang="scss"></style>
