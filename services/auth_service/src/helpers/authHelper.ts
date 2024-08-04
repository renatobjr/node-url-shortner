import bc from "bcryptjs";
import jwt from "jsonwebtoken";

type TokenDataDocument = {
	id: number;
	email: string;
};

const secretKey: string = process.env.JWT_SECRET as string;

const authHelper = {
	isValidaPassword: (password: string, hash: string): boolean => {
		return bc.compareSync(password, hash);
	},

	generateToken: (data: TokenDataDocument) => {
		const token = jwt.sign(data, secretKey, { expiresIn: "1h" });
		return token;
	},

	validateToken: (token: string) => {
		if (token != undefined) {
			try {
				let formatToken = token.replace("Bearer ", "");
				return jwt.verify(formatToken, secretKey);
			} catch (error) {
				return {
					data: false,
				};
			}
		}

		return false;
	},

	hashSync: (password: string): string => {
		return bc.hashSync(password, 10);
	},
};

export default authHelper;
