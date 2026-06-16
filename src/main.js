import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";

import Home from "./views/Home.vue";
import Don from "./views/Don.vue";
import Activites from "./views/Activites.vue";
import Contact from "./views/Contact.vue";
import Admin from "./views/Admin.vue";
import Success from "./views/Success.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/don", component: Don },
    { path: "/activites", component: Activites },
    { path: "/contact", component: Contact },
    { path: "/admin", component: Admin },
    { path: "/success", component: Success },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

createApp(App).use(router).mount("#app");
