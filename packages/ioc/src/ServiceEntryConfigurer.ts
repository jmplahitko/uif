import { DisposalStrategy } from './index';
import { ServiceEntry } from './ServiceEntry';
import { ReuseScope } from './ReuseScope';
import { Lifespan } from './Lifespan';

export class ServiceEntryConfigurer<T> {
	private _entry: ServiceEntry<T>;

	constructor(entry: ServiceEntry<T>) {
		this._entry = entry;
	}

	asDurable(): ServiceEntryConfigurer<T> {
		this._entry.isDisposable = false;
		return this;
	}

	asEjectable(): ServiceEntryConfigurer<T> {
		this._entry.isEjectable = true;
		return this;
	}

	reusedWithin(reuseScope: ReuseScope): ServiceEntryConfigurer<T> {
		this._entry.reuse = reuseScope;
		return this;
	}

	withLifespan(lifespan: Lifespan): ServiceEntryConfigurer<T> {
		this._entry.lifespan = lifespan;
		return this;
	}

	withDisposalStrategy(disposalStrategy: DisposalStrategy<T>): ServiceEntryConfigurer<T> {
		this._entry.disposalStrategy = disposalStrategy;
		return this;
	}
}
