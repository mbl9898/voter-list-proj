<template>
  <p>Dashboard</p>
  <div v-if="isLoading">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="userData && user">
    <div class="row justify-center">
      <h5>Accuracy Rate: 100%</h5>
    </div>
    <hr />
    <div class="row justify-evenly q-my-md">
      <div>
        <q-btn
          :label="`Pending For Approval - ${userData.pending}`"
          color="primary"
        />
      </div>
      <div>
        <q-btn :label="`Approved - ${userData.approved}`" color="primary" />
      </div>
      <div>
        <q-btn color="red" label="Rejected" />
      </div>
    </div>
    <hr />
    <div class="row justify-evenly q-my-md">
      <div>
        <q-btn
          :label="
            `Estimated Withdrawl Amount - Rs: ${user.rate * userData.approved}`
          "
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import router from "@/router";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { UserService } from "../user/UserService";
import dashboardService from "./dashboardService";
export default defineComponent({
  setup() {
    const userData = ref({});
    const isLoading = ref(false);
    const store = useStore();
    const user = ref(null);
    // const user = store.getters.getUser;
    // const state = reactive({ count: 0 });
    watch(
      () => store.getters.getUser,
      (newUser) => {
        user.value = newUser;
      }
    );
    onMounted(async () => {
      console.log("Dashboard Component");

      try {
        isLoading.value = true;
        // const token=localStorage.getItem("token")
        // if(token){

        //   }
        userData.value = await dashboardService.getUserData();
        const res = await UserService.validateToken();

        if (res.data) {
          store.dispatch("setUser", res.data.user);
          user.value = store.getters.getUser;
          console.log(user, "user");
          console.log(userData, "userData");
        }
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      userData,
      isLoading,
      user,
    };
  },
});
</script>

<style></style>
