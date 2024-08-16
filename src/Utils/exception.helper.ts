export class Exception {
	static notFound(message: string = 'Resource not found'): HttpError {
		return new HttpError({
			message: message,
			status: 404,
		})
	}

	static forbidden(
		message: string = 'You are not allowed to perform this action'
	): HttpError {
		return new HttpError({
			message: message,
			status: 403,
		})
	}

	static unauthorized(
		message: string = 'You are not authenticated'
	): HttpError {
		return new HttpError({
			message: message,
			status: 401,
		})
	}

	static unprocessable(errors: Record<string, string>): HttpError {
		return new HttpError({
			message: 'There are some validation errors',
			errors,
			status: 422,
		})
	}

	static badRequest(message: string): HttpError {
		return new HttpError({
			message: message,
			status: 400,
		})
	}

	static problem(message: string): HttpError {
		return new HttpError({
			message: message,
			status: 500,
		})
	}
}

export class HttpError extends Error {
	readonly message: string
	readonly errors?: Record<string, string>
	readonly status: number

	constructor(data: Partial<HttpError>) {
		super(data.message ?? 'Unknown error')
		this.message = data.message ?? 'Unknown error'
		this.errors = data.errors
		this.status = data.status ?? 500
	}
}
