import request from "supertest";
import app from "../src/server";
import axios from "axios";
import { describe, expect, test, beforeAll } from "@jest/globals";
import knex from "knex";
import config from "@/configs/knexfile";

const authService = process.env.AUTH_SERVICE as string;

const linkRightPayload = {
	original_url: "https://github.com/renatobjr/node-url-shortner",
};

const updateRightPayload = {
	original_url: "https://teddydigital.io/",
};

const linkWrongPayload = {
	original_url: "",
};

const loginRightPayload = {
	email: "test@null.net",
	password: "123",
};

let token = "";

const invalidToken =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyZW5hdG8uYm9uZmltLmpyQGNjaWFvLm9yZyIsImlhdCI6MTcyMjgwMzczOCwiZXhwIjoxNzIyODA3MzM4fQ.d7PSCE1h6nHYMN1_SKfDTC1IHNML6jBfvoRRTFsOmB0";

beforeAll(async () => {
	const linkTable = "links";
	const userTable = "users";
	const db = knex(config);

	await db(linkTable).truncate();
	await db(userTable).del();

	await db(userTable).insert({
		id: 1,
		name: "User Test",
		email: "test@null.net",
		password: "$2y$10$KGH/PbKNg8llEfwIyLATJutoMAmKJZ4hkH4P2uQ7ybv2QK41Qxn8q",
	});

	token = await axios({
		method: "get",
		url: authService,
		data: loginRightPayload,
	}).then((res) => {
		return res.data.response.token;
	});
});

describe("POST /link", () => {
	test("Should be create a short link with no user id", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/link")
			.query(linkRightPayload);

		expect(response.statusCode).toEqual(201);
	});

	test("Should be cerate a short link with a existed user", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/link")
			.set("Authorization", token)
			.query(linkRightPayload);

		expect(response.statusCode).toEqual(201);
	});

	test("Should not create a short link with a wrong payload", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/link")
			.set("Authorization", invalidToken)
			.query(linkRightPayload);

		expect(response.statusCode).toEqual(401);
	});

	test("Should not create a link with no original url", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/link")
			.query(linkWrongPayload);

		expect(response.statusCode).toEqual(400);
	});
});

describe("GET /link", () => {
	test("Should be return a list of links for authenticated users", async () => {
		const response: request.Response = await request(app)
			.get("/api/v1/link")
			.set("Authorization", token);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toHaveProperty("response");
	});

	test("Should be return a unauthorized when send a invalid token", async () => {
		const response: request.Response = await request(app)
			.get("/api/v1/link")
			.set("Authorization", invalidToken);

		expect(response.statusCode).toEqual(401);
	});
});

describe("PUT /link", () => {
	test("Should be update a link for authenticated users", async () => {
		const response: request.Response = await request(app)
			.put("/api/v1/link/2")
			.set("Authorization", token)
			.send(updateRightPayload);

		expect(response.statusCode).toEqual(204);
	});

	test("Should not update a link with a invalid token", async () => {
		const response: request.Response = await request(app)
			.put("/api/v1/link/2")
			.set("Authorization", invalidToken)
			.send(updateRightPayload);

		expect(response.statusCode).toEqual(401);
	});

	test("Should not update a link with no original url", async () => {
		const response: request.Response = await request(app)
			.put("/api/v1/link/2")
			.set("Authorization", token)
			.send(linkWrongPayload);
	});
});

describe("DELETE /link", () => {
	test("Should not remove a link with a invalid token", async () => {
		const response: request.Response = await request(app)
			.delete("/api/v1/link/2")
			.set("Authorization", invalidToken);

		expect(response.statusCode).toEqual(401);
	});

	test("Should not remove a link invalid link id", async () => {
		const response: request.Response = await request(app)
			.delete("/api/v1/link/0")
			.set("Authorization", token);

		expect(response.statusCode).toEqual(404);
	});

	test("Should be remove a link for authenticated users", async () => {
		const response: request.Response = await request(app)
			.delete("/api/v1/link/2")
			.set("Authorization", token);

		expect(response.statusCode).toEqual(204);
	});
});
