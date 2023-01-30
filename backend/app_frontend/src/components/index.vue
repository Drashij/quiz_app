<template>
	<div id="app">
		<Slide
			><button class="button-64" @click="out">logout</button>
			<button class="button-64" @click="allq">My Quizzes</button>
			<button class="button-64" @click="goback">Go Back</button>
		</Slide>
		<div class="greetings">
			<div v-if="!ispreview">
				<h1 v-if="!showName && !isquiz">Hello {{ userName }},</h1>
				<h1 v-if="!showName && !isquiz">Welcome to Quiz App</h1>
				<button
					class="button-64"
					v-if="!showName && !isquiz"
					@click="creatingQuiz"
				>
					Create a Quiz</button
				><br />
				<button class="button-64" v-if="isadd" @click="isquiz = true">
					Add a question</button
				><br />
				<button class="button-64" v-if="isok" @click="ispreview = true">
					Preview Quiz
				</button>
			</div>
			<div v-if="showName">
				<input type="text" placeholder="Quiz Name" v-model="name" />
				<button
					class="button-64"
					@click="(showName = false), (isquiz = true), createQ()"
				>
					Done
				</button>
			</div>
			<div v-if="isquiz">
				<input type="text" placeholder="Question" v-model="ques" /><br />
				<input type="text" placeholder="Option 1" v-model="optionA" />
				<br />
				<input type="text" placeholder="Option 2" v-model="optionB" />
				<br />
				<input type="text" placeholder="Option 3" v-model="optionC" />
				<br />
				<input type="text" placeholder="Option 4" v-model="optionD" />
				<br />
				<input type="text" placeholder="Answer" v-model="answer" /><br />
				<button
					class="button-64"
					@click="(isquiz = false), (isok = true), (isadd = true), okFun()"
				>
					ok
				</button>
			</div>
			<div class="preview" v-if="ispreview">
				<table>
					<ul v-for="(s, index) in sendQuizArr" :key="index">
						<tr>
							<td>
								<li style="list-style-type: none">
									<h2>
										{{ s.question }}
									</h2>
								</li>

								<li>{{ s.a }}</li>
								<li>{{ s.b }}</li>
								<li>{{ s.c }}</li>
								<li>{{ s.d }}</li>
								<h4>Ans : {{ s.ans }}</h4>
							</td>
							<td>
								<button @click="dltQuestion(index)" style="margin-left: 13px">
									❌
								</button>
							</td>
						</tr>
					</ul>
					<button @click="sub">Submit Quiz</button>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { Slide } from "vue-burger-menu";
export default {
	data() {
		return {
			userName: localStorage.getItem("name"),
			userId: localStorage.getItem("id"),
			isadd: false,
			isquiz: false,
			isok: false,
			ispreview: false,
			showName: false,
			name: "",
			ques: "",
			optionA: "",
			optionB: "",
			optionC: "",
			optionD: "",
			answer: "",

			sendQuizArr: [],
			quizarr: [],
		};
	},
	components: {
		Slide,
	},
	// props for burger-menu
	props: {
		isOpen: {
			type: Boolean,
			required: false,
		},
		right: {
			type: Boolean,
			required: false,
		},
		width: {
			type: [String],
			required: false,
			default: "300",
		},
		disableEsc: {
			type: Boolean,
			required: false,
		},
		noOverlay: {
			type: Boolean,
			required: false,
		},
		onStateChange: {
			type: Function,
			required: false,
		},
		burgerIcon: {
			type: Boolean,
			required: false,
			default: true,
		},
		crossIcon: {
			type: Boolean,
			required: false,
			default: true,
		},
		disableOutsideClick: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeOnNavigation: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		out: function () {
			localStorage.clear(), this.$session.destroy();
			this.$router.push("/");
		},
		allq: function () {
			this.$router.push("/all");
		},
		creatingQuiz: function () {
			this.showName = true;
		},
		goback: function () {
			this.showName = false;
			this.ispreview = false;
			this.isquiz = false;
		},
		okFun: function () {
			this.sendQuizArr.push({
				question: this.ques,
				a: this.optionA,
				b: this.optionB,
				c: this.optionC,
				d: this.optionD,
				ans: this.answer,
			});
			this.ques = "";
			(this.optionA = ""),
				(this.optionB = ""),
				(this.optionC = ""),
				(this.optionD = "");
		},
		dltQuestion: function (index) {
			this.sendQuizArr.splice(index, 1);
		},
		createQ: function () {
			const para = {
				id: this.userId,
				name: this.name,
			};
			axios
				.post("http://localhost:4020/users/createq", para)
				.then((response) => {
					console.log(response.data);
					console.log(response.data.data.q_id);
					this.quizarr.push({
						qid: response.data.data.q_id,
						qname: response.data.data.quiz_name,
					});
					console.log(this.quizarr);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		sub: function () {
			axios
				.post(
					`http://localhost:4020/users/quiz/${this.quizarr[0].qid}`,
					this.sendQuizArr
				)
				.then((response) => {
					console.log(response.data);
					this.$router.push("/index");
					this.sendQuizArr.length = 0;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		if (!this.$session.exists()) {
			window.location.replace("http://localhost:5173/#/");
		}
	},
};
</script>
<style scoped>
input {
	margin-top: 7px;
	margin-bottom: 7px;
}
button {
	margin-top: 7px;
	margin-bottom: 7px;
}

/* CSS */
.button-64 {
	align-items: center;
	background-color: rgb(241, 221, 120);
	border: 0;
	border-radius: 8px;

	font-family: Phantomsans, sans-serif;

	padding: 3px;
	text-decoration: none;

	touch-action: manipulation;
	white-space: nowrap;
	cursor: pointer;
}

.button-64:active,
.button-64:hover {
	outline: 0;
}

.button-64 span {
	background-color: rgb(5, 6, 45);
	padding: 16px 24px;
	border-radius: 6px;
	width: 100%;
	height: 100%;
	transition: 300ms;
}

.button-64:hover span {
	background: none;
}

@media (min-width: 768px) {
	.button-64 {
		font-size: 24px;
		min-width: 196px;
	}
}

.greetings {
	/* text-align: center;
	margin: auto; */
	top: 30%;
	left: 50%;
	width: 30em;
	height: 18em;
	transform: translate(-50%, -50%);

	position: fixed;
}
.preview {
	font-size: 20px;
	font-family: monospace;
	align-items: center;

	max-width: 100%;

	padding: 3px;
	text-decoration: none;

	touch-action: manipulation;
	white-space: nowrap;
	cursor: pointer;
}
.preview button {
	background-color: rgb(19, 226, 8);
	padding: 10px 18px;
	border-radius: 6px;

	transition: 300ms;
}
/* input tag styles */
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
	/* padding-left: 12px; */
	/* :focus {
		border: 3px solid #5551ff;
	} */
}
input[type="checkbox"] {
	/* appearance: none; */
	background-color: #fff;

	margin: 0;
	font: inherit;
	color: currentColor;
	width: 1.15em;
	height: 1.15em;
	border: 0.15em solid currentColor;
	border-radius: 0.15em;
	transform: translateY(-0.075em);
	width: 30px;
	height: 30px;
}
button:hover {
	background-color: #5fb0e3;
}
</style>
