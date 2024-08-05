import axios from "axios";

interface DecodedToken {
	data?: boolean;
	id: string;
	email: string;
}

const linkHelpers = {
	isAuth: async (token: string): Promise<DecodedToken> => {
		return axios
			.post(`${process.env.AUTH_SERVICE}/${token}`)
			.then((res) => {
				return res.data.response;
			})
			.catch((err) => {
				return {
					data: err,
					httpCode: 404,
				};
			});
	},

	generateShortLink: (): String => {
		const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let urlCode: string = "";

		for (let i = 0; i < 5; i++) {
			urlCode += caracteres.charAt(
				Math.floor(Math.random() * caracteres.length),
			);
		}

		return `${process.env.REDIRECT_SERVICE}/${urlCode}`;
	},
};

export default linkHelpers;
