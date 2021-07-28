<template>
  <q-dialog v-bind="$attrs">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot></slot>
      </q-card-section>

      <q-card-actions v-if="!noActionBtn">
        <q-btn flat label="Close" v-close-popup />
        <q-btn flat label="Submit" @click="$emit('submit')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    noActionBtn: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ["submit"],
});
</script>

<style></style>
