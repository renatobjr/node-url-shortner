import { Handler } from "express";
import linkHelpers from "@/helpers/linkHelpers";

const isAuth: Handler = async (req, res, next) => {
	try {
		const tokenReceive = req.headers.authorization as string;
		const isAuth = await linkHelpers.isAuth(tokenReceive);

		if (isAuth.data == false) return res.reply(401, "Invalid token");

		req.userId = isAuth.id;

		next();
	} catch (error) {
		res.reply(500, "Internal Server error");
	}
};

export default isAuth;
