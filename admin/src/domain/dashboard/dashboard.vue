<template>
  <div v-if="isLoading">
  <p>Dashboard</p>
    <h1>Loading...</h1>
  </div>
  <div v-else>
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
            `Estimated Withdrawl Amount - Rs: ${userData.rate * userData.approved ? userData.approved : 0 }`
          "
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import dashboardService from "./dashboardService";
export default defineComponent({
  setup() {
    const userData = ref({});
    const isLoading = ref(false);

    onMounted(async () => {
      console.log("Dashboard Component");

      try {
        isLoading.value = true;
        userData.value = await dashboardService.getUserData();
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }
    });

    return {
      userData,
      isLoading,
    };
  },
});
</script>

<style></style>
