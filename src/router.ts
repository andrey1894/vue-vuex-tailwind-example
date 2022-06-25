import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { getToken } from "@/core";
import store from "@/store";

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
    path: "/user/:id",
    name: "User",
    component: () => import("@/pages/UserPage.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/pages/SettingsPage.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/pages/NotificationsPage.vue"),
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

router.afterEach((to) => {
  console.log(to.name);
  store.dispatch("ui/addNotification", {
    message: `Page: ${String(to.name)}`,
  });
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
