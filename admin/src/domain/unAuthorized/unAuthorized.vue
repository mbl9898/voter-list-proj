<template>
  <div v-if="isLoading">
    <h2>Is Loading {{ isLoading }}</h2>
  </div>
  <div v-else>
    <div class="row justify-between q-ma-md">
      <h5 class="q-my-xs">Data Entry</h5>
      <q-btn
        @click="unAuthorizedModal = !unAuthorizedModal"
        label="Add New Entry"
      />
    </div>
    <hr />
    <div class="row">
      <div
        class="col-xs-12 col-sm-4 q-pa-sm"
        v-for="(data, index) in unauthorizedData"
        :key="index"
      >
        <q-card v-if="data.user" class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-body1">Name: {{ data.name }}</div>
            <div class="text-body1">Username: {{ data.user.username }}</div>
            <div class="text-body1">Email: {{ data.user.email }}</div>
          </q-card-section>

          <q-separator />

          <div class="row justify-center q-my-sm">
            <q-btn
              class="full-width q-pa-sm"
              label="View All Fields"
              color="primary"
              unelevated
              @click="viewData(data._id)"
            />
          </div>
          <q-card-actions class="row justify-between">
              <q-btn
                class="q-mx-sm"
                color="red"
                @click="reject(data)"
                unelevated
                >Reject</q-btn
              >
              <q-btn
                class="q-mx-sm"
                color="primary"
                @click="approved(data)"
                unelevated
                >Approve</q-btn
              >
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <UnAuthorizedModal
      :readOnlyData="viewAllFields"
      :id="dataId"
      :isReading="disableFields"
      v-model="unAuthorizedModal"
    />
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { ref, defineComponent, onMounted } from "vue";
import UnAuthorizedModal from "./unAuthorizedModal.vue";
import UnAuthorizedModel from "./UnAuthorizedModel";
import UnAuthorizedService from "./unAuthorizedService";

export default defineComponent({
  components: {
    UnAuthorizedModal,
  },
  setup() {
    const unAuthorizedModal = ref(false);
    const isLoading = ref(false);
    const unauthorizedData = ref([]);
    const $q = useQuasar();
    const disableFields = ref(false);
    const dataId = ref({});

    const unAuthorizedList = async () => {
      try {
        return (unauthorizedData.value = await UnAuthorizedService.getUnAuthorized());
      } catch (error) {
        console.log(error);
      }
    };

    const viewData = async (id: string) => {
      try {
        dataId.value = id;
        disableFields.value = true;
        unAuthorizedModal.value = !unAuthorizedModal.value;
      } catch (error) {
        console.log(error);
      }
    };

    const approved = async (data: UnAuthorizedModel) => {
      try {
        const req = await UnAuthorizedService.addNewAuthorizedData(data);
        if (req.data) {
          $q.notify({
            message: `This Record has been successfully verified`,
          });
        }
        unAuthorizedList();
        return req;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      isLoading.value = true;
      unAuthorizedList();
      console.log(unauthorizedData.value, "unauthorizedData");
      isLoading.value = false;
    });

    return {
      unAuthorizedModal,
      unauthorizedData,
      approved,
      viewData,
      disableFields,
      dataId,
    };
  },
});
</script>

<style></style>
