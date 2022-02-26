export enum HttpMethod {
	connect = 'CONNECT',
	delete = 'DELETE',
	get = 'GET',
	head = 'HEAD',
	options = 'OPTIONS',
	patch = 'PATCH',
	post = 'POST',
	put = 'PUT'
}

export const simpleHttpMethods = [HttpMethod.get, HttpMethod.head, HttpMethod.options];