<template>
  <Modal :noActionBtn="isReading" @submit="submitAction" title="Add New Record">
    <q-form>
      <div class="row">
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            type="number"
            label="Block Code"
            :disable="isReading"
            v-model.number="data.blockCode"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Constituency Name"
            v-model="data.constituencyName"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Moza" v-model="data.moza" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Dehya" v-model="data.dehya" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="City" v-model="data.city" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Patwar Halka"
            v-model="data.patwarHalka"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Tapaydar"
            v-model="data.tapaydar"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Tehseel"
            v-model="data.tehseel"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Talka" v-model="data.talka" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="District"
            v-model="data.district"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="UnionCouncil"
            v-model="data.unionCouncil"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="BookNo" v-model="data.bookNo" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Constituency"
            v-model="data.constituency"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Gender" v-model="data.gender" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            type="number"
            label="Vote S No"
            :disable="isReading"
            v-model.number="data.voteSNo"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            type="number"
            label="Family No"
            :disable="isReading"
            v-model.number="data.familyNo"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Name" v-model="data.name" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Marital Status"
            v-model="data.maritalStatus"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            label="Father | Husband Name"
            :disable="isReading"
            v-model="data.fatherHusbandName"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            type="number"
            label="Nic"
            v-model.number="data.nic"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            type="number"
            label="Age"
            v-model.number="data.age"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="House No"
            v-model="data.houseNo"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Street" v-model="data.street" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Phase" v-model="data.phase" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Sector" v-model="data.sector" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input :disable="isReading" label="Lane" v-model="data.lane" />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Boulevard Avenue"
            v-model="data.boulevardAvenue"
          />
        </div>
        <div class="col col-xs-12 col-sm-4 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Other Area"
            v-model="data.otherArea"
          />
        </div>
        <div class="col col-xs-12 col-sm-8 q-pa-sm">
          <q-input
            :disable="isReading"
            label="Address"
            v-model="data.address"
          />
        </div>
      </div>
    </q-form>
    <ConfirmationDialog
      title="Add New Record"
      action="submit"
      v-model="confirmation"
      @onSubmit="onSubmit"
    />
  </Modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import Modal from "@/components/general/Modal.vue";
import ConfirmationDialog from "@/components/general/ConfirmationDialog.vue";
import UnAuthorizedService from "./unAuthorizedService";
// import UnauthorizedModel from "./UnAuthorizedModel";
export default defineComponent({
  components: {
    Modal,
    ConfirmationDialog,
  },
  props: {
    isReading: {
      type: Boolean,
    },
    id: {
      type: String,
    },
  },
  setup(props) {
    const data = ref({
      blockCode: 0,
      constituencyName: "",
      moza: "",
      dehya: "",
      city: "",
      patwarHalka: "",
      tapaydar: "",
      tehseel: "",
      talka: "",
      district: "",
      unionCouncil: "",
      bookNo: "",
      constituency: "",
      gender: "",
      voteSNo: 0,
      familyNo: 0,
      name: "",
      maritalStatus: "",
      fatherHusbandName: "",
      nic: 0,
      age: 0,
      houseNo: "",
      street: "",
      phase: "",
      sector: "",
      lane: "",
      boulevardAvenue: "",
      otherArea: "",
      address: "",
    });
    const confirmation = ref(false);

    const submitAction = () => {
      confirmation.value = true;
    };

    const onSubmit = async () => {
      try {
        const req = await UnAuthorizedService.addNewUnauthorizedData(
          data.value
        );
        confirmation.value = false;
        return req.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      try {
        data.value = await UnAuthorizedService.getUnAuthorizedDataById(
          props.id!
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    watch(
      () => props.id!.length > 1,
      () => getData()
    );

    return {
      data,
      onSubmit,
      confirmation,
      submitAction,
    };
  },
});
</script>

<style></style>
