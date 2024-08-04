import { Knex } from "knex";

const env = process.env.NODE_ENV;

const config: Knex.Config = {
	client: "mysql2",
	connection: {
		host: env == "development" ? process.env.DB_HOST : process.env.DB_HOST_TEST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	},
};

export default config;
