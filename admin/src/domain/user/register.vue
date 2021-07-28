<template>
  {{ lorem }}
  <div
    class="column justify-center items-center"
    :style="{ height: 100 + 'vh', backgroundColor: '#f3f3f3' }"
  >
    <q-card class="my-card">
      <q-card-section>
        <q-form @submit="onSubmit">
          <div class="row">
            <div class="col-xs-12 q-my-sm">
              <q-input label="Email" type="email" v-model="user.email" />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-input label="Username" v-model="user.username" />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-input
                label="Password"
                type="password"
                v-model="user.password"
              />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-input
                label="Confirm Password"
                type="password"
                v-model="user.confirmPassword"
              />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-btn
                color="primary"
                label="Submit"
                type="submit"
                class="full-width"
              />
            </div>
          </div>
        </q-form>
        <div class="column justify-center items-center">
          <h6 class="q-my-sm">Already have account:</h6>
          <q-btn label="Log In" color="primary" to="/login" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { UserService } from "./UserService";

export default defineComponent({
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const user = ref({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    async function onSubmit() {
      try {
        const res = await UserService.registerUser(user.value);
        console.log(res);
        if (!res.status) {
          if (res.error.details)
            $q.notify({
              message: res.error.details.password[0],
            });
          if (res.error.details.confirmPassword)
            $q.notify({
              message: res.error.details.confirmPassword[0],
            });
        }
        // $q.notify({
        //   message: res.error.message,
        // });
        await store.dispatch("setCurrentUser", res.data);
        console.log(store.getters.getCurrentUser, "CurrentUser");
      } catch (error) {
        console.log(error);
      }
    }

    return {
      user,
      onSubmit,
    };
  },
});
</script>

<style></style>
