import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import { setupPinia } from "@/store";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  setupPinia(app);
  return {
    app,
  };
}
