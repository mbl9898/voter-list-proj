<template>
  <div>
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else-if="!loading">
      <div v-if="user && user.isApproved">
        <q-layout view="hHh Lpr lFf">
          <Header @clicked="leftDrawerOpen = !leftDrawerOpen" />

          <Sidebar v-model="leftDrawerOpen" />
          <q-page-container>
            <router-view></router-view>
          </q-page-container>
        </q-layout>
      </div>
      <div v-else-if="!user">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- <div v-if="!isLoading">
    <q-layout view="hHh Lpr lFf">
      <Header @clicked="leftDrawerOpen = !leftDrawerOpen" />

      <Sidebar v-model="leftDrawerOpen" />
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
  <div v-else>
    <router-view></router-view>
  </div> -->
</template>

<script>
// import { onMounted, ref } from "vue";
// import Sidebar from "@/components/layout/sidebar";
// import Header from "@/components/layout/header";
// import { UserService } from "./domain/user/UserService";
// import { useStore } from "vuex";
// import { useQuasar } from "quasar";
// import { useRouter } from "vue-router";

// export default {
//   name: "LayoutDefault",
//   components: {
//     Sidebar,
//     Header,
//   },

//   setup() {
//     const isTokenValidated = ref(false);
//     const isLoading = ref(true);
//     const store = useStore();
//     const router = useRouter();
//     const $q = useQuasar();

//     onMounted(async () => {
//       try {
//         isLoading.value = true;
//         const data = await UserService.validateToken();
//         if (data.data) {
//           isTokenValidated.value = true;
//           store.dispatch("setUser", data.data.user);

//           if (store.getters.getUser.isApproved) {
//             isLoading.value = false;
//             $q.notify({
//               message: "User has been logged In successfully",
//             });
//           }
//         } else {
//           localStorage.removeItem("token");
//           router.push("/login");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     return {
//       leftDrawerOpen: ref(false),
//       isTokenValidated,
//       isLoading,
//     };
//   },
// };
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { UserService } from "./domain/user/UserService";
import { useStore } from "vuex";
import router from "./router";

export default {
  name: "LayoutDefault",
  components: {
    Sidebar,
    Header,
  },
  setup() {
    const loading = ref(true);
    const store = useStore();
    const user = ref(null);
    // const state = reactive({ count: 0 });
    watch(
      () => store.getters.getUser,
      (newUser) => {
        user.value = newUser;
      }
    );
    onMounted(async () => {
      console.log("app component");
      loading.value = true;
      const res = await UserService.validateToken();

      if (res.data) {
        store.dispatch("setUser", res.data.user);
        user.value = store.getters.getUser;
        console.log(user.value.isApproved, "user");
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
      loading.value = false;
    });
    return {
      leftDrawerOpen: ref(false),
      user,
      loading,
    };
  },
};
</script>
