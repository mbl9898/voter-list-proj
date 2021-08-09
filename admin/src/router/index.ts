import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/domain/dashboard/dashboard.vue"),
    meta: {
      isAuthenticate: true,
    },
  },
  {
    path: "/dataEntry",
    name: "Data Entry",
    component: () => import("@/domain/unAuthorized/unAuthorized.vue"),
    meta: {
      isAuthenticate: true,
    },
  },
  {
    path: "/data",
    name: "Authorized",
    component: () => import("@/domain/authorized/authorized.vue"),
    meta: {
      isAuthenticate: true,
    },
  },
  {
    path: "/admin",
    name: "Admin Portal",
    component: () => import("@/domain/user/admin/admin.vue"),
    meta: {
      isAuthenticate: true,
    },
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
//   const token = localStorage.getItem("token")
//   if (to.matched.some((route) => route.meta.isAuthenticate)) {
    
//     const routes = router.options.routes;
//     const ros = routes.filter((x) => (!x.meta?.isAuthenticate));
//     console.log(ros, "ros");

//     next();
//   } else {
//     next();
//   }
// });

export default router;
