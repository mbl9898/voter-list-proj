import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify, Dialog } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify,
    Dialog,
  },
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
    dialog: {},
  },
};