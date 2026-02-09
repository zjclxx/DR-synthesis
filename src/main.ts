import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "~/router";
import "~/router/router-guard";
import "ant-design-vue/dist/reset.css";
import "~/assets/styles/reset.css";
import "uno.css";
// import Vue3DraggableResizable from "vue3-draggable-resizable";
// //需引入默认样式
// import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/style.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
// app.use(Vue3DraggableResizable);
app.component("vue-draggable-resizable", VueDraggableResizable);
app.mount("#app");
