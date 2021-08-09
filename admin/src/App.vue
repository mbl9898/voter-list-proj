<template>
  <Layout />
</template>

<script lang="ts">
import { onMounted } from "vue";
import Layout from "@/components/layout/layout.vue";
// import useGeneral from "./composables/useGeneral";

export default {
  name: "App",
  components: {
    Layout,
  },
  setup() {
    onMounted(() => {
      const token = localStorage.getItem("token")
      console.log(token, "token from app");
      
    });
  },
};
</script>
