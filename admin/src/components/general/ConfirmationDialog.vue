<template>
  <Modal @submit="$emit('onSubmit')">
    <h6 class="q-my-sm">Are you sure you want to {{ action }} this record?</h6>
  </Modal>
</template>

<script lang="ts">
import Modal from "@/components/general/Modal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    action: {
      type: String,
      default: () => "delete"
    },
  },
  components: {
    Modal,
  },
});
</script>

<style></style>
