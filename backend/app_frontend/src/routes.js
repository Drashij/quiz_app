import login from "./components/login.vue";
import register from "./components/register.vue";
import index from "./components/index.vue";
import home from "./components/home.vue";
import allQuiz from "./components/allQuiz.vue";
import takeQuiz from "./components/takeQuiz.vue";
export default [
	{ path: "/", component: home },
	{ path: "/index", component: index },
	{ path: "/register", component: register },

	{ path: "/login", component: login },
	{ path: "/all", component: allQuiz },
	{ path: "/take", component: takeQuiz },
];
