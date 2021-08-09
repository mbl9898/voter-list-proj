<template>
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
              <q-input
                label="Password"
                type="password"
                v-model="user.password"
              />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-btn
                color="primary"
                type="submit"
                label="Submit"
                class="full-width"
              />
            </div>
          </div>
        </q-form>
        <div class="row justify-center items-center">
          <h6 class="q-my-sm">Need an account:</h6>
          <q-btn label=" Sign Up" color="primary" to="/register" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import useGeneral from "@/composables/useGeneral";
import { ref, defineComponent } from "vue";
import { UserService } from "./UserService";

export default defineComponent({
  setup() {
    const { store, $q } = useGeneral()
    const user = ref({
      email: "",
      password: "",
    });

    const onSubmit = async () => {
      try {
        const res = await UserService.loginUser(user.value);
        if (!res.success) {
          $q.notify({
            message: res.error.message,
          });
        }
          $q.notify({
            message: `This user has been successfully "loggedIn :) (:"`,
          });
        store.dispatch("setUser", res.data.userData);
        localStorage.setItem("token", res.data.access_token);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      user,
      onSubmit,
    };
  },
});
</script>

<style></style>
