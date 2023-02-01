const express = require("express");
const bodyParser = require("body-parser");
const client = require("./service.js");

const cors = require("cors");

const app = express();

const port = "4020";
app.use(bodyParser.json());

app.options("*", cors());
//........................................................................error in header (maybe)............................................//
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/users/login", client.getlogin);
app.post("/users/register", client.createUser);
app.post("/users/createq", client.createq);
app.post("/users/quiz/:id", client.addQuiz);
app.get("/details/:id", client.getDetailsById); //this is called when asking to show quizzes just after creation

app.get("/getquiz/:id", client.getQuizById);
app.get("/details", client.all);

app.delete("/deletequiz/:id", client.deletedata);
app.listen(port, () => {
	console.log(`server listening at port : ${port}`);
});
