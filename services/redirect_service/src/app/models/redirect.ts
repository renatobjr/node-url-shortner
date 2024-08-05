import { knex } from "knex";
import config from "@/configs/knexfile";
import { LinkSchema } from "@/schema/linkSchema";
import { Response as ResponseType } from "@/@types/response";
import { DefaultResponse } from "@/@types/defaultResponse";

const linkTable: string = "links";
const db = knex(config);

interface Link {
	id: number;
	original_url: string;
	short_url: string;
	user_id: number | undefined;
	total_clicks: number;
	updated_at: Date;
	deleted_at: Date;
}

const getLink = async (
	shortUrl: string,
): Promise<ResponseType<DefaultResponse | string>> => {
	const getLink: Link = await db(linkTable)
		.whereILike(LinkSchema.short_url, `%${shortUrl}%`)
		.andWhere(LinkSchema.deleted_at, null)
		.first();

	if (!getLink) return { data: "Link not found", httpCode: 404 };

	let incrementClicks = getLink.total_clicks + 1;

	await db(linkTable)
		.where(LinkSchema.id, getLink.id)
		.update(LinkSchema.total_clicks, incrementClicks);

	return { data: getLink.original_url, httpCode: 200 };
};

export default {
	getLink,
};
