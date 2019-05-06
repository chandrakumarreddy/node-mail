require("babel-polyfill");
const express = require("express"),
	bodyParser = require("body-parser"),
	emailer = require("./helpers/mail"),
	jwt = require("jsonwebtoken"),
	app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/register", (req, res) => {
	res.render("register", { err: null, succ: null });
});
app.post("/register", (req, res) => {
	const confirmationMail = jwt.sign(
		{
			email: req.body.email
		},
		"secret",
		{ expiresIn: 60 }
	);
	emailer
		.main(
			req.body.email,
			"http://localhost:3000/confirmation/" + confirmationMail
		)
		.then(() => res.render("register", { err: null, succ: true }))
		.catch(() => res.render("register", { err: true, succ: true }));
});
app.get("/confirmation/:id", (req, res) => {
	try {
		var decoded = jwt.verify(req.params.id, "secret");
		if (decoded.email) {
			res.send("Login successful");
		}
	} catch (err) {
		res.send("Login failed");
	}
});
app.listen(3000, () => console.log("server is running at port 3000"));
