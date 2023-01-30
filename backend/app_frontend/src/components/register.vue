<template>
	<div class="regi">
		<p v-if="ischeck">Please fill all the fields</p>
		<h1>Register</h1>

		<div>
			<input
				type="text"
				v-model="name"
				id="name"
				name="name"
				placeholder="Name"
				required
			/>
		</div>
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
			<button @click="createUser">Register</button>
		</div>

		<button @click="log">Already registered? Login here</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			ischeck: false,
			name: "",
			email: "",
			password: "",
			arr: [
				{
					name: "",
					email: "",
					password: "",
				},
			],
		};
	},
	methods: {
		log: function () {
			this.$router.push("/login");
		},
		createUser: function () {
			if (this.name == "" || this.email == "" || this.password == "") {
				this.ischeck = true;
			} else {
				console.log("sending " + this.arr.email);
				axios
					.post("http://localhost:4020/users/register", {
						name: this.name,
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						console.log(response.data);
						this.$router.push("login");
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
};
</script>
<style scoped>
.regi {
	text-align: center;
	margin-left: 35rem;
}
input {
	border-radius: 5px;
	height: 40px;
	line-height: normal;
	color: #282828;

	box-sizing: border-box;

	font-size: 16px;
	padding: 0 6px;
	margin-right: 20px;
	margin-top: 7px;
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
</style>
