<template>
	<div class="logi">
		<p v-if="ierr">Wrong id or password</p>
		<p v-if="ischeck">Email and Password required</p>
		<h1>Please Login to continue</h1>

		<div>
			<input
				type="email"
				v-model="email"
				id="email"
				name="email"
				placeholder="Email"
				required
			/>
		</div>
		<div>
			<input
				type="password"
				v-model="password"
				id="password"
				name="password"
				placeholder="Password"
				required
			/>
		</div>
		<div>
			<button @click="login">Login</button>
		</div>

		<button @click="log">Register</button>
		<button @click="home" style="margin-left: 20px">Home</button>
	</div>
</template>
<script>
import axios from "axios";
// import { EventBus } from "../main";
export default {
	data() {
		return {
			ierr: false,
			ischeck: false,
			email: "",
			password: "",
			arr: [],
			dataa: "",
		};
	},
	methods: {
		log: function () {
			this.$router.push("register");
		},
		home: function () {
			this.$router.push("/");
		},
		login: function () {
			if (this.email == "" || this.password == "") {
				this.ischeck = true;
			} else {
				console.log("this is sending email" + this.email);
				console.log("this is sending password" + this.password);
				axios
					.post("http://localhost:4020/users/login", {
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						console.log(response.data.data[0].id);
						this.$session.start();
						this.$session.set("jwt", response.data.token);
						localStorage.setItem("id", response.data.data[0].id);
						localStorage.setItem("name", response.data.data[0].name);
						// console.log("emmiting bus");
						this.$router.push("/index");
					})
					.catch((error) => {
						this.ierr = true;
						console.log("wrong id or password");
						console.log(error);
					});
			}
		},
	},
};
</script>
<style scoped>
.logi {
	text-align: center;
	margin-left: 35rem;
}
input {
	border-radius: 5px;
	height: 40px;
	line-height: normal;
	color: #282828;
	/* display: block; */
	/* width: 50%; */
	box-sizing: border-box;
	/* user-select: auto; */
	font-size: 16px;
	padding: 0 6px;
	margin-right: 20px;
	margin-top: 7px;
	/* padding-left: 12px; */
	/* :focus {
		border: 3px solid #5551ff;
	} */
}
button {
	background-color: rgb(241, 108, 151);
	padding: 16px 24px;
	border-radius: 6px;
	margin-top: 10px;
	margin-bottom: 7px;
	transition: 300ms;
}
button:hover {
	background-color: #5fb0e3;
}
p {
	color: black;
	font-size: 14px;
}
</style>
