export const apiDocs = {
	openapi: "3.0.0",
	info: {
		title: "Auth API",
		description: "API para autenticação de usuários",
		version: "1.0.0",
	},
	servers: [
		{
			url: "http://localhost:3000/api/v1/auth",
			description: "Servidor local",
		},
	],
	paths: {
		"/api/v1/auth": {
			get: {
				summary: "Autenticação de usuário",
				description:
					"Realiza login de um usuário e retorna um token de autenticação.",
				tags: ["Autenticação"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/AuthDocument",
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Login bem-sucedido",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										token: {
											type: "string",
											description: "Token de autenticação",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Senha incorreta",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
								},
							},
						},
					},
					"404": {
						description: "Usuário não encontrado",
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
			post: {
				summary: "Registro de usuário",
				description: "Registra um novo usuário no sistema.",
				tags: ["Autenticação"],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/AuthDocument",
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Usuário criado com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultResponse",
								},
							},
						},
					},
					"400": {
						description: "Usuário já existe",
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
			"post/:token": {
				summary: "Valida um token",
				description:
					"Valida se um token ainda é válido ou se esta corretamento formado.",
				tags: ["Autenticação"],
				requestBody: {
					required: true,
					content: {
						schema: {
							type: "object",
							properties: {
								token: "string",
								description: "Token de autenticaçào para validação",
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Token válidado com sucesso",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/Object",
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
			AuthDocument: {
				type: "object",
				required: ["email", "password"],
				properties: {
					name: {
						type: "string",
						description: "Nome do usuário",
					},
					email: {
						type: "string",
						description: "Email do usuário",
					},
					password: {
						type: "string",
						description: "Senha do usuário",
					},
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
			LoginDocument: {
				type: "object",
				properties: {
					token: {
						type: "string",
						description: "Token de autenticação",
					},
				},
			},
		},
	},
};
