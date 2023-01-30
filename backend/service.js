const Pool = require("pg").Pool;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "Drashi@77",
	database: "quiz",
});
const createUser = (req, res) => {
	const paramt = req.body;
	console.log("got this in as req" + req.body);
	const name = paramt.name;
	const email = paramt.email;
	const password = paramt.password;
	pool.query(
		`SELECT * FROM users
		        WHERE email = $1`,
		[email],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			console.log(results.rows);

			if (results.rows.length > 0) {
				return res.render("register", {
					message: "Email already registered",
				});
			} else {
				pool.query(
					`INSERT INTO users (name, email, password)
		                VALUES ($1, $2, $3)
		                RETURNING id, password`,
					[name, email, password],
					(err, results) => {
						if (err) {
							throw err;
						}
						res.status(200).json({
							msg: "data created successfully",

							data: results.rows[0],
						});
						console.log(results.rows);
					}
				);
			}
		}
	);
};
const getlogin = (req, res) => {
	const arr = req.body;
	const email = arr.email;
	const password = arr.password;

	pool.query(
		`select id,name from users where email=$1 and password=$2`,
		[email, password],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
				data: result.rows,
			});
		}
	);
};

// creating quiz name using user id
const createq = (req, res) => {
	const para = req.body;
	console.log(para.id + para.name);
	user_id = para.id;
	quiz_name = para.name;
	pool.query(
		`INSERT INTO qtable (user_id,quiz_name) VALUES ($1, $2) RETURNING *`,
		[user_id, quiz_name],
		(err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}
			res.status(200).json({
				msg: "data created successfully",

				data: result.rows[0],
			});
		}
	);
};

// adding a quiz into details table
const addQuiz = (req, res) => {
	const q_id = parseInt(req.params.id);
	const arr = req.body;
	console.log("array length " + arr.length);
	for (let i = 0; i < arr.length; i++) {
		const subarr = arr[i];
		const question = subarr.question;
		const option1 = subarr.a;
		const option2 = subarr.b;
		const option3 = subarr.c;
		const option4 = subarr.d;
		const answer = subarr.ans;
		pool.query(
			"INSERT INTO details (question,option1,option2,option3,option4,answer,q_id  ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
			[question, option1, option2, option3, option4, answer, q_id],
			(err, result) => {
				if (err) {
					console.log(err);
					throw err;
				}
				res.status(200).json({
					msg: "data created successfully",

					data: result.rows[0],
				});
			}
		);
	}
};
const getDetailsById = async (req, res) => {
	let user_id = parseInt(req.params.id);
	var data = await pool.query("select * from qtable where user_id =$1", [
		user_id,
	]);
	res.json(data.rows);
};
const getQuizById = async (req, res) => {
	let q_id = parseInt(req.params.id);
	var data = await pool.query("select * from details where q_id =$1", [q_id]);
	res.json(data.rows);
};
//selecting all quiz for those who want to give quizzes
const all = async (req, res) => {
	var data = await pool.query("select * from  qtable");
	res.json(data.rows);
};

const deletedata = (req, res) => {
	const q_id = parseInt(req.params.id);

	pool.query("Delete from qtable where q_id =$1", [q_id], (err, result) => {
		if (err) {
			console.log(err);

			throw err;
		}
		res.json({
			data: "deleted successfully",
		});
	});
};

module.exports = {
	getlogin,
	createUser,
	addQuiz,
	createq,
	getDetailsById,
	getQuizById,
	all,

	deletedata,
};
