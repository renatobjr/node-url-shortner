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
		"/api/v1/links": {
			post: {
				summary: "Criação de link",
				description: "Cria um novo link curto.",
				tags: ["Links"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/LinkDocument",
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Link criado com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/StringResponse",
								},
							},
						},
					},
					"401": {
						description: "Token inválido",
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
			get: {
				summary: "Listagem de links",
				description: "Lista todos os links de um usuário.",
				tags: ["Links"],
				parameters: [
					{
						in: "query",
						name: "userId",
						required: true,
						schema: {
							type: "string",
						},
						description: "ID do usuário",
					},
				],
				responses: {
					"200": {
						description: "Links listados com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/LinkDocumentList",
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
			put: {
				summary: "Atualização de link",
				description: "Atualiza um link existente.",
				tags: ["Links"],
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: {
							type: "string",
						},
						description: "ID do link",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/LinkDocument",
							},
						},
					},
				},
				responses: {
					"204": {
						description: "Link atualizado com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
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
			delete: {
				summary: "Remoção de link",
				description: "Remove um link existente.",
				tags: ["Links"],
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: {
							type: "string",
						},
						description: "ID do link",
					},
				],
				responses: {
					"204": {
						description: "Link removido com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
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
			LinkDocument: {
				type: "object",
				required: ["original_url"],
				properties: {
					original_url: {
						type: "string",
						description: "URL original",
					},
					short_url: {
						type: "string",
						description: "URL curta",
					},
				},
			},
			LinkDocumentList: {
				type: "array",
				items: {
					$ref: "#/components/schemas/LinkDocument",
				},
			},
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
			StringResponse: {
				type: "object",
				properties: {
					data: {
						type: "string",
						description: "URL curta gerada",
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
