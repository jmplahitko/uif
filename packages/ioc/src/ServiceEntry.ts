
import { Container } from './Container';
import { DisposalStrategy, ServiceFactory, ServiceKey } from './index';
import { ReuseScope } from './ReuseScope';
import { Lifespan } from './Lifespan';
import { ServiceEntryDisposalBroker } from './ServiceEntryDisposalBroker';

export class ServiceEntry<T> {
	public isDisposable: boolean = true;
	public isEjectable: boolean = false;
	public lifespan: Lifespan = Lifespan.default;
	public reuse: ReuseScope = ReuseScope.default;

	private _container: Container;
	private _dependencies: ServiceKey[];
	private _factory: ServiceFactory<T>;
	private _instance: T | null | undefined = null;
	private _pendingInstance: Promise<T> | null = null;
	private _disposalStrategy: DisposalStrategy<T> | null = null;

	constructor(entry: { container: Container; dependencies?: ServiceKey[]; factory: ServiceFactory<T>; instance?: T | null }) {
		this._container = entry.container;
		this._dependencies = entry.dependencies || [];
		this._factory = entry.factory;
		this._instance = entry.instance ?? null;
	}

	get container() {
		return this._container;
	}

	get dependencies() {
		return this._dependencies;
	}

	get instance() {
		return this._instance;
	}

	set disposalStrategy(disposalStrategy: DisposalStrategy<T>) {
		this._disposalStrategy = disposalStrategy;
	}

	public cloneFor(container: Container): ServiceEntry<T> {
		let clone = new ServiceEntry<T>({
			container,
			dependencies: this._dependencies,
			factory: this._factory,
			instance: this._instance
		});

		clone.isDisposable = this.isDisposable;
		clone.lifespan = this.lifespan;
		clone.reuse = this.reuse;
		if (this._disposalStrategy) {
			clone.disposalStrategy = this._disposalStrategy;
		}

		return clone;
	}

	public deleteInstance(): void {
		if (this._instance) {
			delete this._instance;
			this._instance = null;
		}
	}

	public dispose(): void {
		if (this.isDisposable) {
			if (this._disposalStrategy) {
				// We don't want to expose ServiceEntry publicly, so we wrap it in a broker object with hopes to protect it.
				this._disposalStrategy(new ServiceEntryDisposalBroker(this));
			} else {
				this.deleteInstance();
			}
		}
	}

	public getInstance(): Promise<T> {
		return this._initializeInstance();
	}

	private _initializeInstance(): Promise<T> {
		return new Promise(async (resolve) => {
			if (this.lifespan === Lifespan.singleton) {
				/**
				 * This is a singleton ServiceEntry. Check if it
				 * has an instance and return it if it does. If
				 * no instance, instantiate and set.
				 */
				if (this._instance) {
					resolve(this._instance);
				} else {
					this._pendingInstance = this._pendingInstance ?? Promise.resolve(this._factory(this.container));
					this._instance = await this._pendingInstance;
					this._pendingInstance = null;

					resolve(this._instance);
				}
			} else {
				/**
				 * Transient. Create an instance of this ServiceEntry
				 * without setting the instance internally.
				 */
				resolve(this._factory(this.container));
			}
		});
	}
}
