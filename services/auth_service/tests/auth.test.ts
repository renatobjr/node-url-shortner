import request from "supertest";
import app from "../src/server";
import { describe, expect, test, beforeAll } from "@jest/globals";
import knex from "knex";
import config from "@/configs/knexfile";

const userRightPayload = {
	name: "User Test",
	email: "test@null.net",
	password: "1234",
};

const loginRightPayload = {
	email: "test@null.net",
	password: "1234",
};

const loginWithWrongEmailPayload = {
	email: "test@null.com",
	password: "1234",
};

const loginWithWrongPasswordPayload = {
	email: "test@null.net",
	password: "123",
};

const userWrongPayload = {
	name: "User Test",
	email: "test@null.net",
};

beforeAll(async () => {
	const userTable: string = "users";
	const db = knex(config);

	await db(userTable).del();
});

describe("POST /auth", () => {
	test("Should be create a User with right payload", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/auth")
			.send(userRightPayload);

		expect(response.statusCode).toEqual(201);
	});

	test("Should not create a User with wrong payload", async () => {
		const response: request.Response = await request(app)
			.post("/api/v1/auth")
			.send(userWrongPayload);

		expect(response.statusCode).toEqual(400);
	});
});

describe("GET /auth", () => {
	test("Should be return a error with wrong email", async () => {
		const response: request.Response = await request(app)
			.get("/api/v1/auth")
			.send(loginWithWrongEmailPayload);

		expect(response.statusCode).toEqual(404);
	});

	test("Should be return a error with wrong password", async () => {
		const response: request.Response = await request(app)
			.get("/api/v1/auth")
			.send(loginWithWrongPasswordPayload);

		expect(response.statusCode).toEqual(401);
	});
});
