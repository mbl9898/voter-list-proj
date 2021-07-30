import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default function() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const $q = useQuasar();

  return {
    store,
    router,
    route,
    $q,
  };
}
