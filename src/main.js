import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import AOS from "aos";
import "aos/dist/aos.css";
const vuetify = createVuetify({
  components,
  directives,
});
AOS.init();
createApp(App).use(vuetify).use(router).mount("#app");
