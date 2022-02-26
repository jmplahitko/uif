import HttpStatusCode from './HttpStatusCode';

const errorDefaults = [
	{
		status: HttpStatusCode.badRequest,
		name: 'Bad Request',
		message: 'The information you provided is either incorrect or incomplete.'
	},
	{
		status: HttpStatusCode.unauthorized,
		name: 'Unauthenticated',
		message: `Authentication failed or you do not have permission for the requested operation.`
	},
	{
		status: HttpStatusCode.forbidden,
		name: 'Unauthorized',
		message: 'Access was denied.'
	},
	{
		status: HttpStatusCode.notFound,
		name: 'Not Found',
		message: 'The resource you requested could not be found.'
	},
	{
		status: HttpStatusCode.internalServerError,
		name: 'Server Error',
		message: 'The server encountered an unexpected condition which prevented it from fulfilling your request.'
	}
];

const defaultError = {
	name: 'Error',
	message: `Something went wrong when trying to fulfull your request.`
};

export type THttpErrorDescription = {
	data?: any;
	message?: string;
	name?: string;
	status?: HttpStatusCode;
};

export default class HttpError extends Error {
	public data: any;
	public name: string;

	readonly request: any;
	readonly response: any;

	constructor(description: THttpErrorDescription) {
		const _defaultError = errorDefaults.find((x) => x.status === description.status);
		let message, name;

		if (description.message) {
			message = description.message;
		} else {
			message = _defaultError ? _defaultError.message : defaultError.message;
		}

		if (description.name) {
			name = description.name;
		} else {
			name = _defaultError ? _defaultError.name : defaultError.name;
		}

		super(message);

		this.data = description.data;
		this.name = name;
	}
}
