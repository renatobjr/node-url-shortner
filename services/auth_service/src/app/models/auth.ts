import { knex } from "knex";
import config from "@/configs/knexfile";
import { AuthDocument } from "@/@types/authDocument";
import { Response as ResponseType } from "@/@types/response";
import { DefaultResponse } from "@/@types/defaultResponse";
import authHelper from "@/helpers/authHelper";
import { AuthSchema } from "@/schema/authSchema";

const userTable: string = "users";
const db = knex(config);

type LoginDocument = {
	token: string;
};

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	updated_at: Date;
	deleted_at: Date;
}

const getUser = async (email: string): Promise<User> => {
	const user: User = await db(userTable)
		.where(AuthSchema.email, email)
		.andWhere(AuthSchema.deleted_at, null)
		.first();

	return user;
};

const login = async (
	payload: AuthDocument,
): Promise<ResponseType<LoginDocument | DefaultResponse>> => {
	try {
		const user: User = await getUser(payload.email);

		if (!user) {
			return {
				data: "resource not found",
				httpCode: 404,
			};
		}

		if (!authHelper.isValidaPassword(payload.password, user.password)) {
			return {
				data: "resource not found",
				httpCode: 401,
			};
		}

		const generateToken: string = authHelper.generateToken({
			id: user.id,
			email: user.email,
		});

		return {
			data: {
				token: generateToken,
			},
			httpCode: 200,
		};
	} catch (error) {
		return {
			data: error,
			httpCode: 500,
		};
	}
};

const register = async (
	payload: AuthDocument,
): Promise<ResponseType<DefaultResponse>> => {
	try {
		const user: User = await getUser(payload.email);

		if (user) {
			return {
				data: "resource already exists",
				httpCode: 400,
			};
		}

		await db(userTable).insert({
			name: payload.name,
			email: payload.email,
			password: authHelper.hashSync(payload.password),
		});

		return {
			data: "resource created",
			httpCode: 201,
		};
	} catch (error) {
		return {
			data: error,
			httpCode: 500,
		};
	}
};

const verify = async (
	token: string,
): Promise<ResponseType<Object | boolean>> => {
	try {
		const isAuth = authHelper.validateToken(token);

		return {
			data: isAuth,
			httpCode: 200,
		};
	} catch (error) {
		return {
			data: error,
			httpCode: 500,
		};
	}
};

export default {
	login,
	register,
	verify,
};
