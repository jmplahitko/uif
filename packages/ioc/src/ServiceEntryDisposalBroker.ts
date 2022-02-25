import { ServiceEntry } from './ServiceEntry';

export class ServiceEntryDisposalBroker {
	private _entry: ServiceEntry<any>;

	constructor(entry: ServiceEntry<any>) {
		this._entry = entry;
	}

	get instance() {
		return this._entry.instance;
	}

	public deleteInstance() {
		this._entry.deleteInstance();
	}
}