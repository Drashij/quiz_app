import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import VueSession from "vue-session";
import "./assets/main.css";
Vue.use(VueRouter);
Vue.use(VueSession);
const router = new VueRouter({
	routes: Routes,
});
new Vue({
	render: (h) => h(App),
	router: router,
}).$mount("#app");
