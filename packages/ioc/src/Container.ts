import { AsyncServiceFactory, ServiceFactory } from './index';

import makeAsyncServiceFactory from './utils/makeAsyncServiceFactory';
import { ReuseScope } from './ReuseScope';
import { ServiceEntry } from './ServiceEntry';
import { ServiceEntryConfigurer } from './ServiceEntryConfigurer';
import { isEmpty, leftPivot, rightPivot } from '@ui-framework/utils';

export class Container {
	private _parent: Container | null = null;
	private _services: Map<string|symbol, ServiceEntry<any>> = new Map();
	private _childContainers: Map<string|symbol, Container> = new Map();
	private _isDisposing: boolean = false;

	constructor(config?: { parent: Container }) {
		if (config && config.parent) {
			this._parent = config.parent;
		}

		let entry = new ServiceEntry<Container>({
			container: this,
			dependencies: [],
			instance: this,
			factory: makeAsyncServiceFactory<Container>(this.constructor as Static<Container>, [])
		});

		// We need to ensure that the Container ServiceEntry is durable, so it doesn't get disposed of.
		let containerConfigurer = new ServiceEntryConfigurer(entry);
		containerConfigurer.asDurable();

		this._services.set('Container', entry);
	}

	get parent() {
		return this._parent;
	}

	public spawn(name: string|symbol): Container {
		let container = new Container({ parent: this });

		this._childContainers.set(name, container);

		return container;
	}

	public dispose(): void {
		this._isDisposing = true;

		for (let [name, serviceEntry] of this._services) {
			serviceEntry.dispose();
		}

		for (let [name, container] of this._childContainers) {
			container.dispose();
		}

		this._isDisposing = false;
	}

	public eject(name: string|symbol): void {
		if (this._services.has(name)) {
			let entry = this._services.get(name);
			if (entry?.isEjectable) {
				entry.dispose();
				this._services.delete(name);
			}
		} else {
			if (this._childContainers.has(name)) {
				let container = this._childContainers.get(name);
				container?.eject(name);
			}
		}
	}

	public register<T>(name: string|symbol, type: Static<T>, dependencies: (string|symbol)[] = []): ServiceEntryConfigurer<T> {
		if (type instanceof Container) {
			throw new TypeError('Container.register: Cannot register a Container instance');
		}

		let entry = new ServiceEntry<T>({
			factory: makeAsyncServiceFactory<T>(type, dependencies),
			container: this,
			dependencies
		});

		this._registerImpl<T>(name, entry);

		return new ServiceEntryConfigurer(entry);
	}

	public registerFactory<T>(name: string|symbol, factory: ServiceFactory<T> | AsyncServiceFactory<T>): ServiceEntryConfigurer<T> {
		let entry = new ServiceEntry<T>({
			container: this,
			factory
		});

		this._registerImpl<T>(name, entry);

		return new ServiceEntryConfigurer(entry);
	}

	public async resolve(name: string|symbol): Promise<any> {
		return await this._resolveImpl(name, true);
	}

	public async resolveAll(): Promise<Record<string|symbol, any>> {
		//
		let resolved: Record<string|symbol, any> = {};
		// Ignore the container in the output of this method because
		// it's redundant, since the caller already has access to the container.
		let entries = leftPivot(Array.from(this._services)
			.filter(x => !(x[1].instance instanceof Container)));

		if (!isEmpty(entries[0])) {
			entries[0] = await this.resolveList(entries[1]);
			entries = rightPivot(entries);

			entries.forEach(x => {
				resolved[x[0]] = x[1];
			});
		}

		return resolved;
	}

	public resolveList(names: (string|symbol)[]): Promise<any[]> {
		return Promise.all(names.map((name) => this.resolve(name)));
	}

	public getContainer(name: string|symbol): Container | null {
		let container = this._childContainers.get(name) ?? null;

		return container;
	}

	public has(name: string|symbol): boolean {
		return this._services.has(name);
	}

	protected __tryGetServiceEntry(name: string|symbol): ServiceEntry<any> | null {
		return this._services.get(name) ?? null;
	}

	private _getEntry(name: string|symbol, throwIfMissing: boolean): ServiceEntry<any> | null {
		let container: Container = this;
		let entry = container.__tryGetServiceEntry(name);

		while (!entry && container.parent) {
			container = container.parent;
			entry = container.__tryGetServiceEntry(name);
		}

		if (entry === null) {
			if (throwIfMissing) {
				Container._throwMissing(name);
			}
		} else {
			if (entry.reuse === ReuseScope.container && entry.container !== this) {
				entry = this._setServiceEntry(name, entry.cloneFor(this));
			}
		}

		return entry;
	}

	private _registerImpl<T>(name: string|symbol, entry: ServiceEntry<T>): ServiceEntry<T> {
		// We want to check that an entry exists before setting it so we don't override original entries.
		// In the event there is a duplicate registration of a service, we still want to return an entry so that calls to the fluent configuration
		// api can still happen.
		// The sideaffect of this approach is that a duplicate entry will still be configured but won't be saved. Thus, the original entry and its configuration is preserved.
		// While this approach is more expensive, it's better than halting execution or having bugs related to entry configuration later that are harder to find.
		let entryIsADuplicate = this.has(name);
		if (entryIsADuplicate) {

			return entry;
		} else {
			return this._setServiceEntry(name, entry);
		}
	}

	private async _resolveImpl(name: string|symbol, throwIfMissing: boolean): Promise<any> {
		let entry = this._getEntry(name, throwIfMissing);
		let instance;

		if (entry !== null) {
			instance = await entry.getInstance();
		}

		return instance;
	}

	private _setServiceEntry(name: string|symbol, entry: ServiceEntry<any>): ServiceEntry<any> {
		this._services.set(name, entry);

		return entry;
	}

	static _throwMissing(name: string|symbol) {
		throw new Error(`${String(name)} not found`);
	}
}
