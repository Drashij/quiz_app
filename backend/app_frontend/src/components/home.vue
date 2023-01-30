<template>
	<div class="home">
		<h1>Welcome to Quiz application</h1>
		<button class="button-a" @click="take">Give quiz</button>
		<p>To create a quiz, please register or login</p>
		<button class="button-b" @click="reg">Register</button>
		<button class="button-b" @click="log">Login</button>
	</div>
</template>
<script>
export default {
	methods: {
		log: function () {
			this.$router.push("/login");
		},
		reg: function () {
			this.$router.push("/register");
		},
		take: function () {
			this.$router.push("/take");
		},
	},
};
</script>
<style scoped>
.home {
	margin-left: 30rem;
	text-align: center;
	align-items: center;
}
.button-a {
	background-color: rgb(216, 125, 186);
	padding: 16px 24px;
	border-radius: 6px;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-right: 7px;
	transition: 300ms;
}
.button-b {
	background-color: rgb(120, 120, 241);
	padding: 16px 24px;
	border-radius: 6px;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-right: 7px;
	transition: 300ms;
}
button:hover {
	background-color: #5fb0e3;
}
p {
	font-size: 20px;
}
</style>
