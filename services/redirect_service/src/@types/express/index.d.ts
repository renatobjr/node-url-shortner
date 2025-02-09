declare namespace Express {
	interface Response {
		reply: <T>(statusCode: number, data: T) => void;
	}
}
