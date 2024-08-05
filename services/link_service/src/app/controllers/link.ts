import { Handler } from "express";
import validationHelper from "@/helpers/validationHelper";
import link from "@/app/models/link";

const create: Handler = async (req, res) => {
	const { error } = validationHelper.createSchema.validate(req.query);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await link.create(
		req.query,
		req.headers.authorization || "no_token",
	);
	res.reply(result.httpCode, result.data);
};

const list: Handler = async (req, res) => {
	const result = await link.list(req.userId);
	res.reply(result.httpCode, result.data);
};

const update: Handler = async (req, res) => {
	const { error } = validationHelper.updateSchema.validate(req.body);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await link.update(req.params.id, req.userId, req.body);
	res.reply(result.httpCode, result.data);
};

const remove: Handler = async (req, res) => {
	const { error } = validationHelper.removeSchema.validate(req.params);
	if (error) {
		return res.reply(400, error.message);
	}

	const result = await link.remove(req.params.id, req.userId);
	res.reply(result.httpCode, result.data);
};

export default {
	create,
	list,
	update,
	remove,
};
