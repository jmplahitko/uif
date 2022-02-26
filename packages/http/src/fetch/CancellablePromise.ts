export default class CancellablePromise<T = any> {
	readonly [Symbol.toStringTag] = 'promise';
	private readonly _promise: Promise<T>;
	private _abortController: AbortController | null = null;

	constructor(executor) {
		this._promise = new Promise<T>(executor);
	}

	set abortController(abortController: AbortController) {
		this._abortController = abortController;
	}

	public cancel() {
		if (this._abortController) {
			this._abortController.abort();
		}
	}

	public catch<TResolved = any>(onrejected?: ((reason: any) => any)): Promise<T | TResolved> {
		return this._promise.catch<TResolved>(onrejected);
	}

	public then<TResolved = any>(onfulfilled?: ((value: T) => TResolved), onrejected?: ((reason: any) => any)): Promise<TResolved> {
		return this._promise.then<TResolved>(onfulfilled, onrejected);
	}

	public finally(onfinally?: (() => void) | null | undefined): Promise<T> {
		return this._promise.finally(onfinally);
	}
}