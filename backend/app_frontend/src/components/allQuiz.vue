<template>
	<div>
		<div>
			<button v-if="isshow" @click="isshow = false">Go Back</button>
			<button @click="gotoIndex">Home</button>
		</div>
		<div class="all">
			<div v-if="!isshow">
				<table>
					<tr>
						<th><h1>Quiz Name</h1></th>
					</tr>
					<tr v-for="(q, index) in quiz" :key="index">
						<td>
							<button @click="getQuiz(q.q_id, q.quiz_name)">
								{{ q.quiz_name }}
							</button>
							<button @click="dltQuiz(q.q_id, index)" style="margin-left: 13px">
								❌
							</button>
						</td>
					</tr>
				</table>
			</div>
			<div v-if="isshow">
				<table>
					<h1>{{ qname }}</h1>
					<ul v-for="(g, index) in gotQuizArr" :key="index">
						<tr>
							<td>
								<li style="list-style-type: none">
									<h2>
										{{ g.question }}
									</h2>
								</li>

								<li>{{ g.option1 }}</li>
								<li>{{ g.option2 }}</li>
								<li>{{ g.option3 }}</li>
								<li>{{ g.option4 }}</li>
								<h4>Ans : {{ g.answer }}</h4>
							</td>
						</tr>
					</ul>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			isshow: false,
			qname: "",
			quiz: [],
			gotQuizArr: [],
		};
	},
	methods: {
		getQuiz: function (a_id, n) {
			axios
				.get(`http://localhost:4020/getquiz/${a_id}`)

				.then((response) => {
					console.log(response.data);
					this.gotQuizArr.length = 0;
					this.gotQuizArr = this.gotQuizArr.concat(response.data);

					console.log(this.gotQuizArr);
					this.isshow = !this.isshow;
					this.qname = n;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		gotoIndex: function () {
			this.$router.push("/index");
		},
		dltQuiz: function (vt, i) {
			axios
				.delete(`http://localhost:4020/deletequiz/${vt}`)
				.then((response) => {
					console.log(response);
					this.quiz.splice(i, 1);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		if (!this.$session.exists()) {
			window.location.replace("http://localhost:5173/#/");
		} else {
			const id = localStorage.getItem("id");
			console.log(id);
			axios
				.get(`http://localhost:4020/details/${id}`)

				.then((response) => {
					console.log(response.data);

					this.quiz = this.quiz.concat(response.data);

					console.log(this.quiz);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
};
</script>
<style scoped>
.all {
	margin-left: 35rem;
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
</style>
