<template>
  <div class="layout">
    <div v-if="user && user.isApproved">
      <q-layout view="hHh lpR fFf">
        <Header @clicked="leftDrawerOpen = !leftDrawerOpen" />
        <Sidebar v-model="leftDrawerOpen" />
        <main>
          <q-page-container>
            <router-view />
          </q-page-container>
        </main>
        <!-- <Footer /> -->
      </q-layout>
    </div>
    <div v-if="user && !user.isApproved">
      <h1>
        Approve karo apna Account "Dafa HO" Approve kai begair login karni ki
        ijazat nahi hai <strong>"Bagarait Log :) (:"</strong> Message from
        "MUHAMMAD BIN LIAQUAT BUTT"
      </h1>
    </div>
     <div v-if="!user">
         <Login/>
    </div> 
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Header from "./header.vue";
import Sidebar from "./sidebarNav.vue";
import Login from "@/domain/user/login.vue";
import useGeneral from "@/composables/useGeneral";
import { UserService } from "@/domain/user/UserService";

export default defineComponent({
  components: { Header, Sidebar,Login },
  setup() {
    const { store } = useGeneral();
    const validateToken = ref(false);
    const registerUser = ref(false);

    const loginUser = ref({
      email: "",
      password: "",
    });

    const user = computed(() => {
      return store.getters.getUser;
    });


    onMounted(async () => {
      const res = await UserService.validateToken();
      console.log(res);
      store.dispatch("setUser", res.data.userData);
      console.log(user.value);
    });

    return {
      leftDrawerOpen: ref(false),
      user,
      loginUser,
      validateToken,
      registerUser
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-card {
  max-width: 600px;
  margin: auto;
  height: 100vh;
}
</style>
