import server from "./server";

const PORT = process.env.NODE_PORT;

server.listen(PORT, () => {
	console.log(`\u2713 Link Service is running on http://localhost:${PORT}`);
});
