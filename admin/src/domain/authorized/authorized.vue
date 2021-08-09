<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-4 q-pa-sm"
      v-for="(data, index) in authorizedList"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-body1">Name: {{ data.name }}</div>
          <hr />
          <p class="text-body1 q-mt-sm q-my-sm">User Details</p>
          <div class="text-body1">Email: {{ data.user.email }}</div>
          <div class="text-body1">Username: {{ data.user.username }}</div>
          <div class="text-body1">Role: {{ data.user.role }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="red" @click="deleteAction(data._id)" unelevated
            >Delete</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
    <ConfirmationDialog
      title="Delete Record"
      action="delete"
      v-model="confirmation"
      @onSubmit="deleteRecord"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import ConfirmationDialog from "../../components/general/ConfirmationDialog.vue";
import UnAuthorized from "../unAuthorized/unAuthorizedService";

export default defineComponent({
  components: {
    ConfirmationDialog,
  },
  setup() {
    const authorizedList = ref({});
    const toDelete = ref("");
    const confirmation = ref(false);

    const getUnAuthorizedData = async () => {
      try {
        return (authorizedList.value = await UnAuthorized.getAuthorized());
      } catch (error) {
        console.log(error);
      }
    };

    const deleteAction = (id: string) => {
      toDelete.value = id;
      confirmation.value = !confirmation.value;
    };

    const deleteRecord = async () => {
      try {
        const req = await UnAuthorized.deleteAuthorizedRecord(toDelete.value);
        console.log(req);
        confirmation.value = false;
        getUnAuthorizedData();
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      try {
        getUnAuthorizedData();
      } catch (error) {
        console.log(error);
      }
    });

    return {
      authorizedList,
      deleteRecord,
      confirmation,
      deleteAction,
    };
  },
});
</script>

<style></style>
