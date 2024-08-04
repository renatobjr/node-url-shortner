import { knex } from "knex";
import config from "@/configs/knexfile";
import { LinkDocument } from "@/@types/linkDocument";
import { Response as ResponseType } from "@/@types/response";
import { DefaultResponse } from "@/@types/defaultResponse";
import linkHelpers from "@/helpers/linkHelpers";
import { LinkSchema } from "@/schema/linkSchema";

const linkTable: string = "links";
const db = knex(config);

interface Link {
	id: number;
	original_url: string;
	short_url: string;
	user_id: number | undefined;
	updated_at: Date;
	deleted_at: Date;
}

const getLink = async (id: string): Promise<Link> => {
	const link: Link = await db(linkTable)
		.where(LinkSchema.id, id)
		.andWhere(LinkSchema.deleted_at, null)
		.first();

	return link;
};

const create = async (
	payload: Partial<LinkDocument>,
	token: string,
): Promise<ResponseType<String | DefaultResponse>> => {
	try {
		let shortUrl = linkHelpers.generateShortLink();

		let userData;
		if (token != "no_token") userData = await linkHelpers.isAuth(token);

		if (userData?.data == false)
			return { data: "invalida token", httpCode: 401 };

		await db(linkTable).insert({
			original_url: payload.original_url,
			short_url: shortUrl,
			user_id: userData?.id || null,
		});

		return {
			data: shortUrl,
			httpCode: 201,
		};
	} catch (error) {
		return {
			data: error,
			httpCode: 500,
		};
	}
};

const list = async (userId: number): Promise<ResponseType<LinkDocument[]>> => {
	const list: Link[] = await db(linkTable).where(LinkSchema.user_id, userId);

	return {
		data: list,
		httpCode: 200,
	};
};

const update = async (
	linkId: string,
	payload: LinkDocument,
): Promise<ResponseType<DefaultResponse>> => {
	try {
		const hasLink: Link = await getLink(linkId);
		if (!hasLink) return { data: "resource not found", httpCode: 404 };

		let updateData: LinkDocument = {
			...payload,
			updated_at: new Date(),
		};

		await db(linkTable).update(updateData).where(LinkSchema.id, linkId);

		return {
			data: "resource updated",
			httpCode: 204,
		};
	} catch (error) {
		return {
			data: error,
			httpCode: 500,
		};
	}
};

const remove = async (
	linkId: string,
): Promise<ResponseType<DefaultResponse>> => {
	try {
		const hasLink: Link = await getLink(linkId);
		if (!hasLink) return { data: "resource not found", httpCode: 404 };

		await db(linkTable)
			.update(LinkSchema.deleted_at, Date.now())
			.where(LinkSchema.id, linkId);

		return {
			data: "resource removed",
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
	create,
	list,
	update,
	remove,
};
