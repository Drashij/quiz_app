<template>
	<div class="take">
		<div v-if="start">
			<!-- here ask details of quiz giver -->
			<p v-if="detail">Please fill your details</p>
			<input
				class="input"
				type="text"
				placeholder="Name"
				v-model="uName"
			/><br />
			<input
				class="input"
				type="text"
				placeholder="Unique id"
				v-model="uId"
			/><br />
			<button @click="submit">Submit</button>
		</div>
		<div v-if="isshow">
			<button @click="ho" style="background-color: beige">Home</button>
			<h1>Select a quiz you want to give</h1>
		</div>

		<div v-if="isshow" v-for="q in quiz">
			<!-- show quiz name -->

			<button @click="getq(q.q_id)">{{ q.quiz_name }}</button>
		</div>
		<div class="border" v-if="isquiz" v-for="a in arr">
			<!-- onclick quiz name show quiz without answer keep count of correct answer -->
			<br />
			<table>
				<tr>
					<td>
						<h2>{{ a.question }}</h2>
						<br />

						<p>
							<input type="checkbox" @click="giveans(a.option1)" />
							{{ a.option1 }}
						</p>
						<br />
						<p>
							<input type="checkbox" @click="giveans(a.option2)" />
							{{ a.option2 }}
						</p>
						<br />
						<p>
							<input type="checkbox" @click="giveans(a.option3)" />
							{{ a.option3 }}
						</p>
						<br />
						<p>
							<input type="checkbox" @click="giveans(a.option4)" />
							{{ a.option4 }}
						</p>
						<p v-if="result">
							Correct answer:
							{{ a.answer }}
						</p>
						<br />
						<button @click="checkans(a.answer)">Ok</button>
					</td>
					<br />
				</tr>
			</table>
		</div>
		<button v-if="isquiz" @click="result = true">Submit quiz</button>
		<button v-if="isquiz" @click="goBack">Go back</button>

		<div v-if="result">
			<!-- show result  -->
			<h1>Your Score is {{ count }}/{{ arr.length }}</h1>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			isshow: false,
			isquiz: false,
			start: true,
			result: false,
			detail: false,

			count: 0,
			canswer: "",
			uName: "",
			uId: "",
			quiz: [],
			arr: [],
		};
	},
	methods: {
		submit: function () {
			if (this.uName == "" || this.uId == "") {
				this.detail = true;
			} else {
				this.isshow = true;
				this.start = false;
			}
		},
		ho: function () {
			(this.uName = ""), (this.uId = ""), this.$router.push("/");
		},
		getq: function (val) {
			axios
				.get(`http://localhost:4020/getquiz/${val}`)

				.then((response) => {
					console.log(response.data);
					this.arr.length = 0;
					this.arr = this.arr.concat(response.data);

					console.log(this.arr);
					this.isquiz = true;
					this.isshow = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		giveans: function (a) {
			this.canswer = a;
		},
		checkans: function (b) {
			if (this.canswer == b) {
				this.count += 1;
			}
		},
		goBack: function () {
			this.isshow = true;
			this.isquiz = false;
			this.result = false;
			this.count = 0;
		},
	},
	created() {
		//get all quizes name with quiz id
		axios
			.get(`http://localhost:4020/details`)

			.then((response) => {
				console.log(response.data);
				this.quiz.length = 0;
				this.quiz = this.quiz.concat(response.data);

				console.log(this.quiz);
			})
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>
<style scoped>
.take {
	text-align: center;
	margin-top: 50px;
	margin-left: 35rem;
	font-size: 16px;
}
.input {
	border-radius: 5px;
	height: 40px;
	line-height: normal;
	color: #282828;

	box-sizing: border-box;

	font-size: 16px;
	padding: 0 6px;
	margin-right: 20px;
	margin-top: 7px;
	margin-bottom: 7px;
}

input[type="checkbox"] {
	background-color: #fff;

	margin-right: 7px;
	font: inherit;
	color: currentColor;
	width: 0.45em;
	height: 0.45em;
	border: 0.15em solid currentColor;
	border-radius: 0.15em;
	transform: translateY(-0.075em);
	width: 30px;
	height: 30px;
}
p {
	display: flex;
	margin-bottom: 3px;
	align-items: center;
}

button {
	background-color: rgb(241, 108, 151);
	padding: 16px 24px;
	border-radius: 6px;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-right: 5px;
	transition: 300ms;
}
button:hover {
	background-color: #5fb0e3;
}
div.border {
	border-style: groove;
}
</style>
