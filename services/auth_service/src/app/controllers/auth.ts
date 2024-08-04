import auth from "@/app/models/auth";
import { Handler } from "express";
import validationHelper from "@/helpers/validationHelper";
import { AuthDocument } from "@/@types/authDocument";

const login: Handler = async (req, res) => {
	const { error } = validationHelper.loginSchema.validate(req.body);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await auth.login(req.body);
	res.reply(result.httpCode, result.data);
};

const register: Handler = async (req, res) => {
	const { error } = validationHelper.registerSchema.validate(req.body);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await auth.register(req.body);
	res.reply(result.httpCode, result.data);
};

export default {
	login,
	register,
};
