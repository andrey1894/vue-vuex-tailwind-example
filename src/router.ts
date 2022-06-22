import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { getToken } from "@/core";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/pages/ProfilePage.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/pages/SettingsPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

const isLoginPage = (): boolean => {
  return router.currentRoute.value.name === "Login";
};

const redirectToLogin = (): void => {
  router.push("/login");
};

const redirectToHome = (): void => {
  router.push("/");
};

export { router, isLoginPage, redirectToLogin, redirectToHome };
