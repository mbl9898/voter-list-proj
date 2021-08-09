<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="$emit('clicked')"
        aria-label="Menu"
        icon="menu"
      />

      <q-toolbar-title>
        Al Abrar Admin Form
      </q-toolbar-title>

      <div v-if="token" class="column q-my-md">
        <q-btn-dropdown
          class="glossy"
          color="purple"
          :label="store.getters.getUser.username"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-btn
                color="warning"
                class="q-mb-md"
                @click="changePassword"
                label="Change Password"
              />
              <q-btn color="primary" class="q-mt-md" label="Contact Us" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ store.getters.getUser.username }}
              </div>

              <q-btn
                color="primary"
                label="Logout"
                @click="logout"
                to="/login"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const token = ref(true);
    const store = useStore();

    const logout = () => {
      try {
        localStorage.removeItem("token");
        store.dispatch("setUser", null);
      } catch (error) {
        console.log(error);
      } finally {
        token.value = false;
      }
    };

    return {
      logout,
      token,
      store,
    };
  },
});
</script>

<style></style>
