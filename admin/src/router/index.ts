import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/domain/dashboard/dashboard.vue"),
  },
  {
    path: "/dataEntry",
    name: "Data Entry",
    component: () => import("@/domain/unAuthorized/unAuthorized.vue"),
  },
  {
    path: "/data",
    name: "Authorized",
    component: () => import("@/domain/authorized/authorized.vue"),
  },
  {
    path: "/admin",
    name: "Admin Portal",
    component: () => import("@/domain/user/admin/admin.vue"),
  },
  {
    path: "/register",
    name: "Register User",
    component: () => import("@/domain/user/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/domain/user/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((route) => route.meta.requiresAuth)) {
//     next();
//   } else {
//     next();
//   }
// });

export default router;
