import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ username: req.body.username });
		if (!user)
			return res.status(401).send({ message: "Invalid Username or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Username or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ token: token, message: `Welcome back to Talk'am🎉, ${user.username}` });
	} catch (e) {
		res.status(500).send({ message: "An error occurred during login" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(30).required().label("Username"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export default router; 