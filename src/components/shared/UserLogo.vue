<template>
  <div
    class="relative rounded-full flex items-center text-sm border-2"
    :class="logoClass"
  >
    <div
      class="flex flex-1 w-full h-full overflow-hidden rounded-full border-2 border-transparent"
    >
      <div class="relative w-full h-full flex">
        <div
          class="absolute top-0 bottom-0 left-0 right-0 flex bg-gray-200 text-gray-700 font-bold text-center"
        >
          <p class="m-auto">
            {{ logoText }}
          </p>
        </div>
        <picture class="absolute top-0 bottom-0 left-0 right-0">
          <img :src="logoSrc" alt="" />
        </picture>
      </div>
    </div>
    <div class="absolute bottom-0 right-0 rounded-full border-2 border-white">
      <div
        class="rounded-full"
        :class="{
          'bg-cyan-400': online,
          'bg-pink-600': !online,
          'h-4': size >= largeSize,
          'w-4': size >= largeSize,
          'h-2': size < largeSize,
          'w-2': size < largeSize,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EUserMembership } from "@/models";

export default defineComponent({
  name: "UserLogo",
  props: {
    size: {
      type: Number,
      default: 10,
    },
    showOnlineStatus: {
      type: Boolean,
      default: true,
    },
    online: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    membership: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      largeSize: 11,
      logoSrc: "",
    };
  },
  async mounted() {
    this.logoSrc = await this.getLogo(this.logo);
  },
  computed: {
    logoClass() {
      return [`h-${this.size}`, `w-${this.size}`, this.membershipBg];
    },
    membershipBg() {
      switch (this.membership) {
        case EUserMembership.GOLD:
          return "border-yellow-400";
        case EUserMembership.SILVER:
          return "border-gray-600";
        case EUserMembership.PLATIN:
          return "border-purple-600";
        default:
          return "";
      }
    },
    logoText() {
      return `${this.firstName ? this.firstName[0] : ""}
      ${this.lastName ? this.lastName[0] : ""}`;
    },
  },
  watch: {
    async size() {
      this.logoSrc = await this.getLogo(this.logo);
    },
    async logo() {
      this.logoSrc = await this.getLogo(this.logo);
    },
  },
  methods: {
    async getLogo(name: string): Promise<string> {
      const imgSize = this.size >= this.largeSize ? "medium" : "small";
      try {
        const src = await import(`@/assets/users/${imgSize}/${name}`);
        return src.default;
      } catch {
        return "";
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
