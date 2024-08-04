import { Handler } from "express";
import link from "@/app/models/link";

const create: Handler = async (req, res) => {
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
	const result = await link.update(req.params.id, req.body);
	res.reply(result.httpCode, result.data);
};

const remove: Handler = async (req, res) => {
	const result = await link.remove(req.params.id);
	res.reply(result.httpCode, result.data);
};

export default {
	create,
	list,
	update,
	remove,
};
