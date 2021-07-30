/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <q-drawer v-bind="$attrs" show-if-above bordered class="bg-grey-2">
    <q-list>
      <div class="row justify-center">
        <img src="@/assets/logo.png" class="logo" />
      </div>
      <div>
        <template v-for="(route, index) in routes" :key="index">
          <div
            class="column q-my-md"
            v-if="
              user.role === 'dataEntry' &&
                route.name !== 'Login' &&
                route.name !== 'Admin Portal' &&
                route.name !== 'Authorized' &&
                route.name !== 'Register User'
            "
          >
            <q-btn unelevated :label="route.name" :to="route.path" />
          </div>
          <div v-else-if="user.role === 'admin'" class="column q-my-md">
            <q-btn unelevated :label="route.name" :to="route.path" />
          </div>
        </template>
      </div>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = store.getters.getUser;
    // const currentUser = store.getters.getCurrentUser;
    const routes = computed(() => {
      return router.options.routes;
    });
    return {
      routes,
      user,
    };
  },
});
</script>

<style lang="scss">
.logo {
  max-width: 350px;
  width: 100%;
}
</style>
