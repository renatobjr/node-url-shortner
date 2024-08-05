export const apiDocs = {
	openapi: "3.0.0",
	info: {
		title: "Link API",
		description: "API para gerenciamento de links curtos",
		version: "1.0.0",
	},
	servers: [
		{
			url: "http://localhost:3001/api/v1/link",
			description: "Servidor local",
		},
	],
	paths: {
		"/api/v1/links/{shortUrl}": {
			get: {
				summary: "Obter link original",
				description: "Recupera a URL original usando a URL curta.",
				tags: ["Links"],
				parameters: [
					{
						in: "path",
						name: "shortUrl",
						required: true,
						schema: {
							type: "string",
						},
						description: "A URL curta do link.",
					},
				],
				responses: {
					"200": {
						description: "Link encontrado com sucesso",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										data: {
											type: "string",
											description: "URL original",
										},
										httpCode: {
											type: "integer",
											description: "Código HTTP da resposta",
										},
									},
								},
							},
						},
					},
					"404": {
						description: "Link não encontrado",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
								},
							},
						},
					},
					"500": {
						description: "Erro no servidor",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
								},
							},
						},
					},
				},
			},
		},
	},
	components: {
		schemas: {
			DefaultResponse: {
				type: "object",
				properties: {
					data: {
						type: "string",
						description: "Mensagem de resposta",
					},
					httpCode: {
						type: "integer",
						description: "Código HTTP da resposta",
					},
				},
			},
		},
	},
};
