<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-4 q-pa-sm"
      v-for="user in users"
      :key="user._id"
    >
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-body1 q-py-sm">Email Address: {{ user.email }}</div>
          <div class="text-body1 q-py-sm">Username: {{ user.username }}</div>
          <div class="text-body1 q-py-sm">
            Approval Status: {{ user.isApproved ? "Approved" : "Not Approved" }}
          </div>
        </q-card-section>

        <q-separator />

        <div class="row">
          <div class="col-xs-12">
            <q-input
              v-if="user.isModified"
              class="q-mx-md"
              label="Rate"
              v-model="rate"
            />
            <p
              @click="user.isModified = !user.isModified"
              class="text-body1 q-px-md q-my-sm"
              v-else
            >
              {{ user.isModified ? user.rate : `Rs: ${user.rate} - Click here to change User Rate` }}
            </p>
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn color="red" @click="rejectUser(user._id)" unelevated
            >Reject</q-btn
          >
          <q-btn color="primary" @click="approvedUser(user._id)" unelevated
            >Approve</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { UserService } from "../UserService";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const users = ref([]);
    const $q = useQuasar();
    const rate = ref(0);

    const getUsers = async () => {
      try {
        const req = await UserService.allUsers();
        users.value = req.map((x: any) => ({ ...x, isModified: false }));
      } catch (error) {
        console.log(error);
      }
    };

    const approvedUser = async (userId: string) => {
      try {
        const user = await UserService.approval(userId, true, rate.value);
        getUsers();
        $q.notify({
          color: "primary",
          message: `This User has been successfully approved`,
        });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    const rejectUser = async (userId: string) => {
      try {
        const user = await UserService.approval(userId, false, rate.value);
        getUsers();
        console.log(getUsers());
        $q.notify({
          color: "danger",
          message: `This User is blocked`,
        });
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      try {
        getUsers();
      } catch (error) {
        console.log(error);
      }
    });

    return {
      users,
      approvedUser,
      rejectUser,
      rate,
    };
  },
});
</script>

<style></style>
