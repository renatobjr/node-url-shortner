import { Handler } from "express";

const replyHandler: Handler = (req, res, next) => {
	res.reply = <T>(statusCode: number, data: T) => {
		res.status(statusCode).send({
			data: data,
			url: req.url,
			date: new Date(),
		});
	};

	next();
};

export default replyHandler;
