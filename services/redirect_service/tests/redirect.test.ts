import request from "supertest";
import app from "../src/server";
import { describe, expect, test, beforeAll } from "@jest/globals";
import knex from "knex";
import config from "@/configs/knexfile";

beforeAll(async () => {
	const linkTable = "links";
	const db = knex(config);

	await db(linkTable).truncate();

	await db(linkTable).insert({
		original_url: "https://github.com/renatobjr/node-url-shortner",
		short_url: "http://172.20.199.6:3002/pzMQI",
	});
});

describe("GET /:shortUrl", () => {
	test("Should be redirect to the original url", async () => {
		const response: request.Response = await request(app).get("/pzMQI");

		expect(response.status).toBe(302);
	});

	test("Should be return 404 if short url not found", async () => {
		const response: request.Response = await request(app).get("/AnyShortUrl");

		expect(response.status).toBe(404);
	});
});
