import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user'], default: 'user' },
	bio: { type: String, default: '' },
	location: { type: String, default: 'Nigeria' },
	profileImage: { type: String, default: 'defaultImage_1.png' },
	sessionsCompleted: { type: Number, default: 0 },
	sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		password: passwordComplexity().required().label("Password")
	});
	return schema.validate(data);
};

export { User, validate };