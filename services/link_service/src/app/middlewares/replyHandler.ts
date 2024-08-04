import { Handler } from "express";

const replyHandler: Handler = (req, res, next) => {
	res.reply = <T>(statusCode: number, data: T) => {
		res.status(statusCode).send({
			body: data,
			url: req.originalUrl,
			date: new Date(),
		});
	};

	next();
};

export default replyHandler;
